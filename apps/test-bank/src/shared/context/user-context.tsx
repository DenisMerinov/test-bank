import { createContext, useContext, useEffect, useState } from 'react';
import {
  Currency,
  DEFAULT_PROFILES,
  formatBalance,
  UserProfile,
} from '../consts/user.const';

const STORAGE_KEY = 'userSettings';

type StoredSettings = {
  activeId: string;
  currency: Currency;
  profiles: UserProfile[];
};

type UserContextValue = {
  user: UserProfile;
  profiles: UserProfile[];
  currency: Currency;
  setActiveProfile: (id: string) => void;
  setBalance: (balance: number) => void;
  setSalary: (salary: number) => void;
  setCurrency: (currency: Currency) => void;
  formatMoney: (balance: number) => string;
};

const UserContext = createContext<UserContextValue | null>(null);

const loadSettings = (): StoredSettings => {
  const fallback: StoredSettings = {
    activeId: DEFAULT_PROFILES[0].id,
    currency: 'RUB',
    profiles: DEFAULT_PROFILES,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const stored = JSON.parse(raw) as StoredSettings;
    // Defaults define the profile list; only balance and salary come from storage.
    const profiles = DEFAULT_PROFILES.map((profile) => {
      const saved = stored.profiles?.find((p) => p.id === profile.id);
      return {
        ...profile,
        balance:
          typeof saved?.balance === 'number' ? saved.balance : profile.balance,
        salary:
          typeof saved?.salary === 'number' ? saved.salary : profile.salary,
      };
    });
    const activeId = profiles.some((p) => p.id === stored.activeId)
      ? stored.activeId
      : fallback.activeId;
    const currency = stored.currency === 'USD' ? 'USD' : 'RUB';
    return { activeId, currency, profiles };
  } catch {
    return fallback;
  }
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<StoredSettings>(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // storage may be unavailable, keep settings in memory only
    }
  }, [settings]);

  const user =
    settings.profiles.find((p) => p.id === settings.activeId) ??
    settings.profiles[0];

  const value: UserContextValue = {
    user,
    profiles: settings.profiles,
    currency: settings.currency,
    setActiveProfile: (id) => setSettings((s) => ({ ...s, activeId: id })),
    setBalance: (balance) =>
      setSettings((s) => ({
        ...s,
        profiles: s.profiles.map((p) =>
          p.id === s.activeId ? { ...p, balance } : p
        ),
      })),
    setSalary: (salary) =>
      setSettings((s) => ({
        ...s,
        profiles: s.profiles.map((p) =>
          p.id === s.activeId ? { ...p, salary } : p
        ),
      })),
    setCurrency: (currency) => setSettings((s) => ({ ...s, currency })),
    formatMoney: (balance) => formatBalance(balance, settings.currency),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
