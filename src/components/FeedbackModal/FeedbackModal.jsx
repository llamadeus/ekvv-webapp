import {
  Form,
  Input,
  message,
  Modal,
} from 'antd';
import { postFeedback } from 'app/api/feedback';
import CharCounter from 'app/components/CharCounter';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useState,
} from 'react';


/**
 * FeedbackModal component
 *
 * @param props
 * @returns {*}
 */
export default function FeedbackModal(props) {
  const { onClose } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const kthxbye = useCallback(() => {
    onClose();
    setTimeout(() => form.resetFields(), 250);
  }, [onClose, form]);
  const handleFinish = useCallback(async (values) => {
    setIsLoading(true);

    try {
      await postFeedback(
        values.title,
        values.description,
        values.name,
        values.email,
      );

      message.success('Danke für dein Feedback!');
      setIsLoading(false);
      kthxbye();
    }
    catch (response) {
      setIsLoading(false);
      message.error(`Error ${response.status}: ${response.statusText}`);
      setIsLoading(false);
    }
  }, [kthxbye]);
  const handleOk = useCallback(() => {
    form.submit();
  }, [form]);
  const handleCancel = useCallback(() => {
    if (form.isFieldsTouched()) {
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
  }, [kthxbye, form]);

  return (
    <Modal
      title="Feedback senden"
      okText="Abschicken"
      cancelText="Abbrechen"
      visible={props.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Titel"
          validateTrigger={false}
          rules={[
            {
              required: true,
              message: 'Bitte beschreibe kurz, worum es geht.',
            }, {
              max: 100,
              message: 'Mach mal nur 100 Zeichen bitte.',
            },
          ]}
        >
          <Input placeholder="Fasse kurz zusammen, worum es geht"/>
        </Form.Item>

        <Form.Item label="Beschreibung" required>
          <Form.Item
            name="description"
            validateTrigger={false}
            rules={[
              {
                required: true,
                message: 'Na los, nun sei mal nicht so schreibfaul.',
              }, {
                max: 5000,
                message: 'Uff, wer soll das denn alles lesen?',
              },
            ]}
            noStyle
          >
            <Input.TextArea
              placeholder="Sprich, Freund"
              autoSize={{ minRows: 4, maxRows: 12 }}
            />
          </Form.Item>
          <Form.Item
            shouldUpdate={(prevValues, curValues) => prevValues.description !== curValues.description}
            noStyle
          >
            {({ getFieldValue }) => (
              <CharCounter
                value={getFieldValue('description')}
                maxLength={5000}
              />
            )}
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="name"
          label="Dein Name"
          validateTrigger={false}
          rules={[
            {
              max: 100,
              message: 'Ganz schön lang für einen Namen...',
            },
          ]}
        >
          <Input placeholder="Wie heißt du?"/>
        </Form.Item>

        <Form.Item
          name="email"
          label="Deine E-Mail-Adresse"
          validateTrigger={false}
          rules={[
            {
              type: 'email',
              message: 'Bitte gib mal ne richtige E-Mail-Adresse ein.',
            },
            {
              max: 255,
              message: 'Diese E-Mail-Adresse ist zu lang.',
            },
          ]}
        >
          <Input placeholder="Wie kann ich dich zu diesem Thema erreichen?"/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

FeedbackModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
