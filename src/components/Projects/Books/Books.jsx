import React, { useEffect, useState } from 'react';
import { Button, List, Layout, Card,Flex, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Corrected import
import { SyncOutlined } from '@ant-design/icons';
import BookDetails from './BookDetails';
import BookEdit from './BookEdit';
import NewBookForm from './NewBookForm';
export default function ProjectBook() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [newBookVisible, setNewBookVisible] = useState(false); // State for new book form

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  };

  const selectBook = (book) => {
    setSelectedBook(book);
    setDetailsDrawerVisible(true);
    setEditDrawerVisible(false);
  };

  const editBook = (book) => {
    setSelectedBook(book);
    setEditDrawerVisible(true);
    setDetailsDrawerVisible(false);
  };

  const deleteBook = (bookToDelete) => {
    const updatedBooks = books.filter(book => book.title !== bookToDelete.title);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    setSelectedBook(null);
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
  };
  const handleSave = (updatedBookData) => {
    const updatedBooks = books.map(book => 
        book.title === selectedBook.title ? { ...book, ...updatedBookData } : book
    );
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    loadBooks();
    setEditDrawerVisible(false); 
};
  const refreshBooks = () => {
    loadBooks();
  };
 
  const newBook = () => {
    setNewBookVisible(true); // Open the new book form or component
  };

  const closeDrawers = () => {
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
    setNewBookVisible(false); // Close the new book form as well
  };
  const handleSaveNewBook = (newBook) => {
    const updatedBooks = [...books, newBook];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    setNewBookVisible(false); // Close the form
  };
  return (
    <Layout style={{  height: '100vh' }}>
    <Menu mode="horizontal">
      <Menu.Item key="refresh">
        <Button onClick={refreshBooks} icon={<SyncOutlined />} >
          Refresh Books
        </Button>
      </Menu.Item>
      <Menu.Item key="new">
        <Button type="primary" onClick={newBook}>
          New Book
        </Button>
      </Menu.Item>
    </Menu>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={books}
          renderItem={(item) => (
            <List.Item 
              actions={[
                <Button onClick={() => selectBook(item)} type='primary'>View Book</Button>,
                <Button onClick={() => editBook(item)} type='primary'>Edit Book</Button>,
                <Button onClick={() => deleteBook(item)} danger >Delete Book</Button>,
                <Button><Link to={{ pathname: '/books', state: { book: item } }}>AI Book Generator</Link></Button> 
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={`Type: ${item.book_type}, Description: ${item.description}`}
              />
            </List.Item>
          )}
        />
      </Card>
      {newBookVisible && (
  <NewBookForm onSave={handleSaveNewBook} onClose={() => setNewBookVisible(false)} />
)}
        {detailsDrawerVisible && selectedBook && <BookDetails book={selectedBook} onClose={closeDrawers} />}
        {editDrawerVisible && selectedBook && <BookEdit book={selectedBook} onClose={closeDrawers} onSave={handleSave} />}
    </Layout>
  );
}
