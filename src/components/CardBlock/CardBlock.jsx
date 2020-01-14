import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * CardBlock component
 *
 * @param props
 * @returns {*}
 */
export default function CardBlock(props) {
  return (
    <div className={styles.root}>
      {props.children}
    </div>
  );
}

CardBlock.propTypes = {
  children: PropTypes.node.isRequired,
};
