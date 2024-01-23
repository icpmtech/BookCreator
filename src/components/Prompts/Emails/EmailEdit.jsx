import React from 'react';
import { Form, Input, Button,Drawer,Card, Select, Space } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const EmailEdit = ({ Email, onClose, onSave }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(Email);
  const handleSave = (values) => {
    onSave(values); // Process the updated values
    onClose(); // Close the drawer
  };

  return (
    <Drawer
      title={`Edit Prompt: ${Email?.title || 'Prompt Email'}`}
      placement="right"
      onClose={onClose}
      width={720}
      visible={true}
      extra={
        <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: Email.title,
          description: Email.description,
          Email_type: Email.Email_type,
          content: Email.content,
        }}
        onFinish={handleSave}
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
      </Form>
      
    </Drawer>
  );
};

export default EmailEdit;
