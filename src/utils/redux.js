import {
  fromJS,
  Map,
} from 'immutable';


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
