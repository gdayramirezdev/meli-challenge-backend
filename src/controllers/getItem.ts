import axios from 'axios';
import { ApiMercadoLibre } from '../constants';
import { Autor, Item } from '../types';

export type Data = {
  autor: Autor;
  item: Item;
};

export async function getItem(id: string): Promise<Data> {
  const { data: item } = await axios(`${ApiMercadoLibre}/items/${id}`);
  const { data: description } = await axios(`${ApiMercadoLibre}/items/${id}/description`);

  const result = {
    autor: {
      name: '',
      lastname: '',
    },
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: '',
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: description.plain_text,
    }
  }

  return result;
}
