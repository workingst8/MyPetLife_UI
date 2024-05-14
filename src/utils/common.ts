import { useEffect } from 'react';

export const useCommonEffects = () => {
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);
};
