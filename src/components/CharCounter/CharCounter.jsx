import { Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * CharCounter component
 *
 * @param props
 * @returns {*}
 */
export default function CharCounter(props) {
  const { value, maxLength } = props;
  const { length } = value;

  return (
    <div className={styles.root}>
      <Typography.Text type={length <= maxLength ? 'secondary' : 'danger'}>
        {length} / {maxLength}
      </Typography.Text>
    </div>
  );
}

CharCounter.propTypes = {
  value: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
};

CharCounter.defaultProps = {
  value: '',
};
