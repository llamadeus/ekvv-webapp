import {
  Button,
  Card,
  Form,
  Input,
} from 'antd';
import { formShape } from 'rc-form';
import React from 'react';


/**
 * Class Start
 */
@Form.create()
export default class Start extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    form: formShape.isRequired,
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
        console.log(values);
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
            <Button type="primary" htmlType="submit">
              Los!
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
