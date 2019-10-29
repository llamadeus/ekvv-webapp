import ImmutablePropTypes from 'immutable-prop-types';
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
    event: ImmutablePropTypes.map.isRequired,
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
      <div
        className={styles.root}
        style={this.props.style}
      >
        <div className={styles.header}>
          <div className={styles.summary}>
            {event.get('summary', 'Unbekannter Kurs')}
          </div>
          <div>
            {event.get('location', '')}
          </div>
        </div>
      </div>
    );
  }
}
