import React, { useState, useEffect } from 'react';
import { Button, Select, notification,message, Row, Col, Layout, Card, Spin, Space, Flex, Menu } from 'antd';
import { SyncOutlined, SettingOutlined, BookOutlined, MenuFoldOutlined, CommentOutlined } from '@ant-design/icons';
import OpenAI from 'openai';
import NewBookForm from './NewBookForm';
import BookEdit from './BookEdit';
import BookDetails from './BookDetails';
import BookSelectedEdit from './BookSelectedEdit';
import NewForm from './NewForm'; // Component for creating new forms
import FormEdit from './EditForm'; // Component for editing forms
import { useLocation } from 'react-router-dom';
const { Option } = Select;
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});

const Book = () => {
	const [loadingBook, setLoadingBook] = useState(false); // State for loadingBook

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
	const [messageApi, contextHolder] = message.useMessage();
	 // States for forms
	 const [forms, setForms] = useState([]);
	 const [selectedForm, setSelectedForm] = useState(null);
	 const [newFormVisible, setNewFormVisible] = useState(false);
	 const [editFormVisible, setEditFormVisible] = useState(false);
 	const [currentSchema, setCurrentSchema] = useState(null);
	 const location = useLocation();
	 const book = location.state?.book;
 
	 useEffect(() => {
		 loadBooks();
		 loadForms();
	 }, []);
 

 
	 const loadForms = () => {
		 const savedForms = localStorage.getItem('savedForms');
		 if (savedForms) {
			 setForms(JSON.parse(savedForms));
		 }
	 };

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
		// Start loading
		setLoadingBook(true);
		messageApi
		.open({
		  type: 'loading',
		  content: 'Updating in progress..',
		  duration: 1,
		});
		
		setTimeout(() => {
		  try {
			const updatedBooks = books.map(book =>
			  book.title === updatedBookData.title ? { ...book, ...updatedBookData } : book
			);
			localStorage.setItem('books', JSON.stringify(updatedBooks));
			setBooks(updatedBooks);
			loadBooks();
			setSelectedBook(updatedBookData);
			messageApi
		.open({
		  type: 'success',
		  content: 'Book update finished.',
		  duration: 1,
		});
		  } catch (error) {
			console.error('Error during book update:', error);
			messageApi.open({
			  type: 'error',
			  content: 'Error during book update.',
			});
		  } finally {
			// Stop loading after 1 second and after the process is completed or if there is an error
			setLoadingBook(false);
		  }
		}, 2000); // 1-second delay
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
  // Functions for handling forms
  const handleSaveNewForm = (newForm) => {
	const updatedForms = [...forms, newForm];
	localStorage.setItem('savedForms', JSON.stringify(updatedForms));
	setForms(updatedForms);
	setNewFormVisible(false);
};

const selectForm = (formId) => {
	const form = forms.find(f => f.id === formId);
	setSelectedForm(form);
	setCurrentSchema(JSON.parse(form.formSchema));
	setEditFormVisible(true);
};

	return (

		<Layout style={{ height: '100vh' }}>
			<Menu mode="horizontal" justify="center" >
				<Menu.Item key={'Create_Book'} icon={<BookOutlined></BookOutlined> }  onClick={newBook} >
						Create Book
				</Menu.Item>
				<Menu.Item key={'Manage_Book_Templates'} icon={<BookOutlined></BookOutlined> }  onClick={()=>{ navigate("/template-books")}} >
						Manage Book Templates
				</Menu.Item>
			</Menu>

 {/* Form Management Section */}
 <Card title="Select Book" extra={
                <Select style={{ width: '200px' }} placeholder="Select a book" onChange={selectForm}>
                    {forms.map(form => (
                        <Option key={form.id} value={form.id}>
                            {form.name}
                        </Option>
                    ))}
                </Select>}>
				{editFormVisible && selectedForm && (
				<> 
				<FormEdit form={selectedForm} onClose={() => setEditFormVisible(false)}  onSave={handleSaveInlineEdit} schema={currentSchema} />
				
				</>)}
            </Card>
           
              


		</Layout>
	);
};

export default Book;
