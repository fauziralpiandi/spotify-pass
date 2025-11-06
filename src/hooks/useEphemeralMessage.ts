import { useEffect, useState } from 'react';

export function useEphemeralMessage(duration = 5000) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, duration]);

  return [message, setMessage] as const;
}
