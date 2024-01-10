import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';

const BookDetails = ({ book,onClose }) => {
  if (!book) {
    return <p>No book selected</p>;
  }

  return (
    <Drawer
    title={book?.title || 'Book Details'}
    placement="right"
    onClose={onClose}
      width={720}
      visible={true}
      extra={
        <Space>
        <Button type="primary"onClick={onClose}>
          Close
        </Button>
      </Space>
      }
  >
    <Card >
      <p>Title: {book.title}</p>
      <p>Prompt Content: {book.content}</p>
    </Card>
    </Drawer>
  );
};

export default BookDetails;