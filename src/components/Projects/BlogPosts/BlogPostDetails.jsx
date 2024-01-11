import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const BlogPostDetails = ({ BlogPost,onClose }) => {
  if (!BlogPost) {
    return <p>No BlogPost selected</p>;
  }
  const downloadBlogPostData = (BlogPost) => {
    let blogPostData = `Type: ${BlogPost.BlogPost_type}\n`;
    blogPostData += `Description: ${BlogPost.description}\n`;
    blogPostData += `Content: ${BlogPost.content}\n\n`;
  
    blogPostData += `Chapters:\n`;
    BlogPost.chapters?.forEach((chapter, index) => {
      blogPostData += `  Chapter ${index + 1}: ${chapter?.name}\n`;
      chapter.sections?.forEach((section, sIndex) => {
        blogPostData += `    Section ${sIndex + 1}: ${section?.title}\n`;
        blogPostData += `    ${section?.content}\n`;
      });
    });
  
    // Create a Blob from the string content
    const blob = new Blob([blogPostData], { type: 'text/plain' });
  
    // Create a link element, set the download attribute with a filename
    const link = document.createElement('a');
    link.download = `${BlogPost.title}.txt`;
  
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
    title={BlogPost?.title || 'BlogPost Details'}
    placement="right"
    onClose={onClose}
      width={720}
      visible={true}
      extra={
        <Space>
              <Button icon={<DownloadOutlined />}  onClick={() => downloadBlogPostData(BlogPost)}>
    Download Blog Post 
  </Button>
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
            <h4>{chapter?.name}</h4>
            {chapter?.sections?.map((section, sIndex) => (
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

export default BlogPostDetails;