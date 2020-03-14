import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';


/**
 * Ask the user for confirmation.
 *
 * @param options
 * @returns {Promise<unknown>}
 */
export function confirm(options) {
  return new Promise((resolve) => {
    Modal.confirm({
      // eslint-disable-next-line react/jsx-filename-extension
      icon: <QuestionCircleOutlined/>,
      okText: 'Ja',
      okType: 'primary',
      cancelText: 'Nein',
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
      ...options,
    });
  });
}
