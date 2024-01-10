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
      title={`Edit: ${Lesson?.title || 'Lesson'}`}
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
          name="Lesson_type"
          label="Lesson Type"
          rules={[{ required: true, message: 'Please select the Lesson type!' }]}
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
        <Form.List name="chapters">
    {(fields, { add, remove }) => (
      <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
        {fields?.map((field) => (
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
          + Add Chapter
        </Button>
      </div>
    )}
  </Form.List>  
      </Form>
      
    </Drawer>
  );
};

export default LessonEdit;
