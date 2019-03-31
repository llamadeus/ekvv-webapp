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
    const value = await database.keyval.get(key);

    return typeof value == 'undefined'
      ? defaultValue
      : value;
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
};
