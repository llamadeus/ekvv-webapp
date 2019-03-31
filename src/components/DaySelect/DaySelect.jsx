import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import {
  DAYS,
  DAYS_LABELS,
} from '../../constants/schedule';
import { Day } from '../../prop-types';


/**
 * Class DaySelect
 */
export default class DaySelect extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    selected: Day.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <Button.Group className="flex justify-center">
        {this.renderButtons()}
      </Button.Group>
    );
  }

  /**
   * Render day buttons.
   *
   * @returns {*[]}
   */
  renderButtons() {
    return Object.keys(DAYS).map(day => (
      <Button
        key={day}
        className="flex-1"
        onClick={() => this.props.onChange(day)}
        type={this.props.selected === day ? 'primary' : undefined}
      >
        {DAYS_LABELS[day]}
      </Button>
    ));
  }
}
