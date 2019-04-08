import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';


/**
 * Class Icon
 */
export default class Icon extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    name: PropTypes.string.isRequired,
    fixedWidth: PropTypes.bool,
  };

  /**
   * Default props.
   *
   * @type {Object}
   */
  static defaultProps = {
    fixedWidth: false,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const { name, fixedWidth } = this.props;
    const classes = classNames({
      'mdi': true,
      [`mdi-${name}`]: true,
      [styles.fw]: fixedWidth,
    });

    return (
      <i className={classes}/>
    );
  }
}
