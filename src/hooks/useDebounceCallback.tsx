import { useEffect, useRef, useCallback } from 'react';

export function useDebounceCallback<T>(
  value: T,
  callback: (debouncedValue: T) => void,
  delay: number = 300
) {
  const callbackRef = useRef(callback);

  // Update callback ref to the latest callback function
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Create a timeout that calls the callback after the debounce delay
    const handler = setTimeout(() => {
      callbackRef.current(value);
    }, delay);

    // Clear the timeout if the value changes or the component unmounts
    return () => clearTimeout(handler);
  }, [value, delay]);
}