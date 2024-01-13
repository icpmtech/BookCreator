import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Row, Col, Card, Select, Button, Space, Collapse, Flex } from 'antd';
import { DownloadOutlined, CloseOutlined, BookOutlined } from '@ant-design/icons';
const { Option } = Select;
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const BookEdit = ({ book, onClose, onSave }) => {
  const [form] = Form.useForm();
  const [editorContents, setEditorContents] = useState({});
  const [overallContent, setOverallContent] = useState(''); // State for overall book content

  useEffect(() => {
    form.setFieldsValue(book);
    setOverallContent(book.content); // Initialize overall content
    const initialContents = {};
    book.chapters.forEach((chapter, cIndex) => {
      chapter.sections.forEach((section, sIndex) => {
        initialContents[`chapter-${cIndex}-section-${sIndex}`] = section.content;
      });
    });
    setEditorContents(initialContents);
  }, [book, form]);

  const handleEditorChange = (content, fieldKey) => {
    setEditorContents({ ...editorContents, [fieldKey]: content });
  };
  const handleOverallContentChange = (content) => {
    setOverallContent(content);
  };
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedBook = { ...values, content: overallContent };
        // Update the contents of chapters and sections
        values.chapters.forEach((chapter, cIndex) => {
          chapter.sections.forEach((section, sIndex) => {
            section.content = editorContents[`chapter-${cIndex}-section-${sIndex}`];
          });
        });
        onSave(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  const handleDownload = () => {
    // Retrieve form data
    const book = form.getFieldsValue(true);
    let bookData = `Type: ${book.book_type}\n`;
    bookData += `Description: ${book.description}\n`;
    bookData += `Content: ${book.content}\n`;
    bookData += `\nChapters:\n`;
    book?.chapters?.forEach((chapter, index) => {
      bookData += `  Chapter ${index + 1}: ${chapter?.name}\n`;
      chapter?.sections?.forEach((section, sIndex) => {
        bookData += `    Section ${sIndex + 1}: ${section.title}\n`;
        bookData += `    ${section.content}\n`;
      });
    });
    // Create a Blob from the string content
    const blob = new Blob([bookData], { type: 'text/plain' });

    // Create a link element, set the download attribute with a filename
    const link = document.createElement('a');
    link.download = `${book.title}.txt`;

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
      <Flex gap={10}> <Button icon={<DownloadOutlined />} onClick={handleDownload}>
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

                  label: `Overall Content`,
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
                     <ReactQuill value={overallContent} onChange={handleOverallContentChange} />
                    </Form.Item>,
                },
              ]}
            />
          </Col>
        </Row>
        <Form.List name="chapters">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {
                fields.map((field, cIndex) => (

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
                                    {subFields.map((subField, sIndex) => (
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
                                                <Card>
                                                  <Form.Item noStyle name={[subField.name, 'title']}>
                                                    <Input placeholder="Title" />
                                                  </Form.Item>
                                                </Card>
                                                <Card>
                                                  <Form.Item noStyle name={[subField.name, 'content']}>
                                                    <ReactQuill
                                                      value={editorContents[`chapter-${cIndex}-section-${sIndex}`]}
                                                      onChange={(content) => handleEditorChange(content, `chapter-${cIndex}-section-${sIndex}`)}
                                                    />
                                                  </Form.Item>
                                                </Card>
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
