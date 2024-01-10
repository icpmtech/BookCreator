import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Layout, Card } from 'antd';
import BookDetails from './BookDetails'; // Import the BookDetails component

export default function ProjectBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const loadBooks = () => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks([JSON.parse(savedBooks)]);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []); // Add an empty dependency array to avoid reloading on every render

  const selectBook = (book) => {
    setSelectedBook(book);
  };

  return (
    <Layout style={{ margin: 20 }}>
      <h1>Books</h1>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={books}
          renderItem={(item) => (
            <List.Item actions={[<Button onClick={() => selectBook(item)} type='primary'>Edit Book</Button>]}>
              <List.Item.Meta
                title={item.title}
                description={`Type: ${item.book_type}, Description: ${item.description}`}
              />
            </List.Item>
          )}
        />
      </Card>
      <BookDetails book={selectedBook} /> 
    </Layout>
  );
}
