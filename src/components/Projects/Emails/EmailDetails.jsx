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
      <p>Type: {Email.Email_type}</p>
      <p>Description: {Email.description}</p>
      <p>Content: {Email.content}</p>
      <div>
        <h3>Chapters:</h3>
        {Email?.chapters?.map((chapter, index) => (
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

export default EmailDetails;