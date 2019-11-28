import { Menu as AntDesignMenu } from 'antd';
import HamburgerButton from 'app/components/HamburgerButton/HamburgerButton';
import Icon from 'app/components/Icon';
import Item from 'app/components/Menu/Item';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import styles from './styles.module.scss';


/**
 * Menu component
 *
 * @param props
 * @returns {*}
 */
export default function Menu(props) {
  const { show, onUpdateShow } = props;
  const menuRef = useRef(null);
  const handleHamburgerButtonClick = useCallback((event) => {
    event.stopPropagation();

    onUpdateShow(value => !value);
  }, [onUpdateShow]);

  useEffect(() => {
    if (!show) {
      return undefined;
    }

    function handleGlobalClick(event) {
      event.preventDefault();
      event.stopPropagation();

      if (menuRef.current === null) {
        return;
      }

      if (menuRef.current.contains(event.target)) {
        return;
      }

      onUpdateShow(false);
    }

    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [show, onUpdateShow]);

  const classes = classNames(styles.menu, 'tw-width-100 tw-max-w-sm', {
    [styles.active]: show,
  });

  return (
    <>
      <HamburgerButton
        active={show}
        onClick={handleHamburgerButtonClick}
      />

      <div ref={menuRef} className={classes}>
        <AntDesignMenu onClick={() => onUpdateShow(false)} style={{ border: 0 }} selectable={false}>
          <Item to="/" exact>
            <Icon name="clock-outline" fixedWidth/>
            {' '}
            Stundenplan
          </Item>
          <AntDesignMenu.Divider/>
          <Item to="/settings">
            <Icon name="settings" fixedWidth/>
            {' '}
            Einstellungen
          </Item>
        </AntDesignMenu>
      </div>
    </>
  );
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  onUpdateShow: PropTypes.func.isRequired,
};
