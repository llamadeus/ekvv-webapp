/**
 * Get the actions of the given channel.
 *
 * @param channel
 * @returns {Promise<*[]>}
 */
export function getChannelActions(channel) {
  return new Promise(resolve => channel.flush(resolve));
}
