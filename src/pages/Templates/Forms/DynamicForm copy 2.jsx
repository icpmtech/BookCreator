import React, { useState } from 'react';
import { Form, Input, Button, Space, Upload, message } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Dragger } = Upload;

const DynamicForm = ({ schema }) => {
  const [formValuesJson, setFormValuesJson] = useState(null);
  const [chapters, setChapters] = useState([]);
  const onFinish = (values) => {
    console.log('Received values:', values);
    setFormValuesJson(JSON.stringify(values, null, 2));
  };

  const renderFormItem = (itemKey, { label, type, validation }) => {
    return (
      <Form.Item
        key={itemKey}
        name={itemKey}
        label={label}
        rules={[
          { required: validation?.required, message: validation?.required },
          ...(validation?.minLength
            ? [
                { min: validation?.minLength?.value, message: validation?.minLength?.message },
              ]
            : []),
          ...(validation?.pattern
            ? [
                {
                  pattern: new RegExp(validation?.pattern?.value),
                  message: validation?.pattern?.message,
                },
              ]
            : []),
        ]}
      >
        {type === 'text' && <Input />}
        {type === 'email' && <Input type="email" />}
        {type === 'textarea' && <TextArea />}
        {type === 'image' && (
          <Dragger accept=".jpg, .png" beforeUpload={beforeUpload}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image to this area to upload</p>
            <p className="ant-upload-hint">Support for JPG and PNG files only.</p>
          </Dragger>
        )}
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
                {Object.entries(itemStructure || {}).map(([itemKey, itemValue]) => {
                  // Check if itemValue is defined before rendering
                  if (itemValue) {
                    return (
                      <Form.Item
                        {...restField}
                        name={[name, itemKey]}
                        key={itemKey}
                        label={itemValue?.label}
                        rules={[{ required: itemValue?.validation?.required, message: itemValue?.validation?.required }]}
                      >
                        {itemValue?.type === 'text' && <Input />}
                        {itemValue?.type === 'textarea' && <TextArea />}
                        {itemValue?.type === 'image' && (
                          <Dragger accept=".jpg, .png" beforeUpload={beforeUpload}>
                            <p className="ant-upload-drag-icon">
                              <UploadOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag image to this area to upload</p>
                            <p className="ant-upload-hint">Support for JPG and PNG files only.</p>
                          </Dragger>
                        )}
                      </Form.Item>
                    );
                  }
                  return null; // Return null for undefined itemValue
                })}
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

  const renderChapterSections = (sections) => {
    if (Array.isArray(sections)) {
      return sections.map((section, index) => (
        <div key={index}>
          {renderArrayItem(`sections[${index}]`, section)}
        </div>
      ));
    } else {
      // Handle the case where sections is a single object
      return (
        <div>
          {renderArrayItem(`sections`, sections)}
        </div>
      );
    }
  };
   // Function to add a new chapter
   const addChapter = () => {
    setChapters([...chapters, {}]);
  };

  const renderChapters = (chapters) => {
    if (Array.isArray(chapters)) {
      return chapters.map((chapter, index) => (
        <div key={index}>
          {renderArrayItem(`chapters[${index}]`, chapter)}
          <div>
            <h3>Chapter Sections</h3>
            {renderChapterSections(chapter.sections)}
          </div>
        </div>
      ));
    } else {
      return (
        <div>
          {renderArrayItem(`chapters`, chapters)}
          <div>
            <h3>Chapter Sections</h3>
            {renderChapterSections(chapters?.sections)}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Form name="dynamic_form" onFinish={onFinish} autoComplete="off">
        {Object.entries(schema || {}).map(([key, { label, type, validation, itemStructure }]) => {
          if (type === 'array' && itemStructure) {
            if (key === 'chapters') {
              return (
                <React.Fragment key={key}>
                  {renderChapters(itemStructure)}
                  <Form.Item>
                  <Button
                      type="dashed"
                      onClick={addChapter}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Chapter
                    </Button>
                  </Form.Item>
                </React.Fragment>
              );
            }
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
      {formValuesJson && (
        <div>
          <h2>Form Values JSON:</h2>
          <pre>{formValuesJson}</pre>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  return isJpgOrPng;
};
