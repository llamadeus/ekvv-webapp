import Dexie from 'dexie';
import { VERSIONS } from './versions';


/**
 * Database instance.
 *
 * @type {Dexie}
 */
const database = new Dexie('ekvv');

VERSIONS.forEach((schema, index) => {
  const version = index + 1;
  const converted = Object.keys(schema).reduce((carry, table) => ({
    ...carry,
    [table]: schema[table].join(','),
  }), {});

  database.version(version).stores(converted);
});

export default database;
