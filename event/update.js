import { Event } from './models/Event';

async function updateEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      await event.update(req.body);
      return res.json(event);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  app.put('/events/:id', updateEvent);
