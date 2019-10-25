import Line from 'app/components/ScheduleGrid/Line';
import { range } from 'lodash-es';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';


/**
 * Class Grid
 */
export default class Grid extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div className={styles.root}>
        {this.renderTimeBlocks()}
      </div>
    );
  }

  /**
   * Render all time blocks.
   *
   * @returns {*}
   */
  renderTimeBlocks() {
    const { start, end } = this.props;

    return range(end - start + 1).map(time => (
      <div key={time} className={styles.item}>
        <Line label={`${(time + start).toString().padStart(2, '0')}:00`}/>
      </div>
    ));
  }
}
