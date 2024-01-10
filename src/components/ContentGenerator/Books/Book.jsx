import React, { useState, useEffect } from 'react';

import { Circles } from 'react-loader-spinner';
import { Editor } from '@tinymce/tinymce-react';
import OpenAI from "openai";
import { Input, Space, Radio, Flex, Button, Dropdown, Modal,Avatar, List, notification } from 'antd';
import NewBookProject from './NewBookProject'
import SelectedBookProject from './SelectedBookProject'

const { TextArea } = Input;
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});

import {
	SearchOutlined,
} from '@ant-design/icons';
import { ContainerStyled, DivStyled, LogoAnimation, DivHeader } from './styles';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
const items = [
	{
		label: 'Generate text to an Outline Course Book',
		key: '1',
		icon: <SearchOutlined />,
	},
	{
		label: 'Format the text as Chapter to one Book',
		key: '2',
		icon: <SearchOutlined />,
	},
	{
		label: 'Format the text as Section to one Book',
		key: '3',
		icon: <SearchOutlined />,
	},
	{
		label: 'Generate 10 Titles to one Book',
		key: '4',
		icon: <SearchOutlined />,
	},
];
const operations = [
	{
		label: 'Save as a New Book project',
		key: '1',
		icon: <SearchOutlined />,
	},
	{
		label: 'Save as a Chapter in Book project',
		key: '2',
		icon: <SearchOutlined />,
	},
	{
		label: 'A content to stored Book project',
		key: '3',
		icon: <SearchOutlined />,
	},
	{
		label: 'Format as Book',
		key: '4',
		icon: <SearchOutlined />,
	},
];

const Book = () => {
	const [formData, setFormData] = useState(''); // Your form data
	const [term, setTerm] = useState('');
	const [search, setSearch] = useState('');
	let [response, setResponse] = useState('');
	let [responseEditor, setResponseEditor] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	
	const handleMenuClick = (e) => {
		const operations = {
		  '1': 'Generate text to an Outline Course Book: ',
		  '2': 'Format the text as Chapter to one Book: ',
		  '3': 'Format the text as Section to one Book: ',
		  '4': 'Generate 10 Title to one Book: '
		};
	  
		const operation = operations[e.key];
		if (operation) {
		  setSearch(`${operation}${search}`);
		}
	  };
	  

	const menuProps = {
		items,
		onClick: handleMenuClick,
	};
	
	const clearContentSearch = () => {
		setSearch('');
	};
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (message, description) => {
		api['info']({
			message: message,
			description: description
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [{ "role": "user", "content": search + term }],
				stream: true,
				temperature: 0.7,
				max_tokens: 400,
				top_p: 1,
			});

			let contentResult = '';
			for await (const chunk of res) {
				contentResult += chunk.choices[0]?.delta?.content || '\n';
			}
			response += contentResult;
			openNotificationWithIcon("End operation", "See the result in the Prompt Editor");
			setResponse(response);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};
	const formatTextToEditor = async (e) => {
		if (e === 'clear') {
			setResponseEditor('');
			return;
		}
		setIsLoading(true);
		setResponseEditor(e);
		setIsLoading(false);
	};
	const continuePrompt = async (e) => {
		if (e === 'Restart') {
			setResponse('');
			return;
		}
		setIsLoading(true);
		setResponseEditor(response);
		try {
			const res = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [{ "role": "user", "content": e }],
				stream: true,
				temperature: 0.7,
				max_tokens: 400,
				top_p: 1,
			});

			let contentResult = '';
			for await (const chunk of res) {
				chunk.choices.forEach(element => {
					contentResult += element?.delta?.content || '\n';
				});

			}
			response += contentResult;
			setFormData(response);
			setResponse(response);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};
	
	// Function to handle form changes
	const onFormChange = (newData) => {
		debugger;
	  setFormData(newData);
	};
	const refreshBooks = () => {
		loadBooks();
	  };
	return (

		<DivStyled>
			<DivHeader >
				<h2 ><LogoAnimation></LogoAnimation>AI Book Generator </h2>
			</DivHeader>
			<ContainerStyled >
			<FloatButton.Group
      shape="square"
      style={{
        right: 94,
      }}
    >
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton  onClick={() => refreshBooks()} icon={<SyncOutlined />} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
				{contextHolder}
				<div style={{ margin: 15, display: 'flex' }}>
					<Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
					<Space wrap>
							<Dropdown.Button menu={menuProps} >
								Choose Prompt Assistant
							</Dropdown.Button>
						</Space>
						<Button type='primary'  onClick={handleSubmit} icon={<SearchOutlined />} >Generate Content</Button>
						<Button  onClick={clearContentSearch}  >Clear Content</Button>
						{response && (	<NewBookProject formParentData={response} ></NewBookProject>)}
						{response && (	<SelectedBookProject></SelectedBookProject>)}
						{isLoading && (
							<Circles
								height='32'
								width='32'
								color='brown'
								ariaLabel='circles-loading'
								wrapperStyle={{}}
								wrapperClass=''
								visible={true}
							/>
						)}
					</Flex>

				</div>
				<DivStyled >
					<TextArea
						rows={10}
						type='text'
						placeholder='Outline Course Book...'
						autoComplete='off'
						className='input'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
 
    
					<DivStyled >
						<Flex gap="small" align="flex justify-center" >
							<Radio.Group style={{ marginTop: 10 }} onChange={(e) => continuePrompt(e.target.value)}>
								<Radio.Button value={' Continue' + response}>Continue Writing...</Radio.Button>
								<Radio.Button value={'Improve Writing:' + search}>Improve Writing</Radio.Button>
								<Radio.Button value={'Fix spelling & Grammarthe following text:' + search}>Fix spelling & Grammar</Radio.Button>
								<Radio.Button value={'Make Shorter the following text:' + search}>Make Shorter </Radio.Button>
								<Radio.Button value={'Make Longer the following text:' + search}>Make Longer</Radio.Button>
								<Radio.Button value={'Change Tone:' + search}>Change Tone</Radio.Button>
								<Radio.Button value={'Simplify language in the following text:' + search}>Simplify language</Radio.Button>
								<Radio.Button value={'Improve Writing:' + search}>Paraphrase</Radio.Button>
								<Radio.Button value={'Summarize:' + response}>Summarize Response</Radio.Button>
								<Radio.Button value="Restart">Clear Response</Radio.Button>
							</Radio.Group>
						</Flex>
					</DivStyled>
				</DivStyled>
				<DivStyled >
					<TextArea rows={15} style={{ color: '#000', backgroundColor: '#fff' }} value={response} />
					<Flex gap="small" align="flex justify-center" vertical>
						<Radio.Group style={{ marginBottom: 10, marginTop: 15 }} onChange={(e) => formatTextToEditor(e.target.value)}>
							<Radio.Button value={response}>Add Editor</Radio.Button>
							<Radio.Button value="clear">Clear</Radio.Button>
						</Radio.Group>
					</Flex>
				</DivStyled>
				<DivStyled >
					<Editor
						apiKey='t9rz4fmx4fkm29mh38r8e69mcv9lij6qsy7szgk1vzca4wks'
						initialValue={responseEditor}
						init={{
							height: 500,
							menubar: false,
							plugins: [
								'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
								'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
								'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
							],
							toolbar: 'undo redo | blocks | ' +
								'bold italic forecolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help',
							content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
						}}
					/>
				</DivStyled>

			</ContainerStyled>

			{error && (
				<DivStyled className='text-center md:text-2xl font-mono font-bold mt-3'>
					{error}
				</DivStyled>
			)}
		</DivStyled>
	);
}

export default Book;
