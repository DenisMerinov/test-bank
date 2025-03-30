import { useState } from 'react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../shared/assets/icons/delete-btn.svg';
const CORRECT_PIN = '123456';

export function PinInput() {
  const [pin, setPin] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const navigate = useNavigate();

  // Добавляем цифру в PIN
  const handleDigitClick = (digit: string) => {
    // Если уже 6 цифр, больше не набираем
    if (pin.length >= 6) return;

    setActiveKey(digit);
    setTimeout(() => setActiveKey(null), 150);

    const newPin = pin + digit;
    setPin(newPin);

    // Если стало ровно 6, делаем проверку
    if (newPin.length === 6) {
      if (newPin === CORRECT_PIN) {
        setIsValid(true);
        sessionStorage.setItem('isPinValid', 'true');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setIsValid(false);
        setTimeout(() => {
          setPin('');
          setIsValid(null);
        }, 1000);
      }
    }
  };

  const handleDelete = () => {
    setActiveKey('Del');
    setTimeout(() => setActiveKey(null), 150);
    if (pin.length > 0) {
      setPin((prev) => prev.slice(0, -1));
      setIsValid(null);
    }
  };

  // Визуализация ввода через кружочки
  const circles = Array.from({ length: 6 }, (_, i) => {
    const filled = i < pin.length;
    return (
      <div
        key={i}
        className={cn(
          'size-5 rounded-full border-2 border-text-secondary transition-colors duration-300 bg-text-secondary',
          isValid === false
            ? 'bg-error border-error'
            : filled && 'bg-brand border-brand'
        )}
      />
    );
  });

  const renderKey = (label: string, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className={cn(
        'border-2 rounded-full p-2 size-[70px] text-xl font-semibold',
        activeKey === label ? 'border-brand' : 'border-text-secondary'
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-xl font-semibold mb-6">
        Enter your secure <span className="text-brand">PIN</span>
      </h2>

      <div
        className={cn(
          'flex gap-4 mb-4 relative',
          isValid === false ? 'animate-shake' : '',
          isValid === true ? 'animate-pop' : ''
        )}
      >
        {circles}

        {isValid === false && (
          <div className="bg-error px-4 py-2 rounded-full text-bg-primary text-center text-sm mb-4 absolute top-7 left-0 right-0">
            Wrong PIN!
          </div>
        )}

        {isValid === true && (
          <div className="px-4 py-2 rounded-full bg-brand-light text-center text-brand text-sm mb-4 absolute top-7 left-0 right-0">
            PIN is correct!
          </div>
        )}
      </div>

      {/* Виртуальная клавиатура */}
      <div className="grid grid-cols-3 gap-4">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) =>
          renderKey(digit, () => handleDigitClick(digit))
        )}
        <div />
        {renderKey('0', () => handleDigitClick('0'))}
        <button
          onClick={handleDelete}
          className={cn(
            'rounded-full size-[70px] flex items-center justify-center',
            activeKey === 'Del' && 'text-brand'
          )}
        >
          <DeleteIcon className={'size-[30px]'} />
        </button>
      </div>
    </div>
  );
}

export const PinPage = () => {
  return (
    <div className="pt-[140px]">
      <PinInput />
    </div>
  );
};
