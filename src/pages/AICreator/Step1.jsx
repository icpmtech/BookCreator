import React from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Upload,
  Card
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const Step1 = () => (
    <Card style={{height:'72vh'}}>
  <Form
    layout={'vertical'}
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="Title"
      name="Input"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Description"
      name="TextArea"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input.TextArea />
    </Form.Item>
    <Form.Item label="Type">
          <Select>
            <Select.Option value="science">Science</Select.Option>
            <Select.Option value="fiction">Fiction</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Images
              </div>
            </button>
          </Upload>
        </Form.Item>
  </Form>
  </Card>
);
export default Step1;