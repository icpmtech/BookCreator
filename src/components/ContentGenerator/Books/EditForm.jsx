import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';


const EditForm = ({schema,onSave}) => {
  const [form] = Form.useForm();
  // Function to render form items based on the schema
  const renderFormItems = (schema, path = '') => {
    return Object.entries(schema).map(([key, value]) => {
      const fieldPath = path ? `${path}.${key}` : key;
      switch (value.type) {
        case 'text':
          return (
            <Form.Item
              key={fieldPath}
              name={fieldPath}
              label={value.label}
              rules={getValidationRules(value.validation)}
            >
              <Input />
            </Form.Item>
          );
        case 'textarea':
          return (
            <Form.Item
              key={fieldPath}
              name={fieldPath}
              label={value.label}
              rules={getValidationRules(value.validation)}
            >
              <Input.TextArea />
            </Form.Item>
          );
        case 'image':
          return (
            <Form.Item
              key={fieldPath}
              name={fieldPath}
              label={value.label}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          );
        case 'array':
          return (
            <Form.List key={fieldPath} name={fieldPath}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <div key={field.key}>
                      {renderFormItems(value.itemStructure, field.name)}
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Add {value.label}
                  </Button>
                </>
              )}
            </Form.List>
          );
        // Add cases for other types if needed
        default:
          return null;
      }
    });
  };

  const getValidationRules = (validation) => {
    const rules = [];
    if (validation?.required) {
      rules.push({ required: true, message: validation.required });
    }
    if (validation?.minLength) {
      rules.push({ min: validation.minLength.value, message: validation.minLength.message });
    }
    // Add other validations if needed
    return rules;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFormFinish = (values) => {
    form
      .validateFields()
      .then((values) => {
     const   updatedBook = { ...values };
        onSave(updatedBook);
      }).catch((info) => {
      alert(`Validate Failed:${info}`);
      });
  };

  return (
    <Form form={form} onFinish={onFormFinish} layout="vertical">
      {renderFormItems(schema)}
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
