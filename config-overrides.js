const {
  override,
  addDecoratorsLegacy,
  adjustWorkbox,
  disableEsLint,
} = require('customize-cra');


module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  adjustWorkbox(wb => Object.assign(wb, {
    skipWaiting: true,
  })),
);
