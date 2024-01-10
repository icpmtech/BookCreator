import React from 'react';
import { Drawer, Form, Input, Select, Button, Space } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const BookEdit = ({ book, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = (values) => {
    onSave(values); // Process the updated values
    onClose(); // Close the drawer
  };

  return (
    <Drawer
      title={`Edit: ${book?.title || 'Book'}`}
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
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="book_type"
          label="Book Type"
          rules={[{ required: true, message: 'Please select the book type!' }]}
        >
          <Select>
            <Option value="fiction">Fiction</Option>
            <Option value="science">Science</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        
      </Form>
      
    </Drawer>
  );
};

export default BookEdit;
