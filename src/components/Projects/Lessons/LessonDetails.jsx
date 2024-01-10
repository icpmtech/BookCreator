import React from 'react';
import { Card,Drawer,Space,Button } from 'antd';

const LessonDetails = ({ Lesson,onClose }) => {
  if (!Lesson) {
    return <p>No Lesson selected</p>;
  }

  return (
    <Drawer
    title={Lesson?.title || 'Lesson Details'}
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
      <p>Type: {Lesson.Lesson_type}</p>
      <p>Description: {Lesson.description}</p>
      <p>Content: {Lesson.content}</p>
      <div>
        <h3>Chapters:</h3>
        {Lesson?.chapters?.map((chapter, index) => (
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

export default LessonDetails;