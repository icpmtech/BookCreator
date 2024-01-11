import React from 'react';
import { Drawer, Form, Input, Row, Col, Card, Select, Button, Space, Collapse, Flex } from 'antd';
import { DownloadOutlined , CloseOutlined, BookOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const BookEdit = ({ book, onClose, onSave }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(book);
  const handleSave = (values) => {
    onSave(values); // Process the updated values
  };
  const handleDownload = () => {
    // Retrieve form data
    const formData = form.getFieldsValue(true);
  
    // Convert the form data to a string format suitable for a text file
    const fileContent = JSON.stringify(formData, null, 2);
  
    // Create a Blob from the string content
    const blob = new Blob([fileContent], { type: 'text/plain' });
  
    // Create a link element, set the download attribute with a filename
    const link = document.createElement('a');
    link.download = 'form-data.txt';
  
    // Create a URL for the blob and set as link's href
    link.href = window.URL.createObjectURL(blob);
  
    // Append to the document and trigger the download
    document.body.appendChild(link);
    link.click();
  
    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };
  return (

    <Card title={'Editing the book: ' + book.title} extra={
      <Flex gap={10}> <Button  icon={<DownloadOutlined />} onClick={handleDownload}>
        Download
      </Button>
        <Button type="primary" form="bookForm" key="submit" htmlType="submit">
          Save
        </Button></Flex>

    }>
      <Form layout="vertical" form={form} id="bookForm" onFinish={handleSave} >
        {/* Form fields here */}
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


    </Card>


  );
};

export default BookEdit;
