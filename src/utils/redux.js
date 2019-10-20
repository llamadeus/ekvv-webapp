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
 * Scope the given types by prefixing each key with `scope`.
 *
 * @param scope
 * @param types
 * @returns {*}
 */
export function createScopedTypes(scope, types) {
  return Object.keys(types).reduce((carry, key) => ({
    ...carry,
    [key]: `${scope}/${types[key]}`,
  }), {});
}

/**
 * Scope the given actions.
 *
 * @param scope
 * @param actions
 * @returns {string}
 */
export function createScopedActions(scope, actions) {
  return createScopedTypes(`${scope}/actions`, actions);
}

/**
 * Scope the given effects.
 *
 * @param scope
 * @param effects
 * @returns {string}
 */
export function createScopedEffects(scope, effects) {
  return createScopedTypes(`${scope}/effects`, effects);
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
