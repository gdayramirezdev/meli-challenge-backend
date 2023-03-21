import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { getItem } from './controllers/getItem';
import { getItems } from './controllers/getItems';
const app = express();
const router = express.Router();

app.use(bodyParser.json());

router.get('/items', async (request, response) => {
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

router.get('/items/:id/description', async (request, response) => {
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

app.use('/api', router);

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
