import {
  Icon,
  Spin,
} from 'antd';
import React from 'react';


/**
 * Class LoadingSpinner
 */
export default class LoadingSpinner extends React.PureComponent {
  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center">
        <Spin indicator={<Icon type="loading" style={{ fontSize: 60 }} spin/>}/>
      </div>
    );
  }
}
