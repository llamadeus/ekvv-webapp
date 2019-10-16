import {
  isAppleHandheld,
  isWebapp,
} from './app';


/**
 * Determine whether location changes should replace the history entry.
 *
 * @returns {boolean}
 */
export function useReplace() {
  return isWebapp() && isAppleHandheld();
}
