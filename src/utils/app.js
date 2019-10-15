/**
 * Check if webapp mode is enabled.
 *
 * @returns {boolean}
 */
export function isWebapp() {
  return window.matchMedia('(display-mode: standalone)').matches;
}

/**
 * Get the webapp type.
 *
 * @returns {string}
 */
export function webappType() {
  return isWebapp() ? 'Web-App' : 'Seite';
}
