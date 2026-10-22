export type Transaction = {
  id: string;
  type: 'deposit' | 'withdrawal';
  title: string;
  amount: number;
  date: Date;
};

export type TransactionDay = {
  date: Date;
  transactions: Transaction[];
};

const SALARY_DAY = 15;
const HISTORY_DAYS = 365;
const MIN_PER_DAY = 1;
const MAX_PER_DAY = 12;

// Relative price ranges; real amounts are scaled to fit the monthly budget
const MERCHANTS: { title: string; min: number; max: number }[] = [
  { title: 'Pyaterochka', min: 300, max: 2500 },
  { title: 'Perekrestok', min: 400, max: 4000 },
  { title: 'VkusVill', min: 250, max: 2000 },
  { title: 'Magnit', min: 200, max: 1800 },
  { title: 'Coffee shop', min: 150, max: 450 },
  { title: 'Yandex Taxi', min: 250, max: 1200 },
  { title: 'Metro', min: 60, max: 120 },
  { title: 'Yandex Eats', min: 600, max: 2500 },
  { title: 'Ozon', min: 300, max: 6000 },
  { title: 'Wildberries', min: 300, max: 5000 },
  { title: 'Pharmacy', min: 200, max: 2500 },
  { title: 'Restaurant', min: 1500, max: 6000 },
  { title: 'Cinema', min: 400, max: 1500 },
  { title: 'Gas station', min: 1500, max: 4000 },
  { title: 'Mobile operator', min: 400, max: 900 },
  { title: 'Utilities', min: 3000, max: 8000 },
  { title: 'Transfer to card', min: 500, max: 10000 },
];

const hashString = (value: string) => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

// mulberry32: small deterministic PRNG, so history is stable between reloads
const createRandom = (seed: string) => {
  let state = hashString(seed);
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const dayKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// Salary period runs from the 15th up to the 14th of the next month
const periodStart = (date: Date) =>
  date.getDate() >= SALARY_DAY
    ? new Date(date.getFullYear(), date.getMonth(), SALARY_DAY)
    : new Date(date.getFullYear(), date.getMonth() - 1, SALARY_DAY);

const generatePeriod = (
  profileId: string,
  salary: number,
  start: Date
): Map<string, Transaction[]> => {
  const random = createRandom(`${profileId}:${dayKey(start)}`);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, SALARY_DAY);
  const days: Date[] = [];
  for (let day = start; day < end; day = addDays(day, 1)) {
    days.push(day);
  }

  const drafts = days.flatMap((day) => {
    const count =
      MIN_PER_DAY + Math.floor(random() * (MAX_PER_DAY - MIN_PER_DAY + 1));
    return Array.from({ length: count }, () => {
      const merchant = MERCHANTS[Math.floor(random() * MERCHANTS.length)];
      return {
        day,
        title: merchant.title,
        weight: merchant.min + random() * (merchant.max - merchant.min),
      };
    });
  });

  // Spend 70-95% of the salary over the period, never more than it
  const budget = salary * (0.7 + random() * 0.25);
  const totalWeight = drafts.reduce((sum, d) => sum + d.weight, 0);

  const result = new Map<string, Transaction[]>();
  result.set(dayKey(start), [
    {
      id: `${dayKey(start)}-salary`,
      type: 'deposit',
      title: 'Salary',
      amount: salary,
      date: start,
    },
  ]);

  drafts.forEach((draft, index) => {
    const amount = Math.floor((budget * draft.weight * 100) / totalWeight) / 100;
    if (amount <= 0) return;
    const key = dayKey(draft.day);
    const list = result.get(key) ?? [];
    list.push({
      id: `${key}-${index}`,
      type: 'withdrawal',
      title: draft.title,
      amount,
      date: draft.day,
    });
    result.set(key, list);
  });

  return result;
};

export const generateTransactions = (
  profileId: string,
  salary: number,
  today = new Date()
): TransactionDay[] => {
  const lastDay = startOfDay(today);
  const firstDay = addDays(lastDay, -HISTORY_DAYS + 1);
  const byDay = new Map<string, Transaction[]>();

  if (salary > 0) {
    // Whole periods are generated so past days do not change as time goes on
    for (
      let start = periodStart(firstDay);
      start <= lastDay;
      start = new Date(start.getFullYear(), start.getMonth() + 1, SALARY_DAY)
    ) {
      generatePeriod(profileId, salary, start).forEach((list, key) =>
        byDay.set(key, list)
      );
    }
  }

  const days: TransactionDay[] = [];
  for (let day = lastDay; day >= firstDay; day = addDays(day, -1)) {
    const transactions = byDay.get(dayKey(day));
    if (transactions?.length) {
      days.push({ date: day, transactions });
    }
  }
  return days;
};
