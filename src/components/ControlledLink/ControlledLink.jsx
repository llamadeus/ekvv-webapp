import PropTypes from 'prop-types';
import React from 'react';


/**
 * Class ControlledLink
 */
export default class ControlledLink extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  /**
   * Handle the click event.
   *
   * @param event
   */
  handleClick = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    event.preventDefault();

    this.props.onClick(event);
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const {
      href,
      children,
      ...other
    } = this.props;

    delete other.onClick;

    return (
      <a
        href={href}
        onClick={this.handleClick}
        {...other}
      >
        {children}
      </a>
    );
  }
}
