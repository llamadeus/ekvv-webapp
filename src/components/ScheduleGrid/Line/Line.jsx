import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Class Line
 */
export default class Line extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
  };

  /**
   * Default props.
   *
   * @type {Object}
   */
  static defaultProps = {
    active: false,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const rootClasses = classNames(styles.root, {
      [styles.active]: this.props.active,
    });

    return (
      <div className={rootClasses}>
        <div className={styles.line}/>

        <div className={styles.label}>
          {this.props.label}
        </div>
      </div>
    );
  }
}
