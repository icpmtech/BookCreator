import React from 'react';
import { Form, Input, Button,Drawer,Card, Select, Space } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
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
       
            <Form.List name="chapters">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Chapter ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Chapter Title" name={[field.name, 'name']}>
                  <Input />
                </Form.Item>
                {/* Nest Form.List */}
                <Form.Item label="Sections">
                  <Form.List name={[field.name, 'sections']}>
                    {(subFields, subOpt) => (
                      <div style={{  rowGap: 16 }}>
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'title']}>
                              <Input placeholder="Title" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'content']}>
                              <TextArea placeholder="Content" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Add Sub Section
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Chapter
            </Button>
          </div>
        )}
      </Form.List>
          
        {/* Add more fields as necessary */}
      </Form>
    </Drawer>
  );
};

export default NewBookForm;
