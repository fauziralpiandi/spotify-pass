import { useEffect, useState } from 'react';

export function useTokenCountdown(
  tokenData: { expires_in: number; timestamp: number } | null | undefined,
) {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (tokenData) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - tokenData.timestamp) / 1000);
        const remaining = Math.max(0, tokenData.expires_in - elapsed);

        setTimeRemaining(remaining);

        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [tokenData]);

  return timeRemaining;
}
