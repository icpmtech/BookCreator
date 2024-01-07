import React, { useState, useEffect } from 'react';

import { Circles } from 'react-loader-spinner';
import { Editor } from '@tinymce/tinymce-react';
import OpenAI from "openai";
import { Input,Space, Radio, Flex, Button,Dropdown,message,notification } from 'antd';
const { TextArea } = Input;
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});

import {
    SearchOutlined ,
} from '@ant-design/icons';
import { ContainerStyled, DivStyled, LogoAnimation, DivHeader } from './styles';

  const items = [
	{
	  label: 'Outline Course Book',
	  key: '1',
	  icon: <SearchOutlined />,
	},
	{
	  label: 'Chapter to Book',
	  key: '2',
	  icon: <SearchOutlined />,
	},
	{
	  label: 'Section to Book',
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

	const [term, setTerm] = useState('');
	const [search, setSearch] = useState('');
	let [response, setResponse] = useState('');
	let [responseEditor, setResponseEditor] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [size, setSize] = useState('large'); // default is 'middle'
	
	const handleMenuClick = (e) => {
		if(e.key==='1')
		setTerm('Outline Course Book');
		if(e.key==='2')
		setTerm('Chapter to Book');
		if(e.key==='3')
		setTerm('Section to Book');
		if(e.key==='4')
		setTerm('Format as Book');
	  };
	const menuProps = {
		items,
		onClick: handleMenuClick,
	  };
	  const handleButtonClick = (e) => {
		if(e.key==='1')
		setTerm('Outline Course Book');
		if(e.key==='2')
		setTerm('Chapter to Book');
		if(e.key==='3')
		setTerm('Section to Book');
		if(e.key==='4')
		setTerm('Format as Book');
	  };
	  const [api, contextHolder] = notification.useNotification();
	  const openNotificationWithIcon = (message,description) => {
		api['info']({
		  message: message,
		  description:description
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
			openNotificationWithIcon("End operation","See the result in the Prompt Editor");
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
			setResponse(response);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	return (

		<DivStyled>
			<DivHeader >
				<h2 ><LogoAnimation></LogoAnimation>AI Book Generator </h2>
			</DivHeader>
			<ContainerStyled >
			{contextHolder}
			<div style={{ margin: 15, display: 'flex' }}>
			<Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
						<Button type='primary' ghost onClick={handleSubmit}  icon={<SearchOutlined />} >Ask a Content</Button>
						<Space wrap>
    <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
      Choose Prompt Assistant
    </Dropdown.Button>
	</Space>
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

						onChange={(e) => setSearch(e.target.value)}
					/>
						
						<DivStyled >
					<Flex gap="small" align="flex justify-center" >
						<Radio.Group style={{ marginTop: 10 }} value={size} onChange={(e) => continuePrompt(e.target.value)}>
							<Radio.Button value={' Continue' + response}>Continue Writing...</Radio.Button>
							<Radio.Button value={'Improve Writing:' + search}>Improve Writing</Radio.Button>
							<Radio.Button value={response + 'Format as Chapter'}>Fix spelling & Grammar</Radio.Button>
							<Radio.Button value={response + 'Add links'}>Make Shorter </Radio.Button>
							<Radio.Button value={response + 'Add code examples'}>Make Longer</Radio.Button>
							<Radio.Button value={response + 'Add code examples'}>Change Tone</Radio.Button>
							<Radio.Button value={response + 'Add code examples'}>Simplify language</Radio.Button>
							<Radio.Button value={response + 'Add code examples'}>Paraphrase</Radio.Button>
							<Radio.Button value={'Summarize:' + response}>Summarize</Radio.Button>
							<Radio.Button value="Restart">Restart</Radio.Button>
						</Radio.Group>
					</Flex>
					</DivStyled>
				</DivStyled>
				<DivStyled >
					<TextArea rows={15} style={{ color: '#000', backgroundColor: '#fff' }} value={response} />
					<Flex gap="small" align="flex justify-center" vertical>
						<Radio.Group style={{ marginBottom: 10, marginTop: 15 }} value={size} onChange={(e) => formatTextToEditor(e.target.value)}>
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
