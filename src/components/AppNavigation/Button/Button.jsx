import ControlledLink from 'app/components/ControlledLink';
import Icon from 'app/components/Icon';
import RouteIndicator from 'app/components/RouteIndicator';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import {
  Link,
  Route,
} from 'react-router-dom';
import styles from './styles.module.scss';


/**
 * Button component
 *
 * @param props
 * @returns {*}
 */
export default function Button(props) {
  const {
    to,
    icon,
    title,
    disabled,
    exact,
    strict,
    onClick,
  } = props;
  const LinkComponent = useMemo(() => {
    if (disabled) {
      return 'div';
    }

    return typeof onClick == 'undefined'
      ? Link
      : ControlledLink;
  }, [disabled, onClick]);

  return (
    <RouteIndicator to={to} exact={exact} strict={strict}>
      {(isActive) => {
        const linkProps = {
          className: classNames(styles.root, {
            [styles.active]: isActive,
            [styles.disabled]: disabled,
          }),
        };

        if (!disabled) {
          if (typeof onClick == 'undefined') {
            linkProps.to = to;
          }
          else {
            linkProps.href = to;
            linkProps.onClick = onClick;
          }
        }

        return (
          <LinkComponent {...linkProps}>
            <Icon name={icon} className={styles.icon}/>
            <div className={styles.label}>{title}</div>
          </LinkComponent>
        );
      }}
    </RouteIndicator>
  );
}

Button.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  exact: Route.propTypes.exact,
  strict: Route.propTypes.strict,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: undefined,
  exact: false,
  strict: false,
  onClick: undefined,
};
