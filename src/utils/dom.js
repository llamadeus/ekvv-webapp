/**
 * Get the inner size of the given element.
 *
 * @param element
 * @returns {{width: number, height: number}}
 */
export function getSize(element) {
  return {
    width: parseFloat(element.clientWidth),
    height: parseFloat(element.clientHeight),
  };
}
