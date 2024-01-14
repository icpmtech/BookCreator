import React, { useState, useEffect } from 'react';
import { Menu, Button, Layout, Form, Input, Row, Col, Card, Select, Space,notification, Collapse, Flex } from 'antd';
import { DownloadOutlined, CloseOutlined, BookOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import { TextRun } from 'docx';
const { Option } = Select;
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import BookPdfDocument from './BookPdfDocument'; // Path to your PDF document component
import { createDocx } from './createDocx';
const BookEdit = ({ book, onClose, onSave }) => {
  const [form] = Form.useForm();
  const [editorContents, setEditorContents] = useState({});
  const [overallContent, setOverallContent] = useState(''); // State for overall book content
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message,description) => {
    api['info']({
      message: message,
      description:description
    });
  }
  useEffect(() => {
    form.setFieldsValue(book);
    setOverallContent(book.content); // Initialize overall content
    const initialContents = {};
    book?.chapters?.forEach((chapter, cIndex) => {
      chapter?.sections?.forEach((section, sIndex) => {
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
        updatedBook?.chapters?.forEach((chapter, cIndex) => {
          chapter?.sections?.forEach((section, sIndex) => {
            section.content = editorContents[`chapter-${cIndex}-section-${sIndex}`];
          });
        });
        onSave(updatedBook);
      })
      .catch((info) => {
        openNotificationWithIcon(`Validate Failed:${info}`);
      });
  };

  const handleDownload = () => {
    // Retrieve form data
    const book = form.getFieldsValue(true);
    let bookData = `Type: ${book.book_type}\n`;
    bookData += `Description: ${stripHtml(book.description)}\n`;
    bookData += `Content: ${stripHtml(book.content)}\n`;
    bookData += `\nChapters:\n`;

    book?.chapters?.forEach((chapter, index) => {
        bookData += `  Chapter ${index + 1}: ${stripHtml(chapter?.name)}\n`;
        chapter?.sections?.forEach((section, sIndex) => {
            bookData += `    Section ${sIndex + 1}: ${stripHtml(section.title)}\n`;
            bookData += `    ${stripHtml(section.content)}\n`;
        });
    });

    // Create a Blob from the string content
    const blob = new Blob([bookData], { type: 'text/plain' });

    // Create a link element, set the download attribute with a filename
    const link = document.createElement('a');
    link.download = `${stripHtml(book.title)}.txt`;

    // Create a URL for the blob and set as link's href
    link.href = window.URL.createObjectURL(blob);

    // Append to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
};

  const stripHtml = (htmlString) => {
    if (!htmlString) return "";
    const temporalDivElement = document.createElement("div");
    // Set the HTML content with the provided
    temporalDivElement.innerHTML = htmlString;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  };
  const getPdfData = () => {
    const bookData = form.getFieldsValue();
  
    // Strip HTML from the overall content
    const plainOverallContent = stripHtml(bookData.content);
  
    // Update the book data with the stripped overall content
    const updatedBookData = {
      ...bookData,
      content: plainOverallContent,
      chapters: bookData?.chapters?.map((chapter, cIndex) => ({
        ...chapter,
        sections: chapter?.sections?.map((section, sIndex) => ({
          ...section,
          // Strip HTML from each section's content
          content: stripHtml(editorContents[`chapter-${cIndex}-section-${sIndex}`]) || ''
        }))
      }))
    };
  
    return updatedBookData;
  };
  const handleDocxDownload = async () => {
    try {
      const bookData = getPdfData(); // Assuming getPdfData() returns the formatted book data
      const docxBlob = await createDocx(bookData);
      saveAs(docxBlob, `${bookData.title}.docx`);
    } catch (error) {
      alert(error)
   //   notification.error("Error creating DOCX file:"+ error);
    }
  };
  
  return (
 <Layout>
  <Menu  mode="horizontal">
    <Menu.Item  icon={<DownloadOutlined></DownloadOutlined> } key="pdf">
      <PDFDownloadLink
        document={<BookPdfDocument bookData={getPdfData()} />}
        fileName="book.pdf"
      >
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'PDF')}
      </PDFDownloadLink>
    </Menu.Item>
    <Menu.Item key="docx" icon={<DownloadOutlined></DownloadOutlined> } onClick={handleDocxDownload}>
     DOCX
    </Menu.Item>
    <Menu.Item key="text"  icon={<DownloadOutlined></DownloadOutlined> } onClick={handleDownload}>
     Plain Text
    </Menu.Item>
  </Menu>
    <Card title={'Editing the book: ' + book.title} extra={ <Button type="primary" form="bookForm" key="submit" htmlType="submit">
        Save
      </Button>}>
      
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

        <Row  gutter={16}>
          <Col  span={24}>
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
        <Row  gutter={16}>
          <Col  span={24}>
        <Form.List name="chapters">
          {(fields, { add, remove }) => (
            <div style={{ marginTop:15, display: 'flex', rowGap: 16, flexDirection: 'column' }}>
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
        </Col>
        </Row>
      </Form>
    </Card>
    </Layout>

  );
};

export default BookEdit;
