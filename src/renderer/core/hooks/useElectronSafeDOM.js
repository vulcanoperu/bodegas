import { useEffect, useState } from 'preact/hooks';

export function useElectronSafeDOM() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkDOM = () => {
      if (typeof window !== 'undefined' && window.document && window.electronAPI) {
        setIsReady(true);
      }
    };

    checkDOM();
    window?.addEventListener('load', checkDOM);
    return () => window?.removeEventListener('load', checkDOM);
  }, []);

  return isReady;
}