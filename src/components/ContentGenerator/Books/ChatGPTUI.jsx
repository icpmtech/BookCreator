import React from 'react';
import { Card, Flex, Button, Select, Option, FloatButton } from  'antd';
import { CommentOutlined, SyncOutlined, SettingOutlined } from '@ant-design/icons'; // Assuming Ant Design icons


const ChatGPTUI = ({ loadBooks, handlePromptBookSelection, promptsBooks }) => {
  
  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 24 }}
      icon={<CommentOutlined />}
    >
      <Card>
        <Flex gap="small" align="flex justify-center">
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
    </FloatButton.Group>
  );
}

export default ChatGPTUI;

