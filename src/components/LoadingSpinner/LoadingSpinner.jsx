import {
  Icon,
  Spin,
} from 'antd';
import React from 'react';


/**
 * LoadingSpinner component
 *
 * @returns {*}
 */
export default function LoadingSpinner() {
  return (
    <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center">
      <Spin indicator={<Icon type="loading" style={{ fontSize: 60 }} spin/>}/>
    </div>
  );
}
