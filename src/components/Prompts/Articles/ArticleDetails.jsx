import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';

const ArticleDetails = ({ Article,onClose }) => {
  if (!Article) {
    return <p>No Article selected</p>;
  }

  return (
    <Drawer
    title={Article?.title || 'Article Details'}
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
      <p>Title: {Article.title}</p>
      <p>Prompt Content: {Article.content}</p>
    </Card>
    </Drawer>
  );
};

export default ArticleDetails;