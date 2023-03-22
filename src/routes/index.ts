import { Request, Response, Router } from 'express';
import { getItem } from '../controllers/getItem';
import { getItems } from '../controllers/getItems';

const router = Router();

router.get('/items', async (request: Request, response: Response) => {
  try {
    const query = request.query.q;

    if (!query) {
      return response.status(400).json({
        message: 'q parameter is missing',
        code: 400,
      });
    }

    const items = await getItems(query);
    return response.send(items);
  } catch (error) {
    console.warn(`Error on [getItems]`, error);
    return response.status(500).send({
      message: 'Internal Server Error',
      code: 500,
    });
  }
});

router.get('/items/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const item = await getItem(id);

    return response.send(item);
  } catch (error) {
    console.warn(`Error on [getItem]`, error);
    return response.status(500).send({
      message: 'Internal Server Error',
      code: 500,
    });
  }
});

export default router;