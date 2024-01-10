import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';

const BlogPostDetails = ({ BlogPost,onClose }) => {
  if (!BlogPost) {
    return <p>No BlogPost selected</p>;
  }

  return (
    <Drawer
    title={BlogPost?.title || 'BlogPost Details'}
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
      <p>Title: {BlogPost.title}</p>
      <p>Prompt Content: {BlogPost.content}</p>
    </Card>
    </Drawer>
  );
};

export default BlogPostDetails;