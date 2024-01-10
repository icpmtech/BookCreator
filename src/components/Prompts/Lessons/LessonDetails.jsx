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
      <p>Title: {Lesson.title}</p>
      <p>Prompt Content: {Lesson.content}</p>
    </Card>
    </Drawer>
  );
};

export default LessonDetails;