import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);

      // Поддержка современных браузеров и старых (типа Safari < 14)
      if (mql.addEventListener) {
        mql.addEventListener('change', callback);
      } else {
        mql.addListener(callback);
      }

      // Функция отписки
      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener('change', callback);
        } else {
          mql.removeListener(callback);
        }
      };
    },

    () => window.matchMedia(query).matches,

    () => false,
  );
}
