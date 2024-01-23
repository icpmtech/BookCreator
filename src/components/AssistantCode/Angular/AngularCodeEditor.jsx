import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { Editor } from '@tinymce/tinymce-react';
import OpenAI from "openai";
import { Input, Radio, Flex,notification, Layout } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
const { TextArea } = Input;
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});
import { ContainerStyled, DivStyled, LogoAnimation,DivHeader } from './styles';
const AngularCodeEditor = () => {
	const [term, setTerm] = useState('Help me!');
	const [search, setSearch] = useState('');
	let [response, setResponse] = useState('');
	let [responseEditor, setResponseEditor] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [size, setSize] = useState('large'); // default is 'middle'
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
				messages: [{ "role": "user", "content": search }],
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
			openNotificationWithIcon("End operation","See the result in the Prompt Editor");
			setResponse(response);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	return (
		<Layout >
			{contextHolder}
			<ContainerStyled >
				<DivStyled>
				<DivHeader >
					<h2 ><LogoAnimation></LogoAnimation>Code Assistant </h2>
				</DivHeader>
					<DivStyled>
						<TextArea
							type='text'
							rows={10}
							placeholder='Writing here your Angular Code...'
							autoComplete='off'
							className='input-textarea'
							onChange={(e) => setSearch(e.target.value)}
						/>
						{search && (<SyntaxHighlighter language="TypeScript" style={vscDarkPlus}>
							{search} 
						</SyntaxHighlighter>)}
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
					</DivStyled>
					<div style={{ marginBottom: 15, display: 'flex' }}>
						<Flex gap="small" align="flex justify-center" vertical>
							<Radio.Group style={{ marginTop: 10 }} value={size} onChange={(e) => continuePrompt(e.target.value)}>
								<Radio.Button value={'Fix the code' + search}>Fix code...</Radio.Button>
								<Radio.Button value={'Improve the Code:' + search}>Improve Code</Radio.Button>
								<Radio.Button value={'Format the Code:' + search}>Format Code</Radio.Button>
								<Radio.Button value={'Explain the code:' + search}>Explain the code </Radio.Button>
								<Radio.Button value="Restart">Restart</Radio.Button>
							</Radio.Group>
							
						</Flex>
					</div>
					
					<TextArea disable rows={15} style={{ color: '#000', backgroundColor: '#fff' }} value={response} />
					<div style={{ marginBottom: 15, marginTop: 15, display: 'flex' }}>
					<Flex gap="small" align="flex justify-center" vertical>
						<Radio.Group value={size} onChange={(e) => formatTextToEditor(e.target.value)}>
							<Radio.Button value={response}>Add Editor</Radio.Button>
							<Radio.Button value="clear">Clear</Radio.Button>
						</Radio.Group>
					</Flex>
					</div>
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
		</Layout>
	);
}

export default AngularCodeEditor;
