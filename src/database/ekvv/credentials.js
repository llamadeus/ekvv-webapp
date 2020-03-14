import { KEYS } from 'app/constants/keyval';
import keyval from 'app/utils/keyval';


/**
 * Store the given credentials (only the username for now).
 *
 * @param username
 * @returns {Promise<Key>|IDBRequest<IDBValidKey>|Promise<void>}
 */
export async function storeCredentials(username) {
  await keyval.set(KEYS.EKVV_CREDENTIALS, {
    username,
  });
}

/**
 * Fetch the credentials.
 *
 * @returns {Promise<*|undefined>}
 */
export function fetchCredentials() {
  return keyval.get(KEYS.EKVV_CREDENTIALS);
}
