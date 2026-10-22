export type UserProfile = {
  id: string;
  photo?: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  salary: number;
};

export const DEFAULT_PROFILES: UserProfile[] = [
  {
    id: 'denis',
    photo: '/images/photo.jpg',
    name: 'Denis Merinov',
    email: 'wow21moon@yandex.ru',
    phone: '+7 (988) 963-68-06',
    balance: 1502134.99,
    salary: 180000,
  },
  {
    id: 'alina',
    photo: '/images/alina.jpg',
    name: 'Alina Merinova',
    email: 'alina.merinova@yandex.ru',
    phone: '+7 (988) 963-68-07',
    balance: 845320.5,
    salary: 120000,
  },
];

export type Currency = 'RUB' | 'USD';

// Mock exchange rate: how many rubles one dollar costs
export const USD_RATE = 81.5;

export const formatBalance = (balance: number, currency: Currency = 'RUB') =>
  currency === 'USD'
    ? (balance / USD_RATE).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    : balance.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      });
