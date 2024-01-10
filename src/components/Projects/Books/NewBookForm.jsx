import React from 'react';
import { Form, Input, Button,Drawer, Select, Space } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const NewBookForm = ({ onSave, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSave(values); // Pass the new book data to the onSave handler
    form.resetFields(); // Reset the form after submission
  };

  return (
    <Drawer
      title="Add New Book"
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
          rules={[{ required: true, message: 'Please enter the book title' }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the book description' }]}
        >
          <TextArea placeholder="Enter book description" />
        </Form.Item>

        <Form.Item
          name="book_type"
          label="Book Type"
          rules={[{ required: true, message: 'Please select the book type' }]}
        >
          <Select placeholder="Select a book type">
            <Option value="fiction">Fiction</Option>
            <Option value="science">Science</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/* Add more fields as necessary */}
      </Form>
    </Drawer>
  );
};

export default NewBookForm;
