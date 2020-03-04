import { Tooltip } from 'antd';
import { setRequestedDay } from 'app/actions/schedule';
import Button from 'app/components/AppNavigation/Button';
import {
  getSelectedDay,
  getSelectedWeek,
} from 'app/selectors/schedule';
import { transitionTo } from 'app/utils/history';
import {
  clampMomentInstanceToWeekdays,
  getDayByMomentInstance,
  getMomentInstanceByDay,
} from 'app/utils/schedule';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';


/**
 * AppNavigation component
 *
 * @returns {*}
 */
export default function AppNavigation() {
  const location = useLocation();
  const store = useStore();
  const handleWeekButtonClick = useCallback(() => {
    if (location.pathname !== '/') {
      store.dispatch(transitionTo('/'));
    }
    else {
      const state = store.getState();
      const selectedWeek = getSelectedWeek(state);
      const selectedDay = getSelectedDay(state);
      const selectedDayAsMoment = getMomentInstanceByDay(selectedWeek, selectedDay);
      const today = clampMomentInstanceToWeekdays(moment());

      if (today.isSame(selectedWeek, 'week') && !today.isSame(selectedDayAsMoment, 'day')) {
        const day = getDayByMomentInstance(today);

        store.dispatch(setRequestedDay(day));
      }
    }
  }, [location, store]);

  return (
    <div className={styles.root}>
      <div className={styles.items}>
        <Tooltip placement="topLeft" title="Bald verfügbar!" arrowPointAtCenter>
          <div className={styles.item}>
            <Button
              to="/mensa"
              icon="silverware"
              title="Mensa"
              disabled
            />
          </div>
        </Tooltip>
        <Tooltip placement="top" title="Noch baldiger verfügbar!" arrowPointAtCenter>
          <div className={styles.item}>
            <Button
              to="/calendar"
              icon="calendar-outline"
              title="Kalendar"
              disabled
            />
          </div>
        </Tooltip>
        <div className={styles.item}>
          <Button
            to="/"
            icon="clock-outline"
            title="Woche"
            onClick={handleWeekButtonClick}
            exact
          />
        </div>
        <Tooltip placement="top" title="Demnächst verfügbar!" arrowPointAtCenter>
          <div className={styles.item}>
            <Button
              to="/exams"
              icon="school-outline"
              title="Klausuren"
              disabled
            />
          </div>
        </Tooltip>
        <div className={styles.item}>
          <Button
            to="/settings"
            icon="settings-outline"
            title="Einstellungen"
          />
        </div>
      </div>
    </div>
  );
}
