import PropTypes from 'prop-types';
import React, { useCallback } from 'react';


/**
 * ControlledLink component
 *
 * @param props
 * @returns {*}
 */
export default function ControlledLink(props) {
  const {
    href,
    onClick,
    children,
    ...other
  } = props;
  const handleClick = useCallback((event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    event.preventDefault();

    onClick(event);
  }, [onClick]);

  return (
    <a
      href={href}
      onClick={handleClick}
      {...other}
    >
      {children}
    </a>
  );
}

ControlledLink.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
