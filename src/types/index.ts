export type Autor = {
  name: string;
  lastname: string;
};

export type Item = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: string;
    decimals: string;
  };
  picture: string;
  condition: string;
  free_shipping: string;
};

export type Data = {
  autor: Autor;
  categories: string[];
  items: Item[];
};
