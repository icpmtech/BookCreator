import React, { useEffect, useState } from 'react';
import { Layout, Card, Modal,Flex } from 'antd';
import CardProject from './CardProject';
import ArticleProject from './ArticleProject';
import Chat from '../../chat/Chat';
const { Content } = Layout;
export default function HomePrivate() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [books, setBooks] = useState([]);
  const [Articles, setArticles] = useState([]);
  const [Lessons, setLessons] = useState([]);
  const [Emails, setEmails] = useState([]);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = () => {
    const savedEmails = localStorage.getItem('Emails');
    if (savedEmails) {
      setEmails(JSON.parse(savedEmails));
    }
  };


  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = () => {
    const savedLessons = localStorage.getItem('Lessons');
    if (savedLessons) {
      setLessons(JSON.parse(savedLessons));
    }
  };


  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const savedArticles = localStorage.getItem('Articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  };
    const handleCardClick = (book) => {
        setSelectedBook(book);
        setIsModalVisible(true);
    };

    useEffect(() => {
        loadBooks();
      }, []);
    
      const loadBooks = () => {
        const savedBooks = localStorage.getItem('books');
        if (savedBooks) {
          setBooks(JSON.parse(savedBooks));
        }
      };
    return (
        <Content style={{ height:'100vh'}}>
            <Chat></Chat>
             <Flex>
                {books?.map(book => (
                   
                    <Card key={book.id} onClick={() => handleCardClick(book)} >
                        <CardProject book={book} />
                    </Card>
                  
                ))}
            <Modal
                title={selectedBook?.title}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <p>{selectedBook?.content}</p>
            </Modal>
            </Flex>
             <Flex>
          
                {Articles?.map(book => (
                   
                    <Card key={book.id} onClick={() => handleCardClick(book)} >
                        <ArticleProject book={book} />
                    </Card>
                  
                ))}
            <Modal
                title={selectedBook?.title}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <p>{selectedBook?.content}</p>
            </Modal>
            </Flex>
             <Flex>
          
                {Emails.map(book => (
                   
                    <Card key={book.id} onClick={() => handleCardClick(book)} >
                        <CardProject book={book} />
                    </Card>
                  
                ))}
            <Modal
                title={selectedBook?.title}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <p>{selectedBook?.content}</p>
            </Modal>
            </Flex>
             <Flex>
          
                {Lessons?.map(book => (
                   
                    <Card key={book.id} onClick={() => handleCardClick(book)} >
                        <CardProject book={book} />
                    </Card>
                  
                ))}
            <Modal
                title={selectedBook?.title}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <p>{selectedBook?.content}</p>
            </Modal>
            </Flex>
        </Content>
        
    );
}
