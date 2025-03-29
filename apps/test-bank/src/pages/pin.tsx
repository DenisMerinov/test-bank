import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const CORRECT_PIN = '123456';

export function PinInput() {
  const [pin, setPin] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Убираем любые не-цифры (если пользователь вставил текст)
    value = value.replace(/\D/g, '');
    // Ограничиваем длину PIN = 6
    if (value.length > 6) {
      value = value.slice(0, 6);
    }

    setPin(value);

    if (value.length === 6) {
      if (value === CORRECT_PIN) {
        setIsValid(true);
        // localStorage.setItem('isPinValid', 'true');
        // localStorage.setItem('pinActivatedAt', Date.now().toString());
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
    } else {
      setIsValid(null);
    }
  };

  const handleBlur = () => {
    if (inputRef.current && !document.hidden) {
      inputRef.current.focus();
    }
  };

  const circles = Array.from({ length: 6 }, (_, i) => {
    const filled = i < pin.length;
    return (
      <div
        key={i}
        className={cn(
          'size-[30px] rounded-full border-2 border-text-secondary transition-colors duration-300 bg-text-secondary',
          isValid === false
            ? 'bg-error border-error'
            : filled && 'bg-brand border-brand'
        )}
      />
    );
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-xl font-semibold mb-[84px]">
        Enter your secure <span className="text-brand">PIN</span>
      </h2>

      <input
        ref={inputRef}
        type="tel"
        value={pin}
        onChange={handleChange}
        maxLength={6}
        className="absolute opacity-0 pointer-events-none"
        onBlur={handleBlur}
      />

      <div
        className={cn(
          'flex gap-4 mb-4',
          isValid === false ? 'animate-shake' : '',
          isValid === true ? 'animate-pop' : ''
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {circles}
      </div>

      {isValid === false && (
        <div className="text-error text-sm">Wrong PIN!</div>
      )}
      {isValid === true && (
        <div className="text-brand text-sm">PIN is correct!</div>
      )}
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
