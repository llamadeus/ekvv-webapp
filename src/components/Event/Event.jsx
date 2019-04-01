import moment from 'moment';
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

        <div className={styles.spacer}/>

        <div className={styles.footer}>
          {this.renderFooterContent()}
        </div>
      </div>
    );
  }

  /**
   * Render the footer of the event.
   *
   * @returns {*}
   */
  renderFooterContent() {
    const { event } = this.props;
    const start = moment(event.get('start'));
    const rrule = event.get('rrule');

    if (typeof rrule == 'undefined') {
      return start.format('DD.MM.YYYY');
    }

    const until = moment(rrule.match(/UNTIL=(\d{8}T\d{6}Z);/)[1]);

    return (
      <React.Fragment>
        {start.format('DD.MM.YYYY')}
        &nbsp;&ndash;&nbsp;
        {until.format('DD.MM.YYYY')}
      </React.Fragment>
    );
  }
}
