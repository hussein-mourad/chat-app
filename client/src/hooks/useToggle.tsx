import { useCallback, useState } from "react";

// https://usehooks.com/useToggle/
export default function useToggle(
  initialState: boolean = false
): [boolean, any] {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((): void => setState((state) => !state), []);
  return [state, toggle];
};
