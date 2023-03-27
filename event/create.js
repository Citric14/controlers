import { Event } from './models/Event';


async function createEvent(req: Request, res: Response) {
    try {
      const event = await Event.create(req.body);
      return res.status(201).json(event);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  app.post('/events', createEvent);
