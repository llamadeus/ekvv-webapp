import {
  resetRequestedDay,
  setSelectedDay,
} from 'app/actions/schedule';
import WeekScroller from 'app/components/WeekScroller';
import {
  getRequestedDay,
  getSelectedDay,
  getSelectedWeek,
} from 'app/selectors/schedule';
import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';


/**
 * Schedule component
 *
 * @returns {*}
 */
export default function Schedule() {
  const selectedWeek = useSelector(getSelectedWeek);
  const selectedDay = useSelector(getSelectedDay);
  const requestedDay = useSelector(getRequestedDay);
  const dispatch = useDispatch();
  const handleSetSelectedDay = useCallback(day => dispatch(setSelectedDay(day)), [dispatch]);
  const handleResetRequestedDay = useCallback(() => dispatch(resetRequestedDay()), [dispatch]);

  return (
    <WeekScroller
      selectedWeek={selectedWeek}
      selectedDay={selectedDay}
      requestedDay={requestedDay}
      onSetSelectedDay={handleSetSelectedDay}
      onResetRequestedDay={handleResetRequestedDay}
    />
  );
}
