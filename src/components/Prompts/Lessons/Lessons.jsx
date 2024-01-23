import React, { useEffect, useState } from 'react';
import { Button, List, Layout, Card,Flex, Drawer } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import LessonDetails from './LessonDetails';
import LessonEdit from './LessonEdit';
import NewLessonForm from './LessonForm';
export default function PromptLesson() {
  const [Lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [newLessonVisible, setNewLessonVisible] = useState(false); // State for new Lesson form

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = () => {
    const savedLessons = localStorage.getItem('prompts_lessons');
    if (savedLessons) {
      setLessons(JSON.parse(savedLessons));
    }
  };

  const selectLesson = (Lesson) => {
    setSelectedLesson(Lesson);
    setDetailsDrawerVisible(true);
    setEditDrawerVisible(false);
  };

  const editLesson = (Lesson) => {
    setSelectedLesson(Lesson);
    setEditDrawerVisible(true);
    setDetailsDrawerVisible(false);
  };

  const deleteLesson = (LessonToDelete) => {
    const updatedLessons = Lessons.filter(Lesson => Lesson.title !== LessonToDelete.title);
    localStorage.setItem('prompts_lessons', JSON.stringify(updatedLessons));
    setLessons(updatedLessons);
    setSelectedLesson(null);
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
  };
  const handleSave = (updatedLessonData) => {
    const updatedLessons = Lessons.map(Lesson => 
        Lesson.title === selectedLesson.title ? { ...Lesson, ...updatedLessonData } : Lesson
    );
    localStorage.setItem('prompts_lessons', JSON.stringify(updatedLessons));
    setLessons(updatedLessons);
    loadLessons();
    setEditDrawerVisible(false); 
};
  const refreshLessons = () => {
    loadLessons();
  };
 
  const newLesson = () => {
    setNewLessonVisible(true); // Open the new Lesson form or component
  };

  const closeDrawers = () => {
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
    setNewLessonVisible(false); // Close the new Lesson form as well
  };
  const handleSaveNewLesson = (newLesson) => {
    const updatedLessons = [...Lessons, newLesson];
    localStorage.setItem('prompts_lessons', JSON.stringify(updatedLessons));
    setLessons(updatedLessons);
    setNewLessonVisible(false); // Close the form
  };
  return (
    <Layout style={{ margin: 20, height: '100vh' }}>
     <Flex gap="small" align="flex justify-center" >
    <Button onClick={refreshLessons} icon={<SyncOutlined />} style={{ marginBottom: 10 }}>Refresh Prompt to  Lessons</Button>
    <Button type="primary" onClick={newLesson} style={{ marginBottom: 10 }}>New Prompt to Lesson</Button>
    </Flex>
    <h1>Prompts to Lessons</h1>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={Lessons}
          renderItem={(item) => (
            <List.Item 
              actions={[
                <Button onClick={() => selectLesson(item)} type='primary'>View Prompt Lesson</Button>,
                <Button onClick={() => editLesson(item)} type='primary'>Edit Prompt Lesson</Button>,
                <Button onClick={() => deleteLesson(item)} type='danger'>Delete Prompt Lesson</Button>
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={`Title: ${item.title}, Content: ${item.content}`}
              />
            </List.Item>
          )}
        />
      </Card>
      {newLessonVisible && (
  <NewLessonForm onSave={handleSaveNewLesson} onClose={() => setNewLessonVisible(false)} />
)}
        {detailsDrawerVisible && selectedLesson && <LessonDetails Lesson={selectedLesson} onClose={closeDrawers} />}
        {editDrawerVisible && selectedLesson && <LessonEdit Lesson={selectedLesson} onClose={closeDrawers} onSave={handleSave} />}
    </Layout>
  );
}
