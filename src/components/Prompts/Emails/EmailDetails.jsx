import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';

const EmailDetails = ({ Email,onClose }) => {
  if (!Email) {
    return <p>No Email selected</p>;
  }

  return (
    <Drawer
    title={Email?.title || 'Email Details'}
    placement="right"
    onClose={onClose}
      width={720}
      visible={true}
      extra={
        <Space>
        <Button type="primary"onClick={onClose}>
          Close
        </Button>
      </Space>
      }
  >
    <Card >
      <p>Title: {Email.title}</p>
      <p>Prompt Content: {Email.content}</p>
    </Card>
    </Drawer>
  );
};

export default EmailDetails;