import React, { useState, useEffect } from 'react';
import { Layout, Card, Input, Button, message, Modal, Select, List, Space } from 'antd';
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
    const [formToUpdate, setFormToUpdate] = useState(null);
    const [previewForm, setPreviewForm] = useState(null);
    const [selectButtonLoading, setSelectButtonLoading] = useState(false);

    useEffect(() => {
        const storedValue = localStorage.getItem('textAreaValue');
        if (storedValue) {
            setTextAreaValue(storedValue);
        }
    }, []);

    useEffect(() => {
        const storedForms = localStorage.getItem('savedForms');
        if (storedForms) {
            setSavedForms(JSON.parse(storedForms));
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
            const updatedForms = savedForms.map((form) =>
                form.id === formToUpdate.id ? { ...form, formSchema: textAreaValue } : form
            );
            setSavedForms(updatedForms);
            localStorage.setItem('savedForms', JSON.stringify(updatedForms));
            message.success('Form updated.');
            setFormToUpdate(null);
        } else {
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
        setSelectButtonLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSelectButtonLoading(false);

        setSelectedForm(form.formSchema);
        setTextAreaValue(form.formSchema);
        setFormToUpdate(form);
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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setTextAreaValue(JSON.stringify(json, null, 2));
                    setSchema(json);
                    message.success("Form schema loaded from file.");
                } catch (err) {
                    message.error("Error parsing JSON file.");
                }
            };
            reader.readAsText(file);
        } else {
            message.error("Please upload a valid JSON file.");
        }
    };

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
                                    loading={selectButtonLoading}
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
                <Button onClick={saveToLocalStorage} type="primary" style={{ marginTop: '10px', marginRight: '10px' }}>
                    Save to Local Storage
                </Button>
                <Button onClick={updateFormSchema} type="primary" style={{ marginTop: '10px', marginRight: '10px' }}>
                    Update Schema
                </Button>
                <Button onClick={openPreviewModal} type="primary" style={{ marginTop: '10px' }}>
                    Preview Schema Content
                </Button>
                <Button onClick={handleSaveForm} type="primary" style={{ marginTop: '10px', marginLeft: '10px' }}>
                    {formToUpdate ? 'Update Form' : 'Save Form'}
                </Button>
                <input type="file" onChange={handleFileUpload} style={{ marginTop: '10px', marginLeft: '10px' }} />
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
