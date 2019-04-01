import { Layout } from 'antd';
import React from 'react';


/**
 * Class Navigation
 */
export default class Navigation extends React.PureComponent {
  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <Layout.Header className="tw-text-white">
        <div className="tw-max-w-sm tw-mx-auto xs:tw-px-4">
          eKVV
        </div>
      </Layout.Header>
    );
  }
}
