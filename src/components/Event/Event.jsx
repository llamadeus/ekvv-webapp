import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Class Event
 */
export default class Event extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    event: PropTypes.shape().isRequired,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])).isRequired,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const { event } = this.props;

    return (
      <div className={styles.root} style={this.props.style}>
        {event.title}
      </div>
    );
  }
}
