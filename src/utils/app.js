import { APPLE_DEVICE_PLATFORMS } from '../constants/app';


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

/**
 * Determine if this device is an apple.
 *
 * @returns {boolean}
 */
export function isAppleHandheld() {
  return 'platform' in navigator
    ? APPLE_DEVICE_PLATFORMS.indexOf(navigator.platform) >= 0
    : false;
}
