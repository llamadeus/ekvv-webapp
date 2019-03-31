import {
  fromJS,
  Map,
} from 'immutable';
import { connect } from 'react-redux';


/**
 * Map state to props.
 *
 * @param stateToProps
 */
export function mapStateToProps(stateToProps) {
  return connect(stateToProps);
}

/**
 * Map dispatch to props.
 *
 * @param dispatchToProps
 */
export function mapDispatchToProps(dispatchToProps) {
  return connect(undefined, dispatchToProps);
}

/**
 * Create a map from the given data, where the key is the `key` value of data.
 *
 * @param data
 * @param key
 * @returns {Map}
 */
export function mapByKey(data, key = 'id') {
  return Map().withMutations((mutator) => {
    fromJS(data).forEach((value) => {
      mutator.set(value.get(key), value);
    });
  });
}
