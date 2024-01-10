import React from 'react';
import { Form, Input, Button,Drawer,Card, Select, Space } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const LessonEdit = ({ Lesson, onClose, onSave }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(Lesson);
  const handleSave = (values) => {
    onSave(values); // Process the updated values
    onClose(); // Close the drawer
  };

  return (
    <Drawer
      title={`Edit Prompt: ${Lesson?.title || 'Prompt Lesson'}`}
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
          title: Lesson.title,
          description: Lesson.description,
          Lesson_type: Lesson.Lesson_type,
          content: Lesson.content,
        }}
        onFinish={handleSave}
      >
         <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the prompt Lesson title' }]}
        >
          <Input placeholder="Enter prompt Lesson title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Prompt Content"
          rules={[{ required: true, message: 'Please enter the Lesson prompt' }]}
        >
          <TextArea placeholder="Enter Lesson prompt" />
        </Form.Item>
      </Form>
      
    </Drawer>
  );
};

export default LessonEdit;
