import React from 'react';
import { Form, Input, Button,Drawer,Card, Select, Space } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const BookEdit = ({ book, onClose, onSave }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(book);
  const handleSave = (values) => {
    onSave(values); // Process the updated values
    onClose(); // Close the drawer
  };

  return (
    <Drawer
      title={`Edit Prompt: ${book?.title || 'Prompt Book'}`}
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
          title: book.title,
          description: book.description,
          book_type: book.book_type,
          content: book.content,
        }}
        onFinish={handleSave}
      >
         <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the prompt book title' }]}
        >
          <Input placeholder="Enter prompt book title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Prompt Content"
          rules={[{ required: true, message: 'Please enter the book prompt' }]}
        >
          <TextArea placeholder="Enter book prompt" />
        </Form.Item>
      </Form>
      
    </Drawer>
  );
};

export default BookEdit;
