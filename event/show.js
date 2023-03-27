import { Event } from './models/Event';
import { User } from './models/User';
import { Ticket } from './models/Ticket';

async function showEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    try {
      const event = await Event.findByPk(eventId, {
        include: [User, Ticket],
      });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.json(event);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  app.get('/events/:id', showEvent);


