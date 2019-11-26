import { debounce } from 'lodash-es';
import {
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';


/**
 * Invoke callback when the window is resized.
 *
 * @param callback
 * @param initialInvoke
 */
export function useWindowResize(callback, initialInvoke) {
  const debouncedCallback = useCallback(debounce(callback, 100), [callback]);

  useLayoutEffect(() => {
    if (initialInvoke) {
      callback();
    }

    window.addEventListener('resize', debouncedCallback);

    return () => {
      window.removeEventListener('resize', debouncedCallback);
    };
  }, [callback, debouncedCallback, initialInvoke]);
}

/**
 * Use the element size.
 * The state will be updated when the window size changed.
 *
 * @param ref
 * @param accessor
 * @param initial
 * @returns {*}
 */
export function useElementSize(ref, accessor, initial = null) {
  const [state, setState] = useState(initial);
  const update = useCallback((element) => {
    if (element !== null) {
      setState(accessor(element));
    }
  }, [accessor]);
  const handleResize = useCallback(() => update(ref), [ref, update]);

  useWindowResize(handleResize, true);

  return state;
}
