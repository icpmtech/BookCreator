import React, { useEffect, useState } from 'react';
import { Button, List, Layout, Card,Flex, Drawer } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import EmailDetails from './EmailDetails';
import EmailEdit from './EmailEdit';
import NewEmailForm from './EmailForm';
export default function PromptEmail() {
  const [Emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [newEmailVisible, setNewEmailVisible] = useState(false); // State for new Email form

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = () => {
    const savedEmails = localStorage.getItem('prompts_Emails');
    if (savedEmails) {
      setEmails(JSON.parse(savedEmails));
    }
  };

  const selectEmail = (Email) => {
    setSelectedEmail(Email);
    setDetailsDrawerVisible(true);
    setEditDrawerVisible(false);
  };

  const editEmail = (Email) => {
    setSelectedEmail(Email);
    setEditDrawerVisible(true);
    setDetailsDrawerVisible(false);
  };

  const deleteEmail = (EmailToDelete) => {
    const updatedEmails = Emails.filter(Email => Email.title !== EmailToDelete.title);
    localStorage.setItem('prompts_Emails', JSON.stringify(updatedEmails));
    setEmails(updatedEmails);
    setSelectedEmail(null);
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
  };
  const handleSave = (updatedEmailData) => {
    const updatedEmails = Emails.map(Email => 
        Email.title === selectedEmail.title ? { ...Email, ...updatedEmailData } : Email
    );
    localStorage.setItem('prompts_Emails', JSON.stringify(updatedEmails));
    setEmails(updatedEmails);
    loadEmails();
    setEditDrawerVisible(false); 
};
  const refreshEmails = () => {
    loadEmails();
  };
 
  const newEmail = () => {
    setNewEmailVisible(true); // Open the new Email form or component
  };

  const closeDrawers = () => {
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
    setNewEmailVisible(false); // Close the new Email form as well
  };
  const handleSaveNewEmail = (newEmail) => {
    const updatedEmails = [...Emails, newEmail];
    localStorage.setItem('prompts_Emails', JSON.stringify(updatedEmails));
    setEmails(updatedEmails);
    setNewEmailVisible(false); // Close the form
  };
  return (
    <Layout style={{ margin: 20, height: '100vh' }}>
     <Flex gap="small" align="flex justify-center" >
    <Button onClick={refreshEmails} icon={<SyncOutlined />} style={{ marginBottom: 10 }}>Refresh Prompt to  Emails</Button>
    <Button type="primary" onClick={newEmail} style={{ marginBottom: 10 }}>New Prompt to Email</Button>
    </Flex>
    <h1>Prompts to Emails</h1>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={Emails}
          renderItem={(item) => (
            <List.Item 
              actions={[
                <Button onClick={() => selectEmail(item)} type='primary'>View Prompt Email</Button>,
                <Button onClick={() => editEmail(item)} type='primary'>Edit Prompt Email</Button>,
                <Button onClick={() => deleteEmail(item)} type='danger'>Delete Prompt Email</Button>
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
      {newEmailVisible && (
  <NewEmailForm onSave={handleSaveNewEmail} onClose={() => setNewEmailVisible(false)} />
)}
        {detailsDrawerVisible && selectedEmail && <EmailDetails Email={selectedEmail} onClose={closeDrawers} />}
        {editDrawerVisible && selectedEmail && <EmailEdit Email={selectedEmail} onClose={closeDrawers} onSave={handleSave} />}
    </Layout>
  );
}
