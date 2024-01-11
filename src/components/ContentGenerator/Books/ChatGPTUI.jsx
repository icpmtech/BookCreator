import React from 'react';
import {useState, useRef} from 'react';
import { Card, Flex,Radio, Button,Input, Select, FloatButton,Layout } from  'antd';
import { CommentOutlined, SyncOutlined, SettingOutlined } from '@ant-design/icons'; // Assuming Ant Design icons
const { TextArea } = Input;
const { Option } = Select;
import OpenAI from 'openai';
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});
const ChatGPTUI = ({ loadBooks, handlePromptBookSelection, promptsBooks }) => {
  const [text, setText] = useState('');
  const [textResponse, setTextResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
			setTextResponse(contentResult);
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
    height: '600px', right:300}} >
       <Layout>
      <Card>
        <Flex gap="small" align="flex justify-center">
          <Button icon={<SyncOutlined />} onClick={loadBooks}>Refresh Prompts</Button>
          <Select placeholder="Select a template prompt" style={{ width: 200 }} onChange={handlePromptBookSelection}>
            {promptsBooks.map(promptBook => (
              <Option key={promptBook.title} label={promptBook.title}>{promptBook.title}</Option>
            ))}
          </Select>
          <Button icon={<SettingOutlined />} type="primary">Create Prompt</Button>
        </Flex>
      </Card>
      <Card>
        <TextArea rows={4} value={text} onChange={e => setText(e.target.value)} />
      </Card>
      <Flex gap="small" align="flex justify-center">
        <Button type="primary" onClick={handleTextGeneration} loading={isLoading}>Generate Text</Button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Button onClick={() => setText('')}>Clear Prompt</Button>
        <Button onClick={() => setTextResponse('')}>Clear Response</Button>
      </Flex>

      <TextArea rows={10} value={textResponse} />

      <Flex gap="small" align="flex justify-center">
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
      </Flex>
    </Layout>
     
      </Card>
    </FloatButton.Group>
  );
}

export default ChatGPTUI;

