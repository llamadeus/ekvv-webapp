import {
  DAYS_PER_WEEK,
  HOURS_PER_DAY,
  MILLISECONDS_PER_SECOND,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
} from 'app/constants/time';
import moment from 'moment';
import { useEffect } from 'react';


/**
 * Invoke the given callback on second, minute, hour, day or week change.
 *
 * @param callback
 * @param unit
 * @param repeat
 */
export function useTimeChange(callback, unit, repeat) {
  useEffect(() => {
    let timeout = null;

    function run() {
      const now = moment();
      let millisecondsUntilUnitChange = 0;

      switch (unit) {
      case 'week':
        millisecondsUntilUnitChange += (DAYS_PER_WEEK - ((now.days() + 6) % 7) - 1)
          * HOURS_PER_DAY
          * MINUTES_PER_HOUR
          * SECONDS_PER_MINUTE
          * MILLISECONDS_PER_SECOND;
        // eslint-disable-next-line no-fallthrough
      case 'day':
        millisecondsUntilUnitChange += (HOURS_PER_DAY - now.hours() - 1)
          * MINUTES_PER_HOUR
          * SECONDS_PER_MINUTE
          * MILLISECONDS_PER_SECOND;
        // eslint-disable-next-line no-fallthrough
      case 'hour':
        millisecondsUntilUnitChange += (MINUTES_PER_HOUR - now.minutes() - 1)
          * SECONDS_PER_MINUTE
          * MILLISECONDS_PER_SECOND;
        // eslint-disable-next-line no-fallthrough
      case 'minute':
        millisecondsUntilUnitChange += (SECONDS_PER_MINUTE - now.seconds() - 1)
          * MILLISECONDS_PER_SECOND;
        // eslint-disable-next-line no-fallthrough
      case 'second':
        millisecondsUntilUnitChange += MILLISECONDS_PER_SECOND - now.milliseconds() - 1;
        break;
      default:
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Invalid argument `unit`: please use one of the following units: `week`, `day`, `hour`, `minute` or `second`');
        }
        return;
      }

      timeout = setTimeout(() => {
        callback();

        if (repeat) {
          run();
        }
      }, millisecondsUntilUnitChange + 1);
    }

    run();

    return () => {
      clearTimeout(timeout);
    };
  }, [callback, unit, repeat]);
}
