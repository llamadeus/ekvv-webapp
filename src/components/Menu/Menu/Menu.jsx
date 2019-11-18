import { Menu as AntDesignMenu } from 'antd';
import HamburgerButton from 'app/components/HamburgerButton/HamburgerButton';
import Icon from 'app/components/Icon';
import Item from 'app/components/Menu/Item';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styles from './styles.module.scss';


/**
 * Menu component
 *
 * @param props
 * @returns {*}
 */
export default function Menu(props) {
  const { show, onUpdateShow } = props;
  const maybeClickOutsideOverlay = useMemo(() => {
    if (show === false) {
      return false;
    }

    return (
      <div
        role="presentation"
        className={styles.overlay}
        onClick={() => onUpdateShow(false)}
        onKeyPress={() => false}
        tabIndex={-1}
      />
    );
  }, [show, onUpdateShow]);

  const classes = classNames(styles.menu, 'tw-max-w-sm tw-mx-auto', {
    [styles.active]: show,
  });

  return (
    <>
      <HamburgerButton
        active={show}
        onClick={() => onUpdateShow(value => !value)}
      />

      <div className={classes}>
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

      {maybeClickOutsideOverlay}
    </>
  );
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  onUpdateShow: PropTypes.func.isRequired,
};
