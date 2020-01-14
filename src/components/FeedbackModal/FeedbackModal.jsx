import {
  Form,
  Input,
  message,
  Modal,
} from 'antd';
import { postFeedback } from 'app/api/feedback';
import CharCounter from 'app/components/CharCounter';
import { getIsLoading } from 'app/selectors/ui';
import PropTypes from 'prop-types';
import { formShape } from 'rc-form';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';


/**
 * FeedbackModal component
 *
 * @param props
 * @returns {*}
 */
function FeedbackModal(props) {
  const { onClose } = props;
  const {
    getFieldDecorator,
    validateFields,
    getFieldValue,
    isFieldsTouched,
    resetFields,
  } = props.form;
  const isLoading = useSelector(getIsLoading);
  const kthxbye = useCallback(() => {
    onClose();
    setTimeout(() => resetFields(), 250);
  }, [onClose, resetFields]);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    validateFields(async (error, values) => {
      if (!error) {
        postFeedback(
          values.title,
          values.description,
          values.name,
          values.email,
        ).then(() => {
          message.success('Danke für dein Feedback!');
          kthxbye();
        }).catch((response) => {
          message.error(`Error ${response.status}: ${response.statusText}`);
        });
      }
    });
  }, [validateFields, kthxbye]);
  const handleCancel = useCallback(() => {
    if (isFieldsTouched()) {
      Modal.confirm({
        title: 'Willst du wirklich abbrechen?',
        content: 'Dadurch wird deine komplette Eingabe verworfen.',
        onOk: kthxbye,
        okText: 'Jep',
        cancelText: 'Nope',
      });
    }
    else {
      kthxbye();
    }
  }, [kthxbye, isFieldsTouched]);

  return (
    <Modal
      title="Feedback senden"
      okText="Abschicken"
      cancelText="Abbrechen"
      visible={props.visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      maskClosable={false}
    >
      <Form onSubmit={handleSubmit} layout="vertical">
        <Form.Item label="Titel">
          {getFieldDecorator('title', {
            validateTrigger: false,
            rules: [
              {
                required: true,
                message: 'Bitte beschreibe kurz, worum es geht.',
              }, {
                max: 100,
                message: 'Mach mal nur 100 Zeichen bitte.',
              },
            ],
          })(
            <Input placeholder="Fasse kurz zusammen, worum es geht"/>,
          )}
        </Form.Item>

        <Form.Item label="Beschreibung">
          {getFieldDecorator('description', {
            validateTrigger: false,
            rules: [
              {
                required: true,
                message: 'Na los, nun sei mal nicht so schreibfaul.',
              }, {
                max: 5000,
                message: 'Uff, wer soll das denn alles lesen?',
              },
            ],
          })(
            <Input.TextArea
              placeholder="Sprich, Freund"
              autoSize={{ minRows: 4, maxRows: 12 }}
            />,
          )}
          <CharCounter value={getFieldValue('description')} maxLength={5000}/>
        </Form.Item>

        <Form.Item label="Dein Name">
          {getFieldDecorator('name', {
            validateTrigger: false,
            rules: [
              {
                max: 100,
                message: 'Ganz schön lang für einen Namen...',
              },
            ],
          })(
            <Input placeholder="Wie heißt du?"/>,
          )}
        </Form.Item>

        <Form.Item label="Deine E-Mail-Adresse">
          {getFieldDecorator('email', {
            validateTrigger: false,
            rules: [
              {
                type: 'email',
                message: 'Bitte gib mal ne richtige E-Mail-Adresse ein.',
              },
              {
                max: 255,
                message: 'Diese E-Mail-Adresse ist zu lang.',
              },
            ],
          })(
            <Input placeholder="Wie kann ich dich zu diesem Thema erreichen?"/>,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

FeedbackModal.propTypes = {
  form: formShape.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Form.create()(FeedbackModal);
