import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Line component
 *
 * @param props
 * @returns {*}
 */
export default function Line(props) {
  const { label, active } = props;
  const rootClasses = classNames(styles.root, {
    [styles.active]: active,
  });

  return (
    <div className={rootClasses}>
      <div className={styles.line}/>

      <div className={styles.label}>
        {label}
      </div>
    </div>
  );
}

Line.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

Line.defaultProps = {
  active: false,
};
