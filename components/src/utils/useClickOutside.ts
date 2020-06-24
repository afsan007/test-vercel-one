import { useEffect } from 'react';

export const useClickOutside = (ref: any, callback: (event?: Event) => void): void => {
  const handleClickOutside = (e: any): void => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback(e);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  });
};
