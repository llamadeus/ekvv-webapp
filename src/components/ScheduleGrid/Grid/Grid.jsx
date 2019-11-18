import Line from 'app/components/ScheduleGrid/Line';
import TimeIndicator from 'app/components/TimeIndicator';
import { range } from 'lodash-es';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';


/**
 * Grid component
 *
 * @param props
 * @returns {*}
 */
export default function Grid(props) {
  const { start, end, showTimeIndicator } = props;
  const timeBlocks = useMemo(() => range(end - start + 1).map(time => (
    <div key={time} className={styles.item}>
      <Line label={`${(time + start).toString().padStart(2, '0')}:00`}/>
    </div>
  )), [start, end]);
  const maybeTimeIndicator = useMemo(() => {
    if (!showTimeIndicator) {
      return false;
    }

    return (
      <TimeIndicator
        start={start}
        end={end}
      />
    );
  }, [showTimeIndicator, start, end]);

  return (
    <div className={styles.root}>
      {timeBlocks}
      {maybeTimeIndicator}
    </div>
  );
}

Grid.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  showTimeIndicator: PropTypes.bool.isRequired,
};
