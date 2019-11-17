import { shouldReplace } from 'app/utils/history';
import {
  push,
  replace,
} from 'connected-react-router';


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
