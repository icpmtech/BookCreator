import React from 'react';
import { Drawer, Form, Input,Row ,Col,Card, Select,Collapse, Button, Space } from 'antd';
import { SyncOutlined,CloseOutlined,BookOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const NewBlogPostForm = ({ onSave, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSave(values); // Pass the new BlogPost data to the onSave handler
    form.resetFields(); // Reset the form after submission
  };

  return (
    <Drawer
      title="Add New BlogPost"
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
   <Form layout="vertical" form={form} id="BlogPostForm" onFinish={handleFinish} >
        {/* Form fields here */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter BlogPost title',
                },
              ]}
            >
              <Input placeholder="Please enter BlogPost title" />
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
              name="BlogPost_type"
              label="BlogPost Type"
              rules={[
                {
                  required: true,
                  message: 'Please select an BlogPost type',
                },
              ]}
            >
              <Select placeholder="Please select an BlogPost type">
                <Option value="fiction">Fiction</Option>
                <Option value="science">Science</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Collapse
              size="small"
              items={[
                {

                  label: `Outline Content`,
                  children:
                    <Form.Item
                      name="content"
                      label="Content"
                      rules={[
                        {
                          required: true,
                          message: 'please enter  content',
                        },
                      ]}
                    >
                      <Input.TextArea rows={4} placeholder="please enter content " />
                    </Form.Item>,
                },
              ]}
            />
          </Col>
        </Row>
        <Form.List name="chapters">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (

                <Collapse
                  size="small"
                  items={[
                    {
                      key: field.key,
                      label: `Chapter ${field.name + 1}`,
                      children:
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
                                <div style={{ rowGap: 16 }}>
                                  {subFields.map((subField) => (
                                    <Collapse
                                      size="small"
                                      items={[
                                        {
                                          key: subField.key,
                                          label: 'Section:' + subField.key,
                                          children:
                                            <Card title={'Section:' + subField.key} extra={<CloseOutlined
                                              onClick={() => {
                                                subOpt.remove(subField.name);
                                              }}
                                            />} key={subField.key}>
                                              <Form.Item noStyle name={[subField.name, 'title']}>
                                                <Input placeholder="Title" />
                                              </Form.Item>
                                              <Form.Item noStyle name={[subField.name, 'content']}>
                                                <Card>   <TextArea placeholder="Content" /></Card>
                                              </Form.Item>
                                            </Card>,
                                        },
                                      ]}
                                    />
                                  ))}
                                  <Button type="dashed" onClick={() => subOpt.add()} block>
                                    + Add Sub Section
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </Form.Item>
                        </Card>,
                    },
                  ]}
                />
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

export default NewBlogPostForm;
