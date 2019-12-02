import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';


/**
 * RouteIndicator component
 *
 * @param props
 * @returns {*}
 */
export default function RouteIndicator(props) {
  const {
    children,
    exact,
    strict,
    location,
    to,
  } = props;
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
      {renderProps => children(!!renderProps.match)}
    </Route>
  );
}

RouteIndicator.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
  exact: Route.propTypes.exact,
  strict: Route.propTypes.strict,
  location: PropTypes.shape(),
  children: PropTypes.func.isRequired,
};

RouteIndicator.defaultProps = {
  exact: false,
  strict: false,
  location: undefined,
};
