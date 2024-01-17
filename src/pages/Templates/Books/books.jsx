import React, { useState, useEffect } from 'react';
import { Layout, Card, Input, Button, message, Modal, Select, List, Space, Spin } from 'antd';
import DynamicForm from '../Forms/DynamicForm';

const { TextArea } = Input;
const { Content } = Layout;
const { Option } = Select;

export default function TemplateBook() {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [schema, setSchema] = useState({});
    const [previewVisible, setPreviewVisible] = useState(false);
    const [savedForms, setSavedForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [formToUpdate, setFormToUpdate] = useState(null); // State to store the form being updated
    const [previewForm, setPreviewForm] = useState(null); // State to track the form to preview
    const [selectButtonLoading, setSelectButtonLoading] = useState(false); // State for button loading

    useEffect(() => {
        const storedValue = localStorage.getItem('textAreaValue');
        if (storedValue) {
            setTextAreaValue(storedValue);
        }
    }, []);

    const saveToLocalStorage = () => {
        localStorage.setItem('textAreaValue', textAreaValue);
        message.success('Saved to local storage');
    };

    const updateFormSchema = () => {
        try {
            const newSchema = JSON.parse(textAreaValue);
            setSchema(newSchema);
        } catch (err) {
            message.error('Invalid JSON format');
        }
    };

    const handleTextAreaChange = (e) => {
        setTextAreaValue(e.target.value);
    };

    const openPreviewModal = () => {
        setPreviewVisible(true);
    };

    const closePreviewModal = () => {
        setPreviewVisible(false);
    };

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleSaveForm = () => {
        if (textAreaValue.trim() === '') {
            message.error('Please enter a valid form schema before saving.');
            return;
        }

        if (formToUpdate) {
            // Update the existing form
            const updatedForms = savedForms.map((form) =>
                form.id === formToUpdate.id
                    ? { ...form, formSchema: textAreaValue }
                    : form
            );
            setSavedForms(updatedForms);
            localStorage.setItem('savedForms', JSON.stringify(updatedForms));
            message.success('Form updated.');
            setFormToUpdate(null); // Clear the form to update
        } else {
            // Save a new form
            const uniqueId = generateUniqueId();
            const timestamp = new Date().toLocaleString();
            const newForm = {
                id: uniqueId,
                timestamp: timestamp,
                formSchema: textAreaValue,
            };

            const newFormsList = [...savedForms, newForm];
            setSavedForms(newFormsList);
            localStorage.setItem('savedForms', JSON.stringify(newFormsList));
            message.success('Form schema saved.');
        }
    };

    const handleSelectForm = async (form) => {
        setSelectButtonLoading(true); // Set loading to true when the button is pressed
        // Simulate an async action (e.g., fetching data)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSelectButtonLoading(false); // Set loading to false after the action is completed

        setSelectedForm(form.formSchema);
        setTextAreaValue(form.formSchema);
        setFormToUpdate(form); // Set the form to update
    };

    const handleOpenForm = () => {
        if (selectedForm) {
            openPreviewModal();
        } else {
            message.warning('Please select a saved form to open for preview.');
        }
    };

    const handleDeleteForm = (id) => {
        const newFormsList = savedForms.filter((form) => form.id !== id);
        setSavedForms(newFormsList);
        localStorage.setItem('savedForms', JSON.stringify(newFormsList));
        setSelectedForm(null);
        message.success('Form template deleted.');
    };

    const handlePreviewForm = (form) => {
        setPreviewForm(form);
        openPreviewModal();
    };

    useEffect(() => {
        const storedForms = localStorage.getItem('savedForms');
        if (storedForms) {
            setSavedForms(JSON.parse(storedForms));
        }
    }, []);

    return (
        <Content style={{ height: '100vh' }}>
            <Card style={{ marginTop: '20px' }}>
                <Select
                    placeholder="Select a saved form"
                    style={{ width: '100%' }}
                    value={selectedForm}
                    onChange={handleSelectForm}
                >
                    {savedForms.map((form) => (
                        <Option key={form.id} value={form.formSchema}>
                            Form {form.id} - {form.timestamp}
                        </Option>
                    ))}
                </Select>
            </Card>
            <Card style={{ marginTop: '20px' }}>
                <h3>Saved Forms</h3>
                <List
                    dataSource={savedForms}
                    renderItem={(form) => (
                        <List.Item>
                            <Space>
                                <span>
                                    Form {form.id} - {form.timestamp}
                                </span>
                                <Button
                                    type="primary"
                                    onClick={() => handleSelectForm(form)}
                                    loading={selectButtonLoading} // Set loading prop
                                >
                                    Select
                                </Button>
                                <Button
                                    type="danger"
                                    onClick={() => handleDeleteForm(form.id)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => handlePreviewForm(form)}
                                >
                                    Preview
                                </Button>
                            </Space>
                        </List.Item>
                    )}
                />
            </Card>
            <Card>
                <TextArea
                   rows={3}
                    placeholder="Enter JSON schema here"
                    onChange={handleTextAreaChange}
                    value={textAreaValue}
                />
                <Button
                    onClick={saveToLocalStorage}
                    type="primary"
                    style={{ marginTop: '10px', marginRight: '10px' }}
                >
                    Save to Local Storage
                </Button>
                <Button
                    onClick={updateFormSchema}
                    type="primary"
                    style={{ marginTop: '10px', marginRight: '10px' }}
                >
                    Update Schema
                </Button>
                <Button
                    onClick={openPreviewModal}
                    type="primary"
                    style={{ marginTop: '10px' }}
                >
                    Preview Schema Content
                </Button>
                <Button
                    onClick={handleSaveForm}
                    type="primary"
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                >
                    {formToUpdate ? 'Update Form' : 'Save Form'}
                </Button>
              
            </Card>
            <Modal
                title="Form Content Preview"
                visible={previewVisible}
                onOk={closePreviewModal}
                onCancel={closePreviewModal}
            >
                <DynamicForm schema={previewForm ? JSON.parse(previewForm.formSchema) : {}} />
            </Modal>
        </Content>
    );
}
