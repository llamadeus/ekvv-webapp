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
  const { name, className, fixedWidth } = props;
  const classes = classNames('mdi', `mdi-${name}`, className, {
    [styles.fw]: fixedWidth,
  });

  return (
    <i className={classes}/>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  fixedWidth: PropTypes.bool,
};

Icon.defaultProps = {
  className: undefined,
  fixedWidth: false,
};
