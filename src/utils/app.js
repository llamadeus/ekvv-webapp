/**
 * Check if webapp mode is enabled.
 *
 * @returns {boolean}
 */
export function isWebapp() {
  const params = new URLSearchParams(document.location.search.substring(1));

  return params.get('webapp') === '1';
}

/**
 * Get the webapp type.
 *
 * @returns {string}
 */
export function webappType() {
  return isWebapp() ? 'Web-App' : 'Seite';
}
