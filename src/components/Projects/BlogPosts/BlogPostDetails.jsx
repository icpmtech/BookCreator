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
      <p>Type: {BlogPost.BlogPost_type}</p>
      <p>Description: {BlogPost.description}</p>
      <p>Content: {BlogPost.content}</p>
      <div>
        <h3>Chapters:</h3>
        {BlogPost?.chapters?.map((chapter, index) => (
          <div key={index}>
            <h4>{chapter.name}</h4>
            {chapter?.sections.map((section, sIndex) => (
              <div key={sIndex}>
                   <h3>Section:{section.title} </h3>
             <p> {section.content}</p></div>
            ))}
          </div>
        ))}
      </div>
    </Card>
    </Drawer>
  );
};

export default BlogPostDetails;