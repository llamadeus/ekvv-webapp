import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Class HamburgerButton
 */
export default class HamburgerButton extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  /**
   * Open the menu on enter or space.
   *
   * @param event
   */
  handleKeyPress = (event) => {
    if (event.which === 13 || event.which === 32) {
      this.props.onClick(event);
    }
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const classes = classNames({
      [styles.root]: true,
      [styles.active]: this.props.active,
    });

    return (
      <div
        className={classes}
        onClick={this.props.onClick}
        onKeyPress={this.handleKeyPress}
        role="button"
        tabIndex={0}
      >
        <div className={styles.bar}/>
        <div className={styles.bar}/>
        <div className={styles.bar}/>
      </div>
    );
  }
}
