import { Stage } from './models/Stage';
import { Event } from './models/Event';


async function getStageAndEvents(req: Request, res: Response) {
  const stageId = req.params.id;
  try {
    const stage = await Stage.findOne({
      where: { id: stageId },
      attributes: ['id', 'name'],
      include: [
        {
          model: Event,
          attributes: ['id', 'name', 'date', 'start_time', 'end_time'],
          limit: 3, // Limit to 3 events per stage
          order: [['date', 'ASC']], // Order events by date, ascending
        },
      ],
    });
    if (!stage) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    return res.json(stage);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


app.get('/stages/:id', getStageAndEvents);
