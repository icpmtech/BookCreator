import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input,Row ,Col,Card, Select,Modal, Button, Space } from 'antd';
import { SyncOutlined,CloseOutlined,BookOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const BookEdit = ({ book, onClose, onSave }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(book);
 const [forms, setForms] = useState([]);
 const [selectedForm, setSelectedForm] = useState(null);
 const [newFormVisible, setNewFormVisible] = useState(false);
 const [editFormVisible, setEditFormVisible] = useState(false);
 const [currentSchema, setCurrentSchema] = useState(null);
 const [previewVisible, setPreviewVisible] = useState(false);
  const handleSave = (values) => {
    onSave(values); // Pass the new book data to the onSave handler
    form.resetFields(); // Reset the form after submission
  };
  useEffect(() => {
   
    loadForms();
  }, []);



  const loadForms = () => {
    const savedForms = localStorage.getItem('savedForms');
    if (savedForms) {
      setForms(JSON.parse(savedForms));
    }
  };

  const selectForm = (formId) => {
    const form = forms.find(f => f.id === formId);
    setSelectedForm(form);
    setCurrentSchema(JSON.parse(form.formSchema));
    setEditFormVisible(true);
  };
  const openPreviewModal = () => {
    setPreviewVisible(true);
  };

  const closePreviewModal = () => {
    setPreviewVisible(false);
  };


  return (
    <Drawer
      title={`Edit: ${book?.title || 'Book'}`}
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
          <Form.Item
              name="book_template"
              label="Book Template"
              rules={[
                {
                  required: true,
                  message: 'Please select an book template',
                },
              ]}
            >
                <Select  placeholder="Select a book" onChange={selectForm}>
                    {forms.map(form => (
                        <Option key={form.id} value={form.id}>
                            {form.name}
                        </Option>
                    ))}
                </Select>
             
       
         
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        title="Form Preview"
        visible={previewVisible}
        footer={null}
        onCancel={closePreviewModal}
      >
        {selectedForm && <FormEdit form={selectedForm} schema={currentSchema} />}
      </Modal>
      {selectedForm && <>   <br></br>  <Button type="primary" onClick={openPreviewModal}>Preview Book Template</Button> </> }
    </Drawer>
  );
};


export default BookEdit;
