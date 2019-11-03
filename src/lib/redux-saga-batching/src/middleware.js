import { createBatchedSaga } from 'app/lib/redux-saga-batching/src/sagas';
import { CHANNEL } from 'app/lib/redux-saga-batching/src/constants';


/**
 * The middleware which attaches the batch channel to all `PUT` actions.
 *
 * @param next
 * @returns {function(*): *}
 */
export default function middleware(next) {
  return (effect) => {
    const nextEffect = effect;

    if (typeof nextEffect[CHANNEL] != 'undefined') {
      switch (nextEffect.type) {
      case 'CALL':
        nextEffect.payload.fn = createBatchedSaga(
          nextEffect.payload.fn,
          nextEffect[CHANNEL],
        );
        break;

      case 'PUT':
        if (typeof nextEffect.payload.channel == 'undefined') {
          nextEffect.payload.channel = nextEffect[CHANNEL];
        }
        break;

      default:
      }
    }

    return next(nextEffect);
  };
}
