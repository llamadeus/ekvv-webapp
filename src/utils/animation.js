/**
 * Request animation frame.
 *
 * @type {((callback: FrameRequestCallback) => number) | *}
 */
export const requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame;

/**
 * Easing functions.
 *
 * @type {{easeInOutQuad(*): *}}
 */
export const Easing = {
  linear(value) {
    return value;
  },
  easeInQuad(value) {
    return value * value;
  },
  easeOutQuad(value) {
    return value * (2 - value);
  },
  easeInOutQuad(value) {
    return value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value;
  },
  easeInCubic(value) {
    return value * value * value;
  },
  easeOutCubic(value) {
    const previousValue = value - 1;

    return previousValue * previousValue * previousValue + 1;
  },
  easeInOutCubic(value) {
    return value < 0.5
      ? 4 * value * value * value
      : (value - 1) * (2 * value - 2) * (2 * value - 2) + 1;
  },
  easeInQuart(value) {
    return value * value * value * value;
  },
  easeOutQuart(value) {
    const previousValue = value - 1;

    return 1 - previousValue * previousValue * previousValue * previousValue;
  },
  easeInOutQuart(value) {
    const previousValue = value - 1;

    return value < 0.5
      ? 8 * value * value * value * value
      : 1 - 8 * previousValue * previousValue * previousValue * previousValue;
  },
  easeInQuint(value) {
    return value * value * value * value * value;
  },
  easeOutQuint(value) {
    const previousValue = value - 1;

    return 1 + previousValue * previousValue * previousValue * previousValue * previousValue;
  },
  easeInOutQuint(value) {
    const previousValue = value - 1;

    return value < 0.5
      ? 16 * value * value * value * value * value
      : 1 + 16 * previousValue * previousValue * previousValue * previousValue * previousValue;
  },
};

/**
 * Animate
 *
 * @param callbackObj
 * @param callbackObj.start {function} Start callback
 * @param callbackObj.progress {function} Progress callback
 * @param callbackObj.done {function} Finish callback
 * @param duration Duration in milliseconds
 * @returns {*}
 */
export function animate(callbackObj, duration) {
  let startTime = 0;
  let animationTime = 0;

  const animation = (timestamp) => {
    if (startTime === 0) {
      startTime = timestamp;
    }
    else {
      animationTime = timestamp - startTime;
    }

    if (typeof callbackObj.start == 'function' && startTime === timestamp) {
      callbackObj.start();

      requestAnimationFrame(animation);
    }
    else if (animationTime < duration) {
      if (typeof callbackObj.progress == 'function') {
        callbackObj.progress(animationTime / duration);
      }

      requestAnimationFrame(animation);
    }
    else {
      if (typeof callbackObj.progress == 'function') {
        callbackObj.progress(1);
      }

      if (typeof callbackObj.done == 'function') {
        callbackObj.done();
      }
    }
  };

  return requestAnimationFrame(animation);
}
