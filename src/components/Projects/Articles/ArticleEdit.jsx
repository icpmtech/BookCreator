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
      title={`Edit: ${Article?.title || 'Article'}`}
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
          name="Article_type"
          label="Article Type"
          rules={[{ required: true, message: 'Please select the Article type!' }]}
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
        <Form.List name="Sections">
    {(fields, { add, remove }) => (
      <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
        {fields?.map((field) => (
          <Card
            size="small"
            title={`Section ${field.name + 1}`}
            key={field.key}
            extra={
              <CloseOutlined
                onClick={() => {
                  remove(field.name);
                }}
              />
            }
          >
            <Form.Item label="Section Title" name={[field.name, 'name']}>
              <Input />
            </Form.Item>
            {/* Nest Form.List */}
            <Form.Item label="Sections">
              <Form.List name={[field.name, 'sections']}>
                {(subFields, subOpt) => (
                  <div style={{  rowGap: 16 }}>
                    {subFields?.map((subField) => (
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
          + Add Section
        </Button>
      </div>
    )}
  </Form.List>  
      </Form>
      
    </Drawer>
  );
};

export default ArticleEdit;
