import React from 'react';
import { Form, Input, Button,Drawer,Card, Select, Space } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const BlogPostEdit = ({ BlogPost, onClose, onSave }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(BlogPost);
  const handleSave = (values) => {
    onSave(values); // Process the updated values
    onClose(); // Close the drawer
  };

  return (
    <Drawer
      title={`Edit Prompt: ${BlogPost?.title || 'Prompt BlogPost'}`}
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
          title: BlogPost.title,
          description: BlogPost.description,
          BlogPost_type: BlogPost.BlogPost_type,
          content: BlogPost.content,
        }}
        onFinish={handleSave}
      >
         <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the prompt BlogPost title' }]}
        >
          <Input placeholder="Enter prompt BlogPost title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Prompt Content"
          rules={[{ required: true, message: 'Please enter the BlogPost prompt' }]}
        >
          <TextArea placeholder="Enter BlogPost prompt" />
        </Form.Item>
      </Form>
      
    </Drawer>
  );
};

export default BlogPostEdit;
