import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Icon component
 *
 * @param props
 * @returns {*}
 */
export default function Icon(props) {
  const { name, fixedWidth } = props;
  const classes = classNames('mdi', `mdi-${name}`, {
    [styles.fw]: fixedWidth,
  });

  return (
    <i className={classes}/>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  fixedWidth: PropTypes.bool,
};

Icon.defaultProps = {
  fixedWidth: false,
};
