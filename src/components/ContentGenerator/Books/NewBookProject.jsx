import React, { useState, useEffect } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Card, Input, Row, Select, Space } from 'antd';
const { Option } = Select;
import TextArea from 'antd/es/input/TextArea';
const NewBookProject = ({ formParentData}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    if (formParentData) {
      form.setFieldsValue(formParentData);
    } else {
      form.resetFields(); // Reset fields if creating a new book
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formData) => {
    const existingBooks = JSON.parse(localStorage.getItem('books') || '[]');
    localStorage.setItem('books', JSON.stringify([...existingBooks, formData]));
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New Book Project
      </Button>
      <Drawer
        title="Create a new book"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" form="bookForm" key="submit" htmlType="submit">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} id="bookForm" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter book title',
                  },
                ]}
              >
                <Input placeholder="Please enter book title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter description',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please enter description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="book_type"
                label="Book Type"
                rules={[
                  {
                    required: true,
                    message: 'Please select an book type',
                  },
                ]}
              >
                <Select placeholder="Please select an book type">
                  <Option value="fiction">Fiction</Option>
                  <Option value="science">Science</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="Content"
                initialValue={formParentData}
                rules={[
                  {
                    required: true,
                    message: 'please enter  content',
                  },
                ]}
              >
                <TextArea rows={4}    placeholder="please enter content " />
              </Form.Item>
            </Col>
          </Row>
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
               
        </Form>
      </Drawer>
    </>
  );
};
export default NewBookProject;