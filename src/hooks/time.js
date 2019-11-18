import { MILLISECONDS_PER_MINUTE } from 'app/constants/time';
import moment from 'moment';
import { useEffect } from 'react';


/**
 * Hook which invokes the given callback on minute change.
 *
 * @param callback
 */
export function useMinuteChange(callback) {
  useEffect(() => {
    let updateTimeout = null;

    function runUpdater() {
      const now = moment();
      const millisecondsUntilMinuteChange = MILLISECONDS_PER_MINUTE - (now.seconds() * 1000 + now.milliseconds());

      updateTimeout = setTimeout(() => {
        callback();

        runUpdater();
      }, millisecondsUntilMinuteChange + 1);
    }

    runUpdater();

    return () => {
      clearTimeout(updateTimeout);
    };
  }, [callback]);
}
