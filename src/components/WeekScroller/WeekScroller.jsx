import {
  resetRequestedDay,
  setSelectedDay,
} from 'app/actions/schedule';
import DayCard from 'app/components/DayCard';
import {
  useScrollHandler,
  useSelectedDayUpdater,
} from 'app/components/WeekScroller/hooks';
import {
  DAYS,
  DAYS_SORTED,
} from 'app/constants/schedule';
import { useElementSize } from 'app/hooks/dom';
import {
  getRequestedDay,
  getSelectedDay,
} from 'app/selectors/schedule';
import { getIndexByDay } from 'app/utils/schedule';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styles from './styles.module.scss';


/**
 * Compute the scroll per day.
 *
 * @param element
 * @returns {number}
 */
function getScrollPerDay(element) {
  const scrollableWidth = element.scrollWidth - element.clientWidth;

  return scrollableWidth / (Object.keys(DAYS).length - 1);
}

/**
 * WeekScroller component
 *
 * @returns {*}
 */
export default function WeekScroller() {
  const selectedDay = useSelector(getSelectedDay);
  const requestedDay = useSelector(getRequestedDay);
  const dispatch = useDispatch();
  const [ref, setRef] = useState(null);
  const didPerformInitialScroll = useRef(false);
  const scrollPerDay = useElementSize(ref, useCallback((element) => {
    didPerformInitialScroll.current = false;

    return getScrollPerDay(element);
  }, []));
  const getScrollLeftByDay = useCallback((day) => {
    const dayIndex = getIndexByDay(day);

    return dayIndex >= 0 && scrollPerDay !== null
      ? scrollPerDay * dayIndex
      : 0;
  }, [scrollPerDay]);
  const handleScroll = useSelectedDayUpdater(scrollPerDay);
  const [onScroll, setScroll, setScrollAnimated] = useScrollHandler(ref, handleScroll);

  // Scroll to selected day on mount
  useLayoutEffect(() => {
    if (scrollPerDay !== null && !didPerformInitialScroll.current) {
      didPerformInitialScroll.current = true;

      setScroll(getScrollLeftByDay(selectedDay));
    }
  }, [scrollPerDay, selectedDay, getScrollLeftByDay, setScroll]);

  // Scroll to requested day on update
  useEffect(() => {
    if (requestedDay !== null && requestedDay !== selectedDay) {
      dispatch(resetRequestedDay());

      setScrollAnimated(getScrollLeftByDay(requestedDay), () => {
        dispatch(setSelectedDay(requestedDay));
      });
    }
  }, [requestedDay, selectedDay, getScrollLeftByDay, setScrollAnimated, dispatch]);

  const days = useMemo(() => (
    DAYS_SORTED.map(key => (
      <DayCard key={key} day={DAYS[key]}/>
    ))
  ), []);

  return (
    <div
      ref={setRef}
      className={styles.root}
      onScroll={onScroll}
    >
      {days}
      <div className={styles.placeholder}/>
    </div>
  );
}
