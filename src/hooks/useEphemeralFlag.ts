import { useEffect, useState } from 'react';

export function useEphemeralFlag(duration = 5000) {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [flag, duration]);

  return [flag, setFlag] as const;
}
