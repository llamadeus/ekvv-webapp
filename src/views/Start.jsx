import {
  Button,
  Card,
  Form,
  Input,
} from 'antd';
import PropTypes from 'prop-types';
import { formShape } from 'rc-form';
import React from 'react';
import { bindActionCreators } from 'redux';
import { loadSchedule } from '../effects/schedule';
import { getIsLoading } from '../selectors/ui';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../utils/redux';


/**
 * Class Start
 */
@mapStateToProps(state => ({
  isLoading: getIsLoading(state),
}))
@mapDispatchToProps(dispatch => bindActionCreators({
  onLoadSchedule: loadSchedule,
}, dispatch))
@Form.create()
export default class Start extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    form: formShape.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onLoadSchedule: PropTypes.func.isRequired,
  };

  /**
   * Handle form submission.
   *
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onLoadSchedule(values.url);
      }
    });
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card>
        <h1>Stundenplan laden</h1>

        <Form onSubmit={this.handleSubmit} hideRequiredMark>
          <Form.Item
            label="Füge die URL zu deinem persönlichen Kalender ein, um deinen Stundenplan zu laden."
          >
            {getFieldDecorator('url', {
              validateTrigger: false,
              rules: [{
                required: true,
                message: 'Ohne geht nicht...',
              }, {
                pattern: /^https:\/\/ekvv\.uni-bielefeld\.de\/ws\/calendar\?token=[a-zA-Z0-9]+$/,
                message: 'Ungültiges Format',
              }],
            })(
              <Input placeholder="https://ekvv.uni-bielefeld.de/ws/calendar?token=XYZ"/>,
            )}
          </Form.Item>

          <Form.Item className="tw-text-right">
            <Button type="primary" htmlType="submit" loading={this.props.isLoading}>
              Los!
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
