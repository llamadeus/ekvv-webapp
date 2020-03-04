import {
  Spin,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';


/**
 * LoadingSpinner component
 *
 * @returns {*}
 */
export default function LoadingSpinner() {
  return (
    <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }}/>}/>
    </div>
  );
}
