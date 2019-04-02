import { Layout } from 'antd';
import React from 'react';
import { isWebapp } from '../../utils/app';
import styles from './styles.module.scss';


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
    if (isWebapp()) {
      return false;
    }

    return (
      <Layout.Header className="tw-text-white">
        <div className="tw-max-w-sm tw-mx-auto xs:tw-px-4">
          <span className={styles.brand}>eKVV</span>
        </div>
      </Layout.Header>
    );
  }
}
