import {
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';


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

  useLayoutEffect(() => {
    if (ref === null) {
      return undefined;
    }

    update(ref);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref, update, handleResize]);

  return state;
}
