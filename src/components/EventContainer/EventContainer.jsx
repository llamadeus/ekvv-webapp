import Event from 'app/components/Event';
import { useEventPositions } from 'app/components/EventContainer/hooks';
import {
  EVENT_PADDING,
  QUARTERS_PER_HOUR,
} from 'app/constants/schedule';
import { useElementSize } from 'app/hooks/dom';
import { getSize } from 'app/utils/dom';
import ImmutablePropTypes from 'immutable-prop-types';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import styles from './styles.module.scss';


/**
 * EventContainer component
 *
 * @param props
 * @returns {*}
 */
export default function EventContainer(props) {
  const { events, start, end } = props;
  const [ref, setRef] = useState(null);
  const size = useElementSize(ref, getSize);
  const positions = useEventPositions(events);
  const computeStyle = useCallback((event) => {
    if (ref === null || size === null) {
      return {};
    }

    const quarterIndexScheduleStart = start * QUARTERS_PER_HOUR;
    const quarterIndexScheduleEnd = end * QUARTERS_PER_HOUR;
    const numberOfFrameItems = quarterIndexScheduleEnd - quarterIndexScheduleStart + QUARTERS_PER_HOUR;
    const {
      quarterIndexStart,
      quarterIndexEnd,
      lanesTotal,
      laneIndex,
    } = positions[event.get('uid')];
    const widthPerLaneItem = size.width / lanesTotal;
    const heightPerFrameItem = size.height / numberOfFrameItems;
    const duration = quarterIndexEnd - quarterIndexStart;
    const computedTranslateY = (
      (quarterIndexStart - quarterIndexScheduleStart)
      * heightPerFrameItem
      + EVENT_PADDING
      + 1
    );
    const computedTranslateX = widthPerLaneItem * laneIndex;
    const computedWidth = lanesTotal === 1
      ? undefined
      : widthPerLaneItem - (laneIndex === lanesTotal - 1 ? 0 : 2 * EVENT_PADDING);
    const computedHeight = duration * heightPerFrameItem - (2 * EVENT_PADDING) - 1;

    return {
      transform: `translateX(${computedTranslateX}px) translateY(${computedTranslateY}px)`,
      width: computedWidth,
      height: computedHeight,
    };
  }, [ref, size, start, end, positions]);

  const maybeEvents = useMemo(() => {
    if (ref === null) {
      return false;
    }

    return events.valueSeq().map(event => (
      <Event
        key={event.get('uid')}
        event={event}
        style={computeStyle(event)}
      />
    )).toArray();
  }, [ref, events, computeStyle]);

  return (
    <div ref={setRef} className={styles.root}>
      {maybeEvents}
    </div>
  );
}

EventContainer.propTypes = {
  events: ImmutablePropTypes.map.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};
