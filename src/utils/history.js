import {
  isAppleHandheld,
  isWebapp,
} from 'app/utils/app';
import {
  push,
  replace,
} from 'connected-react-router';


/**
 * Determine whether location changes should replace the history entry.
 *
 * @returns {boolean}
 */
export function shouldReplace() {
  return isWebapp() && isAppleHandheld();
}

/**
 * Transition to the given path.
 * History entry is replaced on Apple handheld devices.
 *
 * @param path
 * @returns {*}
 */
export function transitionTo(path) {
  return shouldReplace()
    ? replace(path)
    : push(path);
}
