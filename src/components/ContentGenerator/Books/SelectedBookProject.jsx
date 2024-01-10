import React, { useState, useEffect } from 'react';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Card, Space, List } from 'antd';
const { Option } = Select;
import TextArea from 'antd/es/input/TextArea';

const SelectedBookProject = () => {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const selectBook = (book) => {
    setSelectedBook(book);
    form.setFieldsValue(book);
  };

  const handleSubmitUpdate = (updatedBook) => {
    const updatedBooks = books.map(book => book.title === selectedBook.title ? updatedBook : book);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setOpen(false);
    loadBooks(); // Refresh the list
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<EditOutlined />}>
        Update a Book
      </Button>
      <Drawer
        title="Update a Book"
        width={720}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" form="bookForm" key="submit" htmlType="submit">
              Submit
            </Button>
          </Space>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={books}
          renderItem={(item) => (
            <List.Item actions={[<Button onClick={() => selectBook(item)} type='primary'>Select Book</Button>]}>
              <List.Item.Meta
                title={item.title}
                description={`Type: ${item.book_type}, Description: ${item.description}`}
              />
            </List.Item>
          )}
        />
        <Form layout="vertical" form={form} id="bookForm" onFinish={handleSubmitUpdate} >
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
                <Form.Item label="Chapter Name" name={[field.name, 'name']}>
                  <Input />
                </Form.Item>
                {/* Nest Form.List */}
                <Form.Item label="Sections">
                  <Form.List name={[field.name, 'sections']}>
                    {(subFields, subOpt) => (
                      <div style={{  rowGap: 16 }}>
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'first']}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'second']}>
                              <TextArea placeholder="second" />
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
export default SelectedBookProject;