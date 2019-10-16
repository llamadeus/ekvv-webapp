import React from 'react';


/**
 * Class Footer
 */
export default class Footer extends React.PureComponent {
  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div className="tw-flex tw-mt-2 tw-px-1 tw-justify-between tw-text-gray-500 tw-text-sm">
        <div/>

        <div>
          Version: v{process.env.REACT_APP_VERSION}
        </div>
      </div>
    );
  }
}
