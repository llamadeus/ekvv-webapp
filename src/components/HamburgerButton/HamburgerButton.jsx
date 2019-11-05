import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useMemo,
} from 'react';
import styles from './styles.module.scss';


/**
 * HamburgerButton component
 *
 * @param props
 * @returns {*}
 */
export default function HamburgerButton(props) {
  const { active, onClick } = props;
  const classes = useMemo(() => classNames(styles.root, {
    [styles.active]: active,
  }), [active]);
  const handleKeyPress = useCallback((event) => {
    if (event.which === 13 || event.which === 32) {
      onClick(event);
    }
  }, [onClick]);

  return (
    <div
      className={classes}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div className={styles.bar}/>
      <div className={styles.bar}/>
      <div className={styles.bar}/>
    </div>
  );
}

HamburgerButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
