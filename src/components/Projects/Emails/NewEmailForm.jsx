import React from 'react';
import { Form, Input,Row,Col,Collapse, Button,Drawer,Card, Select, Space } from 'antd';
import {  CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const NewEmailForm = ({ onSave, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSave(values); // Pass the new Email data to the onSave handler
    form.resetFields(); // Reset the form after submission
  };

  return (
    <Drawer
      title="Add New Email"
      visible={true}
      onClose={onClose}
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
     <Form layout="vertical" form={form} id="EmailForm" onFinish={handleFinish} >
        {/* Form fields here */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter Email title',
                },
              ]}
            >
              <Input placeholder="Please enter Email title" />
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
              name="Email_type"
              label="Email Type"
              rules={[
                {
                  required: true,
                  message: 'Please select an Email type',
                },
              ]}
            >
              <Select placeholder="Please select an Email type">
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
        <Form.List name="Sections">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (

                <Collapse
                  size="small"
                  items={[
                    {
                      key: field.key,
                      label: `Section ${field.name + 1}`,
                      children:
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
                          <Form.Item label="SubSections">
                            <Form.List name={[field.name, 'sections']}>
                              {(subFields, subOpt) => (
                                <div style={{ rowGap: 16 }}>
                                  {subFields.map((subField) => (
                                    <Collapse
                                      size="small"
                                      items={[
                                        {
                                          key: subField.key,
                                          label: 'SubSection:' + subField.key,
                                          children:
                                            <Card title={'Section:' + subField.key} extra={<CloseOutlined
                                              onClick={() => {
                                                subOpt.remove(subField.name);
                                              }}
                                            />} key={subField.key}>
                                               <Card> 
                                              <Form.Item noStyle name={[subField.name, 'title']}>
                                                <Input placeholder="Title" />
                                              </Form.Item>
                                              </Card>
                                              <Card> 
                                              <Form.Item noStyle name={[subField.name, 'content']}>
                                                <Input.TextArea placeholder="Content" />
                                              </Form.Item>
                                              </Card>
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
                + Add Section
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
};

export default NewEmailForm;
