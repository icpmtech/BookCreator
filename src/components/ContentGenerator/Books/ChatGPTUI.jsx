import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Flex, Radio, Button, Input, Tooltip, Select, Collapse, FloatButton, Layout, notification, Space } from 'antd';
import { SyncOutlined, SettingOutlined, BookOutlined, CustomerServiceOutlined, CommentOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons'; // Assuming Ant Design icons
const { TextArea } = Input;
const { Option } = Select;
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true
});
const ChatGPTUI = () => {
  const [text, setText] = useState('');
  const [responses, setResponses] = useState([]);
  const [textResponse, setTextResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [promptsBooks, setPromptsBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isFloatButtonGroupOpen, setIsFloatButtonGroupOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async (copyText) => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopySuccess('Copied!');
      notification.success({ message: 'Text copied to clipboard' });
    } catch (err) {
      setCopySuccess('Failed to copy!');
      notification.error({ message: 'Failed to copy text' });
    }
  };
  // Toggle the visibility based on your logic
  const toggleFloatButtonGroup = () => {
    setIsFloatButtonGroupOpen(!isFloatButtonGroupOpen);
  };
  useEffect(() => {
    loadPrompts();
  }, []);
  const loadBooks = () => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  };
  useEffect(() => {
    loadBooks();
  }, []);

  const handlePromptBookSelection = (promptBookId) => {
    const promptBook = promptsBooks.find(b => b.title === promptBookId);
    setText(promptBook.content + text);
  };
  const handleBookSelection = (bookId) => {
    const book = books.find(b => b.title === bookId);
    setSelectedBook(book);
  };

  const loadPrompts = () => {
    const savedPromptsBooks = localStorage.getItem('prompts_books');
    if (savedPromptsBooks) {
      setPromptsBooks(JSON.parse(savedPromptsBooks));
    }
  };
  const sendMessage = () => {
    if (text.trim() !== '') {
      setResponses([...responses, text]); // Changed from setMessages to setResponses
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

  const handleSaveChapter = async (responseIndex) => {
    if (!selectedBook || responseIndex < 0 || responseIndex >= responses.length) {
      console.error("Invalid book or response index");
      return;
    }
  
    setIsLoading(true);
    try {
      // Clone the selected book to avoid direct state mutation
      const updatedBook = { ...selectedBook };
      
      // Check if the chapters array exists, if not, initialize it
      if (!updatedBook.chapters) {
        updatedBook.chapters = [];
      }
  
      const content= responses[responseIndex];
      // Create new chapter data from the response
      const newChapter = {
        name: `Chapter ${updatedBook.chapters.length + 1}`,
        sections: [{ title:'empty', content: content}] // assuming a chapter has sections, initialize it as empty
      };
      // Add the new chapter to the cloned book's chapters array
      updatedBook.chapters.push(newChapter);
    
      // Update the books array with the modified book
      const updatedBooks = books.map(book =>
        book.title === selectedBook.title ? updatedBook : book
      );
  
      // Update localStorage and state
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
      setSelectedBook(updatedBook); // Update the selected book
  
    } catch (error) {
      console.error("Failed to save chapter:", error);
      notification.error({ message: 'Error', description: "Failed to save chapter" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FloatButton.Group
      trigger="click"
      onClick={toggleFloatButtonGroup}
      open={isFloatButtonGroupOpen}
      type="primary"
      style={{ right: 24 }}
      icon={<CommentOutlined />}
      closeOnClickOutside={false}
    >
      <Card bordered={false} style={{
        width: '400px', overflow: 'auto',
        height: '600px', right: 400
      }} >
        <Layout>
          <Card>
            <Select placeholder="Select a template prompt" onChange={handlePromptBookSelection}>
              {promptsBooks?.map(promptBook => (
                <Option key={promptBook.title} label={promptBook.title}>{promptBook.title}</Option>
              ))}
            </Select>
          </Card>
          <Card >
            <TextArea autoSize rows={1} placeholder='Ask me...' value={text} onChange={e => setText(e.target.value)} />
            <Card  >
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={handleTextGeneration} loading={isLoading} />
              </Tooltip>
              {error && <p style={{ color: 'red' }}>Error: {error}</p>}
              <Tooltip title="Clear Prompt"> <Button shape="circle" icon={<ClearOutlined />} onClick={() => setText('')} /></Tooltip>
              {responses && (<Tooltip title="Clear Response"> <Button shape="circle" icon={<ClearOutlined />} onClick={() => setResponses([])} /></Tooltip>)}
            </Card>
          </Card>
          {/* Other components */}
          {responses.map((response, index) => (
  <Collapse
    size="small"
    items={[
      {
        key: index,
        label: 'Response: ' + index,
        children:
          <Card extra={
            <Space>
              <Tooltip title="Copy Text">
              <Button  icon={<SyncOutlined />} onClick={() => copyToClipboard(response)}>Copy</Button>
              </Tooltip>
              
      {copySuccess}
            </Space>
          } key={index}>
            <TextArea autoSize rows={2} value={response} />
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
          <Collapse
            size="small"
            items={[
              {
                key: 'actions',
                label: 'More Actions',
                children:
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
                  </Card>,
              },
            ]}
          />
        </Layout>
      </Card>
    </FloatButton.Group>
  );
}

export default ChatGPTUI;

