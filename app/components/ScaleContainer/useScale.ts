import { createContext, useContext, useRef, useState } from "react";
import { useResizeObserver } from "../../hooks/useResizeObserver";

export function useScale() {
  return useContext(scaleContext).value;
}

export function useIsScaleInitialized() {
  return useContext(scaleContext).initialized;
}

const initState = {
  value: 1,
  initialized: false,
};

export function useScaleProvider(maxScreenWidth: number) {
  const [state, set] = useState(initState);
  const stateRef = useRef(state);
  const setState = (state: typeof initState) => {
    stateRef.current = state;
    set(state);
  };

  useResizeObserver(
    {
      current:
        typeof document === "undefined" ? null : document.documentElement,
    },
    () => {
      const screenWidth =
        document.documentElement.getBoundingClientRect().width;

      if (screenWidth > maxScreenWidth) {
        setState({
          value: screenWidth / maxScreenWidth,
          initialized: true,
        });
      } else if (
        stateRef.current.value !== 1 ||
        !stateRef.current.initialized
      ) {
        setState({
          value: 1,
          initialized: true,
        });
      }
    },
  );

  return state;
}

export const scaleContext = createContext(initState);
