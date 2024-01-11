import React, { useState, useEffect } from 'react';
import { Button, Select, notification,FloatButton , Layout, Card, Input, Space, Flex, Radio } from 'antd';
import { SyncOutlined, SettingOutlined, BookOutlined,CustomerServiceOutlined,CommentOutlined } from '@ant-design/icons';
import OpenAI from 'openai';
import NewBookForm from './NewBookForm';
import BookEdit from './BookEdit';
import BookDetails from './BookDetails';
import BookSelectedEdit from './BookSelectedEdit';
import ChatGPTUI from './ChatGPTUI';
const { TextArea } = Input;
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

		<Layout style={{ padding: '20px' }}>
			
			<Space direction="vertical" style={{ width: '100%' }}>
			<ChatGPTUI
        loadBooks={loadBooks}
        handlePromptBookSelection={handlePromptBookSelection}
        promptsBooks={promptsBooks}
      />
				<Card >
					<Flex gap="small" align="flex justify-center" >
						<Button icon={<SyncOutlined />} onClick={loadBooks}>Refresh Prompts</Button>
						<Select
							placeholder="Select a template prompt"
							style={{ width: 200 }}
							onChange={handlePromptBookSelection}
						>
							{promptsBooks.map(promptBook => (
								<Option key={promptBook.title} label={promptBook.title}>{promptBook.title}</Option>
							))}
						</Select>
						<Button icon={<SettingOutlined />} type="primary">Create Prompt</Button>
					</Flex>
				</Card>
				<Card >
					<TextArea rows={4} value={text} onChange={e => setText(e.target.value)} />
					</Card>
				<Flex gap="small" align="flex justify-center" >
					<Button type="primary" onClick={handleTextGeneration} loading={isLoading}>
						Generate Text
					</Button>
					{error && <p style={{ color: 'red' }}>Error: {error}</p>}
					<Button onClick={e => setText('')} >
						Clear Prompt
					</Button>
					<Button onClick={e => setTextResponse('')}>Clear Response</Button>
				</Flex>
				<TextArea rows={10} value={textResponse} />
				<Flex gap="small" align="flex justify-center" >
					<Radio.Group style={{ marginTop: 10 }} onChange={(e) => handleTextGeneration(e.target.value)}>
						<Radio.Button value={' Continue' + textResponse}>Continue Writing...</Radio.Button>
						<Radio.Button value={'Improve Writing:' + textResponse}>Improve Writing</Radio.Button>
						<Radio.Button value={'Fix spelling & Grammarthe following text:' + text}>Fix spelling & Grammar</Radio.Button>
						<Radio.Button value={'Make Shorter the following text:' + text}>Make Shorter </Radio.Button>
						<Radio.Button value={'Make Longer the following text:' + text}>Make Longer</Radio.Button>
						<Radio.Button value={'Change Tone:' + text}>Change Tone</Radio.Button>
						<Radio.Button value={'Simplify language in the following text:' + text}>Simplify language</Radio.Button>
						<Radio.Button value={'Paraphrase:' + text}>Paraphrase</Radio.Button>
						<Radio.Button value={'Summarize:' + textResponse}>Summarize Response</Radio.Button>

					</Radio.Group>
				</Flex>
				<Layout>
					<Card extra={<Flex gap="small" align="flex justify-center">

						<Button icon={<BookOutlined />} type="primary" onClick={newBook}>Create Book</Button>
						<Button icon={<SyncOutlined />} onClick={loadBooks}>Refresh Books</Button>
						<Select
							placeholder="Select a book"
							style={{ width: 200 }}
							onChange={handleBookSelection}
						>
							{books.map(book => (
								<Option key={book.title} label={book.title}>{book.title}</Option>
							))}
						</Select>

						{selectBook && (<Button icon={<BookOutlined />} type="primary" onClick={editBook}>Edit in Panel</Button>)}
					</Flex >} title={selectedBook ? `Selected Book: ${selectedBook.title}` : 'Select a Book to Update'}>
						{/* Display selected book details or a message if no book is selected */}
						{selectedBook ? (
							<BookSelectedEdit book={selectedBook} onSave={handleSaveInlineEdit} />
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
