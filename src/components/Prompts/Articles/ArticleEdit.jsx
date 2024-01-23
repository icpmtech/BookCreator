import React from 'react';
import { Form, Input, Button,Drawer,Card, Select, Space } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const ArticleEdit = ({ Article, onClose, onSave }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(Article);
  const handleSave = (values) => {
    onSave(values); // Process the updated values
    onClose(); // Close the drawer
  };

  return (
    <Drawer
      title={`Edit Prompt: ${Article?.title || 'Prompt Article'}`}
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
          title: Article.title,
          description: Article.description,
          Article_type: Article.Article_type,
          content: Article.content,
        }}
        onFinish={handleSave}
      >
         <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the prompt Article title' }]}
        >
          <Input placeholder="Enter prompt Article title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Prompt Content"
          rules={[{ required: true, message: 'Please enter the Article prompt' }]}
        >
          <TextArea placeholder="Enter Article prompt" />
        </Form.Item>
      </Form>
      
    </Drawer>
  );
};

export default ArticleEdit;
