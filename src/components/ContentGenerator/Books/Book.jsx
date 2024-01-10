import React, { useState, useEffect } from 'react';
import { Button, Select, notification,Form, Layout, Card, Input, Space,Flex,Radio } from 'antd';
import { SyncOutlined,CloseOutlined,BookOutlined } from '@ant-design/icons';
import OpenAI from 'openai';
import NewBookForm from './NewBookForm';
import BookEdit from './BookEdit';
import BookDetails from './BookDetails';
import BookSelectedEdit from './BookSelectedEdit';

const { TextArea } = Input;
const { Option } = Select;

const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});

const Book = () => {
	const [books, setBooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState(null);
	const [text, setText] = useState('');
	const [textResponse, setTextResponse] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newBookVisible, setNewBookVisible] = useState(false);
	const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
	const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  
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
  
	const editBook = () => {
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
	  loadBooks();
	  setEditDrawerVisible(false); 
  };
  const handleSaveInlineEdit = (updatedBookData) => {
	const updatedBooks = books.map(book => 
		book.title === selectedBook.title ? { ...book, ...updatedBookData } : book
	);
	localStorage.setItem('books', JSON.stringify(updatedBooks));
	setBooks(updatedBooks);
	loadBooks();
	
};
	const refreshBooks = () => {
	  loadBooks();
	};
	const closeDrawers = () => {
	  setDetailsDrawerVisible(false);
	  setEditDrawerVisible(false);
	  setNewBookVisible(false); // Close the new book form as well
	};
	
	useEffect(() => {
		loadBooks();
	}, []);
	const newBook = () => {
		setNewBookVisible(true); // Open the new book form or component
	  };
	  const handleSaveNewBook = (newBook) => {
		const updatedBooks = [...books, newBook];
		localStorage.setItem('books', JSON.stringify(updatedBooks));
		setBooks(updatedBooks);
		setNewBookVisible(false); // Close the form
	  };

	const handleTextGeneration = async () => {
		setIsLoading(true);
		try {
			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [{ "role": "user", "content": text }],
				stream: true,
				temperature: 0.7,
				max_tokens: 400,
				top_p: 1,
			});

			let contentResult = '';
			for await (const chunk of response) {
				chunk.choices.forEach(element => {
					contentResult += element?.delta?.content || '\n';
				});
			}
			setTextResponse(contentResult);
		} catch (err) {
			setError(err.message);
			notification.error({ message: 'Error', description: err.message });
		} finally {
			setIsLoading(false);
		}
	};

	const handleBookSelection = (bookId) => {
		const book = books.find(b => b.title === bookId);
		setSelectedBook(book);
	};

	return (
		<Layout style={{ padding: '20px' }}>
			
			<Space direction="vertical" style={{ width: '100%' }}>
			<Flex gap="small" align="flex justify-center" >
				<Button icon={<SyncOutlined />}  onClick={loadBooks}>Refresh Books</Button>
				<Button icon={<BookOutlined />} type="primary" onClick={newBook}>Create Book</Button>
				<Select
					placeholder="Select a book"
					style={{ width: 200 }}
					onChange={handleBookSelection}
				>
					{books.map(book => (
						<Option key={book.title} label={book.title}>{book.title}</Option>
					))}
				</Select>
				{selectBook && (	<Button icon={<BookOutlined />} type="primary" onClick={editBook}>Edit Book</Button>)}
				</Flex>
				<TextArea rows={4} value={text} onChange={e => setText(e.target.value)} />
				<Flex gap="small" align="flex justify-center" >
				<Button type="primary" onClick={handleTextGeneration} loading={isLoading}>
					Generate Text
				</Button>
				{error && <p style={{ color: 'red' }}>Error: {error}</p>}
				<Button  >
					Add as chapter to Book
				</Button>
				<Button  >
					Add as section to Book
				</Button>
				<Button   >
					Generate titles
				</Button>
				</Flex>
				<TextArea rows={10} value={textResponse}  />
				<Flex gap="small" align="flex justify-center" >
							<Radio.Group style={{ marginTop: 10 }} onChange={(e) => setText(e.target.value)}>
								<Radio.Button value={' Continue' + textResponse}>Continue Writing...</Radio.Button>
								<Radio.Button value={'Improve Writing:' + text}>Improve Writing</Radio.Button>
								<Radio.Button value={'Fix spelling & Grammarthe following text:' + text}>Fix spelling & Grammar</Radio.Button>
								<Radio.Button value={'Make Shorter the following text:' + text}>Make Shorter </Radio.Button>
								<Radio.Button value={'Make Longer the following text:' + text}>Make Longer</Radio.Button>
								<Radio.Button value={'Change Tone:' + text}>Change Tone</Radio.Button>
								<Radio.Button value={'Simplify language in the following text:' + text}>Simplify language</Radio.Button>
								<Radio.Button value={'Paraphrase:' + text}>Paraphrase</Radio.Button>
								<Radio.Button value={'Summarize:' + textResponse}>Summarize Response</Radio.Button>
								<Radio.Button value="Restart">Clear textResponse</Radio.Button>
							</Radio.Group>
						</Flex>
						<Layout>
						<Card title={selectedBook ? `Book Details: ${selectedBook.title}` : 'Book Details'}>
					{/* Display selected book details or a message if no book is selected */}
					{selectedBook ? (
						<div>
							<BookSelectedEdit book={selectedBook}  onSave={handleSaveInlineEdit} />
						</div>
					) : 'No book selected'}
				</Card></Layout>
			
			</Space>
			{newBookVisible && (
  <NewBookForm onSave={handleSaveNewBook} onClose={() => setNewBookVisible(false)} />
)}
 {detailsDrawerVisible && selectedBook && <BookDetails book={selectedBook} onClose={closeDrawers} />}
        {editDrawerVisible && selectedBook && <BookEdit book={selectedBook} onClose={closeDrawers} onSave={handleSave} />}
		</Layout>
	);
};

export default Book;
