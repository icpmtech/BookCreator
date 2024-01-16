import React, { useState, useEffect } from 'react';
import { Button, Select, notification, Row, Col, Layout, Card, Input, Space, Flex, Menu } from 'antd';
import { SyncOutlined, SettingOutlined, BookOutlined, MenuFoldOutlined, CommentOutlined } from '@ant-design/icons';
import OpenAI from 'openai';
import NewBookForm from './NewBookForm';
import BookEdit from './BookEdit';
import BookDetails from './BookDetails';
import BookSelectedEdit from './BookSelectedEdit';
const { Option } = Select;
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});

const Book = () => {
	const [books, setBooks] = useState([]);
	const [promptsBooks, setPromptsBooks] = useState([]);
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

	useEffect(() => {
		loadPrompts();
	}, []);

	const loadPrompts = () => {
		const savedPromptsBooks = localStorage.getItem('prompts_books');
		if (savedPromptsBooks) {
			setPromptsBooks(JSON.parse(savedPromptsBooks));
		}
	};
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
		debugger;
		const updatedBooks = books.map(book =>
			book.title === selectedBook.title ? { ...book, ...updatedBookData } : book
		);
		localStorage.setItem('books', JSON.stringify(updatedBooks));
		setBooks(updatedBooks);
		setSelectedBook(updatedBookData);
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
		setSelectedBook(updatedBookData);

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

	const handlePromptBookSelection = (promptBookId) => {
		const promptBook = promptsBooks.find(b => b.title === promptBookId);
		setText(promptBook.content + text);
	};

	return (

		<Layout style={{ height: '100vh' }}>
			<Menu mode="horizontal" justify="center" >
				<Menu.Item key={'Create_Book'} icon={<BookOutlined></BookOutlined> }  onClick={newBook} >
						Create Book
				</Menu.Item>
				
			</Menu>
			<Card title={selectedBook ? `Selected Book: ${selectedBook.title}` : 'Select a Book to Update'} extra={
			<><Button icon={<SyncOutlined />} onClick={loadBooks}>
		</Button>	<Select style={{ width: '200px' }} placeholder="Select a book" onChange={handleBookSelection}>
						{books.map(book => (
							<Option key={book.title} value={book.title}>
								{book.title}
							</Option>
						))}
					</Select></>
		}>
				{/* Display selected book details or a message if no book is selected */}
				{selectedBook ? (
					<BookSelectedEdit book={selectedBook} onSave={handleSaveInlineEdit} />
				) : 'No book selected'}
			</Card>
			{newBookVisible && (
				<NewBookForm onSave={handleSaveNewBook} onClose={() => setNewBookVisible(false)} />
			)}

			{detailsDrawerVisible && selectedBook && <BookDetails book={selectedBook} onClose={closeDrawers} />}
			{editDrawerVisible && selectedBook && <BookEdit book={selectedBook} onClose={closeDrawers} onSave={handleSave} />}
		</Layout>
	);
};

export default Book;
