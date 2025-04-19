// src/utils/debounce.ts

/**
 * A type-safe debounce function that delays invoking a function
 * until after wait milliseconds have elapsed since the last invocation.
 *
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export const debounce = <Args extends unknown[], Return>(
  func: (...args: Args) => Promise<Return>,
  wait: number,
): ((...args: Args) => Promise<Return>) & { cancel: () => void } => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let latestResolve: ((value: Return) => void) | null = null;

  const debouncedFunction = (...args: Args): Promise<Return> => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      latestResolve = resolve;

      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        latestResolve?.(result);
        latestResolve = null;
      }, wait);
    });
  };

  debouncedFunction.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (latestResolve) {
      latestResolve(null as unknown as Return); // Safe rejection
      latestResolve = null;
    }
  };

  return debouncedFunction;
};
