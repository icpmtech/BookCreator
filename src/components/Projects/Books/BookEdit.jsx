import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const BookEdit = ({ book, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Process the updated values
        onSave(values);
        onClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
   
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: book.title,
          description: book.description,
          book_type: book.book_type,
          content: book.content,
        }}
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
   
  );
};

export default BookEdit;
