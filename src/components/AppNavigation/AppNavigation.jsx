import { Tooltip } from 'antd';
import Button from 'app/components/AppNavigation/Button';
import { showToday } from 'app/effects/schedule';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';


/**
 * AppNavigation component
 *
 * @returns {*}
 */
export default function AppNavigation() {
  const dispatch = useDispatch();

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
            onClick={() => dispatch(showToday())}
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
