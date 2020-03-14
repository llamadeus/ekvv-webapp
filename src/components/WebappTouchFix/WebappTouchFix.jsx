import React from 'react';
import { Helmet } from 'react-helmet';


/**
 * WebappTouchFix component
 *
 * @returns {*}
 */
export default function WebappTouchFix() {
  return (
    <Helmet>
      <style type="text/css">{`
body {
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  overscroll-behavior-y: contain;
}
`}
      </style>
    </Helmet>
  );
}
