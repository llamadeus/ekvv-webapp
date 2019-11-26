import { Card } from 'antd';
import styles from 'app/components/DayCard/styles.module.scss';
import Schedule from 'app/components/Schedule';
import { DAY_OFFSETS } from 'app/constants/schedule';
import { getSelectedWeek } from 'app/selectors/schedule';
import { DayShape } from 'app/shapes/schedule';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';


/**
 * Custom style for the card body.
 *
 * @type {Object}
 */
const CARD_BODY_STYLE = {
  display: 'flex',
  flex: 1,
  padding: 0,
};

/**
 * DayCard component
 *
 * @param props
 * @returns {*}
 */
export default function DayCard(props) {
  const { day } = props;
  const selectedWeek = useSelector(getSelectedWeek);
  const date = moment(selectedWeek).add(DAY_OFFSETS[day], 'days');
  const headerClasses = classNames({
    'tw-underline': date.isSame(moment(), 'day'),
  });

  return (
    <div className={styles.root}>
      <h1 className={headerClasses}>
        {date.format('dddd, DD. MMMM')}
      </h1>
      <Card
        className="tw-flex tw-flex-1"
        bodyStyle={CARD_BODY_STYLE}
      >
        <Schedule
          week={selectedWeek}
          day={day}
        />
      </Card>
    </div>
  );
}

DayCard.propTypes = {
  day: DayShape.isRequired,
};
