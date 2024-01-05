import React,{ useState } from 'react'
import Home from './components/Home'
import{Routes,Route, Link} from 'react-router-dom'
import Quotes from './components/Quotes';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound';
import Books from './components/Book';
import Chapters from './components/Chapters';
import Sections from './components/Sections';
import Blogposts from './components/BlogPosts';
import Navbar from './components/Navbar';
import { Breadcrumb, Layout,FloatButton  } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
import {
	AppstoreOutlined,
	CalendarOutlined,
	LinkOutlined,
	MailOutlined,
	SettingOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  } from '@ant-design/icons';
  import {Button, Divider, Menu , Switch } from 'antd';
  function getItem(label, key, icon, children) {
	return {
	  key,
	  icon,
	  children,
	  label,
	};
  }
  const items = [
	
	getItem(<a href="/" >
	Home
  </a>,
  '1',
  <AppstoreOutlined />),
	getItem(<a href="/books" >
	Books
  </a>,
  '2', <CalendarOutlined />),
	getItem('Generate Content', 'sub1', <AppstoreOutlined />, [
		getItem(<a href="/books" >
		Books
	  </a>,
	  '3', <CalendarOutlined />),
	  getItem(<a href="/chapters" >
	  Chapters
	</a>,
	'4', <CalendarOutlined />),
	getItem(<a href="/sections" >
	Sections
  </a>,
  '5', <CalendarOutlined />),
	  getItem(<a href="/blogposts" >
  Blogposts
</a>,
'6', <CalendarOutlined />),
	  
	]),
	getItem('Code Assistant', 'sub2', <SettingOutlined />, [
	  getItem('Python', '7'),
	  getItem('React', '8'),
	  getItem('Angular', '9'),
	  getItem('C#', '10'),
	]),
	getItem(
	  <a href="https://cantinhode.net" target="_blank" rel="noopener noreferrer">
		Cantinhode.net
	  </a>,
	  'link',
	  <LinkOutlined />,
	),
  ];
const App = () => {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	  };
  return (  <Layout>
	<Header className='navbar-header'>
	<Navbar />
	</Header>
	  <Layout
	  >
		<Sider style={{
            overflow: 'auto',
          }}  width={300}>
			 <Menu
        style={{
          width: 256,
        }}
        inlineCollapsed={collapsed}
		mode="inline"
        theme='dark'
		items={items}
      >
		 <Menu.Item key="1">
              <span>Home</span>
			  <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span>nav 3</span>
            </Menu.Item>
		  </Menu>
		</Sider>
		<Content style={{
            overflow: 'auto',
          }}>	
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/quotes' element={<Quotes />}></Route>
				<Route path='/books' element={<Books />}></Route>
				<Route path='/chapters' element={<Chapters />}></Route>
				<Route path='/sections' element={<Sections />}></Route>
				<Route path='/blogposts' element={<Blogposts />}></Route>
				<Route path='Books/:id' element={<BookDetails />}></Route>
				<Route path='*' element={<NotFound/>} />
			</Routes>
			
		 </Content>
		 <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24,
      }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
	  </Layout>
	<Footer style={{ textAlign: 'center' }}>
	  Cantinhode.net ©{new Date().getFullYear()} Created by Pedro Martins
	</Footer>
  </Layout>
	);
}

export default App

