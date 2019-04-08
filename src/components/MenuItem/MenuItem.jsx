import { Menu } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
  Route,
} from 'react-router-dom';
import styles from './styles.module.scss';


/**
 * Class MenuItem
 */
export default class MenuItem extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
    exact: Route.propTypes.exact,
    strict: Route.propTypes.strict,
    location: PropTypes.shape(),
    activeClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    activeStyle: PropTypes.shape(),
    style: PropTypes.shape(),
  };

  /**
   * Default props.
   *
   * @type {Object}
   */
  static defaultProps = {
    exact: false,
    strict: false,
    location: undefined,
    activeClassName: styles.active,
    className: undefined,
    activeStyle: undefined,
    style: undefined,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const {
      to,
      exact,
      strict,
      location,
      activeClassName,
      className,
      children,
      activeStyle,
      style,
      ...rest
    } = this.props;
    const path = typeof to == 'object'
      ? to.pathname
      : to;
    // Thanks to https://github.com/pillarjs/path-to-regexp/blob/v3.0.0/index.js#L202
    const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

    return (
      <Route
        path={escapedPath}
        exact={exact}
        strict={strict}
        location={location}
      >
        {(props) => {
          const isActive = !!props.match;

          return (
            <Menu.Item
              key={path}
              className={isActive ? [className, activeClassName].filter(Boolean).join(' ') : className}
              style={isActive ? { ...style, ...activeStyle } : style}
              {...rest}
            >
              <Link to={to}>
                {children}
              </Link>
            </Menu.Item>
          );
        }}
      </Route>
    );
  }
}
