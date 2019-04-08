import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
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
          <div className="tw-flex tw-flex-1 tw-justify-between">
            <Link
              to="/"
              className="tw-text-white hover:tw-text-white tw-text-xl"
            >
              eKVV
            </Link>
          </div>
        </div>
      </Layout.Header>
    );
  }
}
