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
      <p>Type: {Article.Article_type}</p>
      <p>Description: {Article.description}</p>
      <p>Content: {Article.content}</p>
      <div>
        <h3>Sections:</h3>
        {Article?.Sections?.map((Section, index) => (
          <div key={index}>
            <h4>{Section.name}</h4>
            {Section?.sections.map((section, sIndex) => (
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

export default ArticleDetails;