import React, { useEffect, useState } from 'react';
import { Button, List, Layout, Card,Flex, Drawer } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import ArticleDetails from './ArticleDetails';
import ArticleEdit from './ArticleEdit';
import NewArticleForm from './NewArticleForm';
export default function ProjectArticle() {
  const [Articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [newArticleVisible, setNewArticleVisible] = useState(false); // State for new Article form

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const savedArticles = localStorage.getItem('Articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  };

  const selectArticle = (Article) => {
    setSelectedArticle(Article);
    setDetailsDrawerVisible(true);
    setEditDrawerVisible(false);
  };

  const editArticle = (Article) => {
    setSelectedArticle(Article);
    setEditDrawerVisible(true);
    setDetailsDrawerVisible(false);
  };

  const deleteArticle = (ArticleToDelete) => {
    const updatedArticles = Articles.filter(Article => Article.title !== ArticleToDelete.title);
    localStorage.setItem('Articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    setSelectedArticle(null);
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
  };
  const handleSave = (updatedArticleData) => {
    const updatedArticles = Articles.map(Article => 
        Article.title === selectedArticle.title ? { ...Article, ...updatedArticleData } : Article
    );
    localStorage.setItem('Articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    loadArticles();
    setEditDrawerVisible(false); 
};
  const refreshArticles = () => {
    loadArticles();
  };
 
  const newArticle = () => {
    setNewArticleVisible(true); // Open the new Article form or component
  };

  const closeDrawers = () => {
    setDetailsDrawerVisible(false);
    setEditDrawerVisible(false);
    setNewArticleVisible(false); // Close the new Article form as well
  };
  const handleSaveNewArticle = (newArticle) => {
    const updatedArticles = [...Articles, newArticle];
    localStorage.setItem('Articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    setNewArticleVisible(false); // Close the form
  };
  return (
    <Layout style={{ margin: 20, height: '100vh' }}>
    <Flex gap="small" align="flex justify-center" >
    <Button onClick={refreshArticles} icon={<SyncOutlined />} style={{ marginBottom: 10 }}>Refresh Articles</Button>
    <Button  type="primary"  onClick={newArticle} style={{ marginBottom: 10 }}>New Article</Button>
    </Flex>
    <h1>Articles</h1>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={Articles}
          renderItem={(item) => (
            <List.Item 
              actions={[
                <Button onClick={() => selectArticle(item)} type='primary'>View Article</Button>,
                <Button onClick={() => editArticle(item)} type='primary'>Edit Article</Button>,
                <Button onClick={() => deleteArticle(item)} >Delete Article</Button>
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={`Type: ${item.Article_type}, Description: ${item.description}`}
              />
            </List.Item>
          )}
        />
      </Card>
      {newArticleVisible && (
  <NewArticleForm onSave={handleSaveNewArticle} onClose={() => setNewArticleVisible(false)} />
)}
        {detailsDrawerVisible && selectedArticle && <ArticleDetails Article={selectedArticle} onClose={closeDrawers} />}
        {editDrawerVisible && selectedArticle && <ArticleEdit Article={selectedArticle} onClose={closeDrawers} onSave={handleSave} />}
    </Layout>
  );
}
