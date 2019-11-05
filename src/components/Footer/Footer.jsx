import React from 'react';


/**
 * Footer component
 *
 * @returns {*}
 */
export default function Footer() {
  return (
    <div className="tw-flex tw-mt-2 tw-px-1 tw-justify-between tw-text-gray-500 tw-text-sm">
      <div/>

      <div>
        Version: v{process.env.REACT_APP_VERSION}
      </div>
    </div>
  );
}
