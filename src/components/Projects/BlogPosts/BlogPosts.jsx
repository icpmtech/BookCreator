import React, { useEffect, useState } from 'react';
import { Button, List, Layout, Card,Flex, Drawer } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import BlogPostDetails from './BlogPostDetails';
import BlogPostEdit from './BlogPostEdit';
import NewBlogPostForm from './NewBlogPostForm';
export default function ProjectBlogPost() {
  const [BlogPosts, setBlogPosts] = useState([]);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [newBlogPostVisible, setNewBlogPostVisible] = useState(false); // State for new BlogPost form

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = () => {
    const savedBlogPosts = localStorage.getItem('BlogPosts');
    if (savedBlogPosts) {
      setBlogPosts(JSON.parse(savedBlogPosts));
    }
  };

  const selectBlogPost = (BlogPost) => {
    setSelectedBlogPost(BlogPost);
    setDetailsDrawerVisible(true);
    setEditDrawerVisible(false);
  };

  const editBlogPost = (BlogPost) => {
    setSelectedBlogPost(BlogPost);
    setEditDrawerVisible(true);
    setDetailsDrawerVisible(false);
  };

  const deleteBlogPost = (BlogPostToDelete) => {
    const updatedBlogPosts = BlogPosts.filter(BlogPost => BlogPost.title !== BlogPostToDelete.title);
    localStorage.setItem('BlogPosts', JSON.stringify(updatedBlogPosts));
    setBlogPosts(updatedBlogPosts);
    setSelectedBlogPost(null);
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
  };
  const handleSave = (updatedBlogPostData) => {
    const updatedBlogPosts = BlogPosts.map(BlogPost => 
        BlogPost.title === selectedBlogPost.title ? { ...BlogPost, ...updatedBlogPostData } : BlogPost
    );
    localStorage.setItem('BlogPosts', JSON.stringify(updatedBlogPosts));
    setBlogPosts(updatedBlogPosts);
    loadBlogPosts();
    setEditDrawerVisible(false); 
};
  const refreshBlogPosts = () => {
    loadBlogPosts();
  };
 
  const newBlogPost = () => {
    setNewBlogPostVisible(true); // Open the new BlogPost form or component
  };

  const closeDrawers = () => {
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
    setNewBlogPostVisible(false); // Close the new BlogPost form as well
  };
  const handleSaveNewBlogPost = (newBlogPost) => {
    const updatedBlogPosts = [...BlogPosts, newBlogPost];
    localStorage.setItem('BlogPosts', JSON.stringify(updatedBlogPosts));
    setBlogPosts(updatedBlogPosts);
    setNewBlogPostVisible(false); // Close the form
  };
  return (
    <Layout style={{ margin: 20, height: '100vh' }}>
    <Flex gap="small" align="flex justify-center" >
    <Button onClick={refreshBlogPosts} icon={<SyncOutlined />} style={{ marginBottom: 10 }}>Refresh BlogPosts</Button>
    <Button  type="primary"  onClick={newBlogPost} style={{ marginBottom: 10 }}>New BlogPost</Button>
    </Flex>
    <h1>BlogPosts</h1>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={BlogPosts}
          renderItem={(item) => (
            <List.Item 
              actions={[
                <Button onClick={() => selectBlogPost(item)} type='primary'>View BlogPost</Button>,
                <Button onClick={() => editBlogPost(item)} type='primary'>Edit BlogPost</Button>,
                <Button onClick={() => deleteBlogPost(item)} >Delete BlogPost</Button>
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={`Type: ${item.BlogPost_type}, Description: ${item.description}`}
              />
            </List.Item>
          )}
        />
      </Card>
      {newBlogPostVisible && (
  <NewBlogPostForm onSave={handleSaveNewBlogPost} onClose={() => setNewBlogPostVisible(false)} />
)}
        {detailsDrawerVisible && selectedBlogPost && <BlogPostDetails BlogPost={selectedBlogPost} onClose={closeDrawers} />}
        {editDrawerVisible && selectedBlogPost && <BlogPostEdit BlogPost={selectedBlogPost} onClose={closeDrawers} onSave={handleSave} />}
    </Layout>
  );
}
