import { Event } from './models/Event';

async function deleteEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      await event.destroy();
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  
  app.delete('/events/:id', deleteEvent);
 

