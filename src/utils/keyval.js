import database from '../database';


export default {
  /**
   * Get a value from the keyval store.
   *
   * @param key
   * @param defaultValue
   * @returns {Promise<*|undefined>}
   */
  async get(key, defaultValue = undefined) {
    const record = await database.keyval.get(key);

    return typeof record == 'undefined'
      ? defaultValue
      : record.value;
  },

  /**
   * Check if the given key exists in the keyval store.
   *
   * @param key
   * @returns {Promise<boolean>}
   */
  async has(key) {
    return typeof await database.keyval.get(key) != 'undefined';
  },

  /**
   * Write a value to the keyval store.
   *
   * @param key
   * @param value
   * @returns {Dexie.Promise<Key> | IDBRequest<IDBValidKey> | Promise<void>}
   */
  set(key, value) {
    return database.keyval.put({
      key,
      value,
    });
  },

  /**
   * Delete the value stored in `key`.
   *
   * @param key
   * @returns {*}
   */
  delete(key) {
    return database.keyval.delete(key);
  },
};
