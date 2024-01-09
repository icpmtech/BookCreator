import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
const { Option } = Select;
const SelectedBookProject = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<EditOutlined />}>
        Update a Book
      </Button>
      <Drawer
        title="Create a new book"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
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
                name="title"
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
        </Form>
      </Drawer>
    </>
  );
};
export default SelectedBookProject;