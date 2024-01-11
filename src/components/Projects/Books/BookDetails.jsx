import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const BookDetails = ({ book,onClose }) => {
  if (!book) {
    return <p>No book selected</p>;
  }
  const downloadBookData = (book) => {
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
    <Drawer
    title={book?.title || 'Book Details'}
    placement="right"
    onClose={onClose}
      width={720}
      visible={true}
      extra={
        <Space>
          <Button  icon={<DownloadOutlined />} onClick={() => downloadBookData(book)}>
    Download Book
  </Button>
        <Button type="primary"onClick={onClose}>
          Close
        </Button>
      </Space>
      }
  >
    <Card >
      <p>Type: {book.book_type}</p>
      <p>Description: {book.description}</p>
      <p>Content: {book.content}</p>
      <div>
        <h3>Chapters:</h3>
        {book?.chapters?.map((chapter, index) => (
          <div key={index}>
            <h4>{chapter?.name}</h4>
            {chapter?.sections?.map((section, sIndex) => (
              <div key={sIndex}>
                   <h3>Section:{section.title} </h3>
             <p> {section.content}</p></div>
            ))}
          </div>
        ))}
      </div>
    </Card>
    </Drawer>
  );
};

export default BookDetails;