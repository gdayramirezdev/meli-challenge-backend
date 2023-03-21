import axios from 'axios';
import { ApiMercadoLibre } from '../constants';
import { Autor, Item } from '../types';

export type Data = {
  autor: Autor;
  categories: string[];
  items: Item[];
};


export async function getItems(q: any): Promise<Data> {
  const { data } = await axios(`${ApiMercadoLibre}/sites/MLA/search?q=${q}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const autor = {
    name: '',
    lastname: '',
  };

  const categories = data.filters.find(
    (filter: { id: string }) => filter.id === 'category'
  );
  const categoriesList = categories?.values?.map(
    (category: { name: string }) => category.name
  );
  const items = data.results.map(
    (item: {
      id: string;
      title: string;
      currency_id: string;
      price: number;
      thumbnail: string;
      condition: string;
      shipping: { free_shipping: boolean };
      installments: { amount: number };
    }) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: item.installments.amount,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    })
  );
  return { autor, categories: categoriesList || [], items };
}
