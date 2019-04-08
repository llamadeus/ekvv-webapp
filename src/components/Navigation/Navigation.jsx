import {
  Layout,
  Menu,
} from 'antd';
import classNames from 'classnames';
import ImmutablePropTypes from 'immutable-prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../selectors/schedule';
import { isWebapp } from '../../utils/app';
import { mapStateToProps } from '../../utils/redux';
import HamburgerButton from '../HamburgerButton/HamburgerButton';
import Icon from '../Icon';
import MenuItem from '../MenuItem';
import styles from './styles.module.scss';


/**
 * Class Navigation
 */
@mapStateToProps(state => ({
  events: getEvents(state),
}))
export default class Navigation extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    events: ImmutablePropTypes.map,
  };

  /**
   * Default props.
   *
   * @type {Object}
   */
  static defaultProps = {
    events: null,
  };

  /**
   * Component state.
   *
   * @type {Object}
   */
  state = {
    showMenu: false,
  };

  /**
   * Toggle the menu.
   */
  handleToggleMenu = () => {
    this.setState(({ showMenu }) => ({ showMenu: !showMenu }));
  };

  /**
   * Close the menu.
   */
  handleCloseMenu = () => {
    this.setState({ showMenu: false });
  };

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
      <React.Fragment>
        <Layout.Header className="tw-text-white tw-z-50">
          <div className="tw-max-w-sm tw-mx-auto xs:tw-px-4">
            <div className="tw-flex tw-flex-1 tw-justify-between">
              <Link
                to="/"
                onClick={this.handleCloseMenu}
                className="tw-text-white hover:tw-text-white tw-text-xl"
              >
                eKVV
              </Link>

              {this.maybeRenderHamburgerButton()}
            </div>
          </div>
        </Layout.Header>

        {this.maybeRenderMenu()}

        {this.maybeRenderCloseMenuOverlay()}
      </React.Fragment>
    );
  }

  /**
   * Render the hamburger button when "logged in".
   *
   * @returns {*}
   */
  maybeRenderHamburgerButton() {
    if (this.props.events === null) {
      return false;
    }

    return (
      <HamburgerButton active={this.state.showMenu} onClick={this.handleToggleMenu}/>
    );
  }

  /**
   * Render the dropdown menu when "logged in".
   *
   * @returns {*}
   */
  maybeRenderMenu() {
    if (this.props.events === null) {
      return false;
    }

    const classes = classNames({
      [styles.menu]: true,
      'tw-max-w-sm tw-mx-auto': true,
      [styles.active]: this.state.showMenu,
    });

    return (
      <div className={classes}>
        <Menu onClick={this.handleCloseMenu} style={{ border: 0 }} selectable={false}>
          <MenuItem to="/settings">
            <Icon name="settings" fixedWidth/>
            {' '}
            Einstellungen
          </MenuItem>
        </Menu>
      </div>
    );
  }

  /**
   * Render the close menu overlay when the menu is visible.
   *
   * @returns {*}
   */
  maybeRenderCloseMenuOverlay() {
    if (this.props.events === null) {
      return false;
    }

    if (!this.state.showMenu) {
      return false;
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div
        className={styles.overlay}
        onClick={this.handleCloseMenu}
      />
    );
  }
}
