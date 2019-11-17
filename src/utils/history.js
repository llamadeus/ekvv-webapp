import {
  isAppleHandheld,
  isWebapp,
} from 'app/utils/app';


/**
 * Determine whether location changes should replace the history entry.
 *
 * @returns {boolean}
 */
export function shouldReplace() {
  return isWebapp() && isAppleHandheld();
}
