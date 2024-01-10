import React from 'react';
import { Form, Input, Button,Drawer,Card, Select, Space } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const NewEmailForm = ({ onSave, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSave(values); // Pass the new Email data to the onSave handler
    form.resetFields(); // Reset the form after submission
  };

  return (
    <Drawer
      title="Add New Email"
      visible={true}
      onCancel={onClose}
      extra={
        <Space>
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the prompt Email title' }]}
        >
          <Input placeholder="Enter prompt Email title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Prompt Content"
          rules={[{ required: true, message: 'Please enter the Email prompt' }]}
        >
          <TextArea placeholder="Enter Email prompt" />
        </Form.Item>
       
        {/* Add more fields as necessary */}
      </Form>
    </Drawer>
  );
};

export default NewEmailForm;
