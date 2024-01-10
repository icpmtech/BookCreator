import React from 'react';
import { Card } from 'antd';

const BookDetails = ({ book }) => {
  if (!book) {
    return <p>No book selected</p>;
  }

  return (
    <Card >
      <p>Type: {book.book_type}</p>
      <p>Description: {book.description}</p>
      <p>Content: {book.content}</p>
      <div>
        <h3>Chapters:</h3>
        {book?.chapters?.map((chapter, index) => (
          <div key={index}>
            <h4>{chapter.name}</h4>
            {chapter?.sections.map((section, sIndex) => (
              <div key={sIndex}>
                   <h3>Section:{section.title} </h3>
             <p> {section.content}</p></div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BookDetails;