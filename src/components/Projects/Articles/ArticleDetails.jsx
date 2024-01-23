import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const ArticleDetails = ({ Article,onClose }) => {
  if (!Article) {
    return <p>No Article selected</p>;
  }
  const downloadArticleData = (Article) => {
    let articleData = `Type: ${Article.Article_type}\n`;
    articleData += `Description: ${Article.description}\n`;
    articleData += `Content: ${Article.content}\n\n`;
  
    articleData += `Sections:\n`;
    Article.Sections?.forEach((Section, index) => {
      articleData += `  Section ${index + 1}: ${Section.name}\n`;
      Section.sections?.forEach((section, sIndex) => {
        articleData += `    Subsection ${sIndex + 1}: ${section.title}\n`;
        articleData += `    ${section.content}\n`;
      });
    });
  
    // Create a Blob from the string content
    const blob = new Blob([articleData], { type: 'text/plain' });
  
    // Create a link element, set the download attribute with a filename
    const link = document.createElement('a');
    link.download = `${Article.title}.txt`;
  
    // Create a URL for the blob and set as link's href
    link.href = window.URL.createObjectURL(blob);
  
    // Append to the document and trigger the download
    document.body.appendChild(link);
    link.click();
  
    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };
  return (
    <Drawer
    title={Article?.title || 'Article Details'}
    placement="right"
    onClose={onClose}
      width={720}
      visible={true}
      extra={
        <Space>
           <Button icon={<DownloadOutlined />}  onClick={() => downloadArticleData(Article)}>
    Download Article 
  </Button>
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
            <h4>{Section?.name}</h4>
            {Section?.sections?.map((section, sIndex) => (
              <div key={sIndex}>
                   <h3>Section:{section?.title} </h3>
             <p> {section?.content}</p></div>
            ))}
          </div>
        ))}
      </div>
    </Card>
    </Drawer>
  );
};

export default ArticleDetails;