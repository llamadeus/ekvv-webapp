import {
  call,
  put,
} from '@redux-saga/core/effects';
import * as is from '@redux-saga/is';
import { CHANNEL } from 'app/lib/redux-saga-batching/src/constants';
import { getChannelActions } from 'app/lib/redux-saga-batching/src/utils';
import { batchActions } from 'redux-batched-actions';
import { channel } from 'redux-saga';


/**
 * Create a new saga which injects the given channel into each effect.
 *
 * @param saga
 * @param batchChannel
 * @returns {function(...args): IterableIterator<*>}
 */
export function createBatchedSaga(saga, batchChannel) {
  return function* batched(...args) {
    const generator = saga(...args);
    let previous;

    while (true) {
      const { value, done } = generator.next(previous);

      if (done) {
        break;
      }

      if (is.effect(value)) {
        value[CHANNEL] = batchChannel;
      }

      previous = yield value;
    }
  };
}

/**
 * Run the given saga with batched actions.
 *
 * @param saga
 * @param args
 * @returns {IterableIterator<*>}
 */
export function* withBatching(saga, ...args) {
  const batchChannel = yield call(channel);
  const batchedSaga = createBatchedSaga(saga, batchChannel);

  yield* batchedSaga(...args);

  const actions = yield getChannelActions(batchChannel);

  yield put(batchActions(actions));
}
