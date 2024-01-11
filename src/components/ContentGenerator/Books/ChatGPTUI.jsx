import React from 'react';
import {useState, useEffect } from 'react';
import { Card, Flex,Radio, Button,Input,Tooltip, Select,Collapse, FloatButton,Layout,notification } from  'antd';
import { CommentOutlined,ClearOutlined, SyncOutlined, SearchOutlined } from '@ant-design/icons'; // Assuming Ant Design icons
const { TextArea } = Input;
const { Option } = Select;
import OpenAI from 'openai';
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});
const ChatGPTUI = ({ loadBooks }) => {
  const [text, setText] = useState('');
  const [responses, setResponses] = useState([]);
  const [textResponse, setTextResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [promptsBooks, setPromptsBooks] = useState([]);
  useEffect(() => {
		loadPrompts();
	}, []);
  const handlePromptBookSelection = (promptBookId) => {
		const promptBook = promptsBooks.find(b => b.title === promptBookId);
		setText(promptBook.content + text);
	};
  const loadPrompts = () => {
		const savedPromptsBooks = localStorage.getItem('prompts_books');
		if (savedPromptsBooks) {
			setPromptsBooks(JSON.parse(savedPromptsBooks));
		}
	};
  const sendMessage = () => {
    if (text.trim() !== '') {
      setMessages([...messages, text]); // Add the new message to the chat history
      setText(''); // Clear the text area
    }
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
			setResponses([...responses, contentResult]);
		} catch (err) {
			setError(err.message);
			notification.error({ message: 'Error', description: err.message });
		} finally {
			setIsLoading(false);
		}
	};
  const handleTextContinueGeneration = async (continueText) => {
    setIsLoading(true);
    try {
      const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [{ "role": "user", "content": continueText }],
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
      setResponses([...responses, contentResult]);
    } catch (err) {
      setError(err.message);
      notification.error({ message: 'Error', description: err.message });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 24 }}
      icon={<CommentOutlined />}
    >
      <Card style={{width: '300px',
    height: '70vh', right:300}} >
       <Layout>
      <Card>
          <Select placeholder="Select a template prompt"  onChange={handlePromptBookSelection}>
            {promptsBooks.map(promptBook => (
              <Option key={promptBook.title} label={promptBook.title}>{promptBook.title}</Option>
            ))}
          </Select>
      </Card>
      <Card>
        <TextArea  value={text} onChange={e => setText(e.target.value)} />
      </Card>
      <Card gap="small" align="flex justify-center">
      <Tooltip title="search">
        <Button  type="primary" shape="circle" icon={<SearchOutlined />} onClick={handleTextGeneration} loading={isLoading} />
      </Tooltip>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tooltip title="Clear Prompt"> <Button shape="circle" icon={<ClearOutlined />}  onClick={() => setText('')}> </Button></Tooltip>
        {responses &&(<Tooltip title="Clear Response"> <Button shape="circle" icon={<ClearOutlined />} onClick={() => setResponses([])}></Button></Tooltip>)}
      </Card>

        {/* Other components */}
        {responses.map((response, index) => (
           <Collapse
           size="small"
           items={[
             {
               key: index,
               label:'Response: '+ index,
               children: 
        <Card  key={index}>
          <TextArea rows={2} value={response} readOnly />
          <Tooltip title="Continue Writing">
            <Button 
              icon={<SearchOutlined />} 
              onClick={() => handleTextContinueGeneration('more  ' + response)}
              loading={isLoading}
            >
              Continue Writing...
            </Button>
          </Tooltip>
        </Card>,
        },
      ]}
    />
      ))}

      <Card gap="small" align="flex justify-center">
        <Radio.Group style={{ marginTop: 10 }} onChange={(e) => handleTextGeneration(e.target.value)}>
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
        </Radio.Group>
      </Card>
    </Layout>
      </Card>
    </FloatButton.Group>
  );
}

export default ChatGPTUI;

