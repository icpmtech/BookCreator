import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const LessonDetails = ({ Lesson,onClose }) => {
  if (!Lesson) {
    return <p>No Lesson selected</p>;
  }
  const downloadLessonData = (Lesson) => {
    let lessonData = `Type: ${Lesson.Lesson_type}\n`;
    lessonData += `Description: ${Lesson.description}\n`;
    lessonData += `Content: ${Lesson.content}\n\n`;
  
    lessonData += `Chapters:\n`;
    Lesson?.chapters?.forEach((chapter, index) => {
      lessonData += `  Chapter ${index + 1}: ${chapter?.name}\n`;
      chapter?.sections?.forEach((section, sIndex) => {
        lessonData += `    Section ${sIndex + 1}: ${section?.title}\n`;
        lessonData += `    ${section?.content}\n`;
      });
    });
  
    // Create a Blob from the string content
    const blob = new Blob([lessonData], { type: 'text/plain' });
  
    // Create a link element, set the download attribute with a filename
    const link = document.createElement('a');
    link.download = `${Lesson.title}.txt`;
  
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
    title={Lesson?.title || 'Lesson Details'}
    placement="right"
    onClose={onClose}
      width={720}
      visible={true}
      extra={
        <Space>
           <Button icon={<DownloadOutlined />} onClick={() => downloadLessonData(Lesson)}>
    Download Lesson 
  </Button>
        <Button type="primary"onClick={onClose}>
          Close
        </Button>
      </Space>
      }
  >
    <Card >
      <p>Type: {Lesson.Lesson_type}</p>
      <p>Description: {Lesson.description}</p>
      <p>Content: {Lesson.content}</p>
      <div>
        <h3>Chapters:</h3>
        {Lesson?.chapters?.map((chapter, index) => (
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

export default LessonDetails;