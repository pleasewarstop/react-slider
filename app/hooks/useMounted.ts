import { createContext, useContext, useEffect, useState } from "react";

export const mountedContext = createContext(false);

export const useMounted = () => useContext(mountedContext);

export function useMountedProvider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted;
}
