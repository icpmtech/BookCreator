import React from 'react';
import { EditOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const ArticleProject = ({ book }) => (
  <Card
    style={{ width: 300 }}
    actions={[
      <EditOutlined key="edit" />,
    ]}
  >
    <Meta
     avatar={ <BookOutlined />}
      title={book.title} // Book title
      description={book.description} // Book description
    />
  </Card>
);

export default ArticleProject;
