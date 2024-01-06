import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { Editor } from '@tinymce/tinymce-react';
import OpenAI from "openai";
import { Input, Radio, Flex,Layout } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
const { TextArea } = Input;
const openai = new OpenAI({
	apiKey: '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',
	dangerouslyAllowBrowser: true
});

const PythonCodeEditor = () => {
	const [term, setTerm] = useState('Help me!');
	const [search, setSearch] = useState('');
	let [response, setResponse] = useState('');
	let [responseEditor, setResponseEditor] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [size, setSize] = useState('large'); // default is 'middle'
	useEffect(() => {
		// Fetch initial data here using GetResponse if needed
	}, []);

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
			setResponse(response);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	return (
		<Layout style={{
            minHeight:400
          }}>
			<div  className='bg-navbar'>
				<div style={{
            minHeight:600
          }}  className='overlay-2'>
					<section className='leading-loose max-w-7xl mx-auto'>
						<div className='text-center'>
							<h2 className='Heading-text'>Code Assistant </h2>
							<div className='text-md mb-4 px-2 lg:px-0' >
								<div className='text-md mb-4 px-2 lg:px-0' >
									<TextArea
										type='text'
										placeholder='Writing Python Code...'
										autoComplete='off'
										className='input-textarea'
										onChange={(e) => setSearch(e.target.value)}
									/>
									<div>
										{search && (<SyntaxHighlighter language="python" style={vscDarkPlus}>
											{search}
										</SyntaxHighlighter>)}
									</div>
							
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
								{isLoading && (
						<div className='flex items-center justify-center mt-6 lg:mt-20'>
							<Circles
								height='50'
								width='50'
								color='brown'
								ariaLabel='circles-loading'
								wrapperStyle={{}}
								wrapperClass=''
								visible={true}
							/>
						</div>
					)}
								<div className='editor flex justify-center '>
									<TextArea disable rows={15} style={{ color: '#000', backgroundColor: '#fff' }} value={response} />
									
								</div>

							</div>
							{response && (<Flex gap="small" align="flex justify-center" vertical>
								<Radio.Group style={{ marginBottom: 10 }} value={size} onChange={(e) => formatTextToEditor(e.target.value)}>
									<Radio.Button value={response}>Add Editor</Radio.Button>
									<Radio.Button value="clear">Clear</Radio.Button>
								</Radio.Group>
							</Flex>)}
						</div>
						<div className="editor">
							{response && (<Editor
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
							/>)}
						</div>
					</section>
					
				</div>
				{error && (
					<div className='text-center md:text-2xl font-mono font-bold mt-3'>
						{error}
					</div>
				)}
			</div>
		</Layout>

	);
}

export default PythonCodeEditor;
