import {
  Button,
  Form,
  Input,
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';


/**
 * LoginForm component
 *
 * @param props
 * @returns {*}
 */
export default function LoginForm(props) {
  const formItemProps = {
    labelCol: {
      sm: { span: 8 },
      md: { span: 6, offset: 2 },
    },
    wrapperCol: {
      sm: { span: 16 },
      md: { span: 14 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 16,
        offset: 8,
      },
      md: {
        span: 14,
        offset: 8,
      },
    },
  };

  return (
    <Form form={props.form} onFinish={props.onFinish}>
      <Form.Item
        name="username"
        label="Matrikelnummer"
        validateTrigger={false}
        rules={[
          {
            required: true,
            message: 'Bitte gib deine Matrikelnummer ein.',
          },
        ]}
        {...formItemProps}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Passwort"
        validateTrigger={false}
        rules={[
          {
            required: true,
            message: 'Los, her mit dem Passwort.',
          },
        ]}
        {...formItemProps}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item className="tw-text-right" {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={props.isLoading}>
          Und los!
        </Button>
      </Form.Item>
    </Form>
  );
}

LoginForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
};
