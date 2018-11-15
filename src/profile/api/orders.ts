import { IAuthUser } from 'authentication/models/User';
import { get, getAll, withUser } from 'common/utils/api';
import { IOrder, IOrderLine, IStoreItem } from 'profile/models/Orders';


const API_URL = '/api/v1/profile/orders';

const MOCK_AMOUNT = 50;

const itemNames = [
  'Muffins',
  'Kinder Maxi',
  'Powerking',
  'Billys Pizza',
  'Kjærlighet på pinne',
  'Sjokomelk',
  'Twix',
  'Toast',
  'Mama Nudler',
];

const categoryNames = ['Snacks', 'Mat', 'Drikke'];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const contentObject = (): IStoreItem => ({
  name: itemNames[randomInt(0, itemNames.length - 1)],
  price: randomInt(3, 20),
  description: null,
  category: {
    pk: 1,
    name: categoryNames[randomInt(0, categoryNames.length - 1)],
  },
});

const order = (): IOrder => ({
  price: randomInt(3, 20),
  quantity: randomInt(1, 3),
  content_object: contentObject(),
});

const createMockOrderLine = () => ({
  orders: [...Array(randomInt(1, 4))].map(order),
  paid: true,
  datetime: `201${randomInt(6, 8)}-0${randomInt(1, 9)}-${randomInt(0, 2)}${randomInt(0, 9)}T12:49:09.302313+02:00`,
});

export const getOrders = async (user: IAuthUser): Promise<IOrderLine[]> => {
  const { results } = await get(API_URL, { page_size: 80 }, withUser(user));
  return results;
};
