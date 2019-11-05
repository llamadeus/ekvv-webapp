import ImmutablePropTypes from 'immutable-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Event component
 *
 * @param props
 * @returns {*}
 */
export default function Event(props) {
  const { event, style } = props;

  return (
    <div
      className={styles.root}
      style={style}
    >
      <div className={styles.header}>
        <div className={styles.summary}>
          {event.get('summary', 'Unbekannter Kurs')}
        </div>
        <div>
          {event.get('location', '')}
        </div>
      </div>
    </div>
  );
}

Event.propTypes = {
  event: ImmutablePropTypes.map.isRequired,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
};
