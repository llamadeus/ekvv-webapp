import {
  push,
  replace,
} from 'connected-react-router';
import { useReplace } from '../utils/history';


/**
 * Transition to the given path.
 * History entry is replaced on Apple handheld devices.
 *
 * @param path
 * @returns {*}
 */
export function transitionTo(path) {
  return useReplace()
    ? replace(path)
    : push(path);
}
