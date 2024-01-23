import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const DynamicForm = ({ schema }) => {
  const onFinish = values => {
    console.log('Received values:', values);
  };

  const renderFormItem = (itemKey, { label, type, validation }) => {
    return (
      <Form.Item
        key={itemKey}
        name={itemKey}
        label={label}
        rules={[
          { required: validation?.required, message: validation?.required },
          ...(validation?.minLength ? [{ min: validation?.minLength?.value, message: validation?.minLength?.message }] : []),
          ...(validation?.pattern ? [{ pattern: new RegExp(validation?.pattern?.value), message: validation?.pattern?.message }] : [])
        ]}
      >
        {type === 'text' && <Input />}
        {type === 'email' && <Input type="email" />}
        {type === 'textarea' && <TextArea />}
      </Form.Item>
    );
  };

  const renderArrayItem = (name, itemStructure) => {
    return (
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                {Object.entries(itemStructure || {}).map(([itemKey, itemValue]) => (
                  <Form.Item
                    {...restField}
                    name={[name, itemKey]}
                    key={itemKey}
                    label={itemValue?.label}
                    rules={[{ required: itemValue?.validation?.required, message: itemValue?.validation?.required }]}
                  >
                    {itemValue?.type === 'text' && <Input />}
                    {itemValue?.type === 'textarea' && <TextArea />}
                  </Form.Item>
                ))}
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add {name}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  };

  return (
    <Form name="dynamic_form" onFinish={onFinish} autoComplete="off">
      {Object.entries(schema || {}).map(([key, { label, type, validation, itemStructure }]) => {
        if (type === 'array' && itemStructure) {
          return renderArrayItem(key, itemStructure);
        }

        return renderFormItem(key, { label, type, validation });
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
