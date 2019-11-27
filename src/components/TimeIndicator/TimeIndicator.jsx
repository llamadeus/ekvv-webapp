import Line from 'app/components/ScheduleGrid/Line';
import { useElementSize } from 'app/hooks/dom';
import { useTimeChange } from 'app/hooks/time';
import { timeToMinutes } from 'app/utils/time';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import styles from './styles.module.scss';


/**
 * Get the available height.
 *
 * @param element
 * @returns {number}
 */
function getAvailableHeight(element) {
  return element.parentElement.clientHeight;
}

/**
 * TimeIndicator component
 *
 * @param props
 * @returns {*}
 * @returns {boolean|*}
 */
export default function TimeIndicator(props) {
  const { start, end } = props;
  const [now, setNow] = useState(moment());
  const [ref, setRef] = useState(null);
  const availableHeight = useElementSize(ref, getAvailableHeight);
  const translatePerMinute = useMemo(() => {
    const spanInMinutes = (end - start + 1) * 60;

    return availableHeight / spanInMinutes;
  }, [start, end, availableHeight]);
  const computedStyle = useMemo(() => {
    if (Number.isNaN(translatePerMinute)) {
      return {};
    }

    const minutes = timeToMinutes(now.hours() - start, now.minutes());
    const translateY = minutes * translatePerMinute;

    return {
      transform: `translateY(${translateY}px)`,
    };
  }, [start, now, translatePerMinute]);

  useTimeChange(useCallback(() => {
    setNow(moment());
  }, []), 'minute', true);

  if (now.hours() < start || now.hours() > end) {
    return false;
  }

  return (
    <div
      ref={setRef}
      className={styles.root}
      style={computedStyle}
    >
      <Line
        label={now.format('HH:mm')}
        active
      />
    </div>
  );
}

TimeIndicator.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};
