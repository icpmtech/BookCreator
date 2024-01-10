import React from 'react';
import { Button, Select, notification,Form, Layout, Card, Input, Space,Flex,Radio } from 'antd';
import { SyncOutlined,CloseOutlined,BookOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const BookSelectedEdit = ({ book, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = (values) => {
    onSave(values); // Process the updated values
    onClose(); // Close the drawer
  };

  return (
   <Layout>
        <Card >
      <p>Type: {book.book_type}</p>
      <p>Description: {book.description}</p>
      <p>Content: {book.content}</p>
      <div>
        <h3>Chapters:</h3>
        {book?.chapters?.map((chapter, index) => (
          <div key={index}>
            <h4>{chapter.name}</h4>
            {chapter?.sections?.map((section, sIndex) => (
              <div key={sIndex}>
                   <h3>Section:{section.title} </h3>
             <p> {section.content}</p></div>
            ))}
          </div>
        ))}
      </div>
    </Card>
    
      </Layout>
    
  );
};

export default BookSelectedEdit;
