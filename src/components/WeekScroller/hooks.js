import { setSelectedDay } from 'app/actions/schedule';
import {
  animate,
  Easing,
} from 'app/utils/animation';
import { getDayByIndex } from 'app/utils/schedule';
import { debounce } from 'lodash-es';
import {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';


/**
 * Update the selected day based on the `scrollLeft` of the week scroller.
 *
 * @param scrollPerDay
 * @returns {*}
 */
export function useSelectedDayUpdater(scrollPerDay) {
  const dispatch = useDispatch();

  return useCallback(({ scrollLeft }) => {
    if (scrollPerDay === null) {
      return;
    }

    const dayIndex = Math.round(scrollLeft / scrollPerDay);
    const day = getDayByIndex(dayIndex);

    if (typeof day != 'undefined') {
      dispatch(setSelectedDay(day));
    }
  }, [scrollPerDay, dispatch]);
}

/**
 * Handle scroll events.
 *
 * @param ref
 * @param handler
 * @returns {[*, *]}
 */
export function useScrollHandler(ref, handler) {
  const preventDispatchOnNextScrollRef = useRef(false);
  const handleScrollDebounced = useCallback(debounce(handler, 250), [handler]);
  const handleScroll = useCallback((event) => {
    if (ref === null) {
      return;
    }

    if (event.target !== ref) {
      return;
    }

    if (preventDispatchOnNextScrollRef.current) {
      preventDispatchOnNextScrollRef.current = false;

      return;
    }

    handleScrollDebounced({
      scrollLeft: event.target.scrollLeft,
      scrollTop: event.target.scrollTop,
    });
  }, [ref, handleScrollDebounced]);
  const setScroll = useCallback((targetScroll) => {
    if (ref === null) {
      return;
    }

    preventDispatchOnNextScrollRef.current = true;

    ref.scroll(targetScroll, null);
  }, [ref]);
  const setScrollAnimated = useCallback((targetScroll, callback) => {
    if (ref === null) {
      return;
    }

    const currentScroll = ref.scrollLeft;
    const scrollRange = targetScroll - currentScroll;

    animate({
      start: () => {
        // eslint-disable-next-line no-param-reassign
        ref.style.scrollSnapType = 'none';
      },
      progress: (percentage) => {
        setScroll(currentScroll + scrollRange * Easing.easeInOutQuad(percentage));
      },
      done: () => {
        ref.style.removeProperty('scroll-snap-type');

        setScroll(targetScroll, null);

        callback();
      },
    }, 350);
  }, [ref, setScroll]);

  useEffect(() => () => {
    handleScrollDebounced.cancel();
  }, [handleScrollDebounced]);

  return [handleScroll, setScroll, setScrollAnimated];
}
