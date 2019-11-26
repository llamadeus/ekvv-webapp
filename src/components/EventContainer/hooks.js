import {
  MINUTES_PER_QUARTER,
  QUARTERS_PER_HOUR,
} from 'app/constants/schedule';
import moment from 'moment';
import { useMemo } from 'react';


/**
 * Compute the positions of individual event cards.
 *
 * @param events
 */
export function useEventPositions(events) {
  return useMemo(() => {
    const positions = {};
    const lanes = [];

    events.forEach((event) => {
      const uid = event.get('uid');
      const eventStart = moment(event.get('start'));
      const eventEnd = moment(event.get('end'));
      const startHour = Number(eventStart.format('H'));
      const startQuarter = Math.ceil(Number(eventStart.format('m')) / MINUTES_PER_QUARTER);
      const endHour = Number(eventEnd.format('H'));
      const endQuarter = Math.ceil(Number(eventStart.format('m')) / MINUTES_PER_QUARTER);
      const quarterIndexStart = startHour * QUARTERS_PER_HOUR + startQuarter;
      const quarterIndexEnd = endHour * QUARTERS_PER_HOUR + endQuarter;
      let lanesTotal = 1;
      let laneIndex = 0;

      lanes.forEach((lane, index) => {
        if (uid === lane.uid) {
          return;
        }

        const startIsBetween = lane.quarterIndexStart <= quarterIndexStart && quarterIndexStart < lane.quarterIndexEnd;
        const endIsBetween = lane.quarterIndexStart < quarterIndexEnd && quarterIndexEnd <= lane.quarterIndexEnd;

        if (startIsBetween || endIsBetween) {
          lanesTotal += 1;
          laneIndex += 1;

          lanes[index].lanesTotal += 1;
        }
      });

      lanes.push({
        uid,
        quarterIndexStart,
        quarterIndexEnd,
        lanesTotal,
        laneIndex,
      });
    });

    lanes.forEach((lane) => {
      positions[lane.uid] = lane;
    });

    return positions;
  }, [events]);
}
