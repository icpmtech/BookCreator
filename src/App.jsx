import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Home from './components/Home'
import { Routes, Route, Link } from 'react-router-dom'
import PythonCodeEditor from './components/PythonCodeEditor';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound';
import Books from './components/Book';
import Blogposts from './components/BlogPosts';
import { theme , Layout, FloatButton } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
export const withRouter = (Component) => {
	const Wrapper = (props) => {
		const history = useNavigate();
		return <Component history={history} {...props} />
	}
	return Wrapper;
}
import {
	MailOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import { Button, Divider, Menu, Switch } from 'antd';
import { items } from './items';
import MyToast from './components/MyToast';
import { useAuth } from './Context/AuthContext';
import MenuItem from 'antd/es/menu/MenuItem';
const ContentGeneratorApp = () => {
	
	const {
		token: { colorBgContainer, borderRadiusLG },
	  } = theme.useToken();
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	const { currentUser, logOut } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handleLogOut() {
        setLoading(true);
        try {
            await logOut();

            MyToast('success', 'LogOut realizado com sucesso!', '#61dafb');

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            console.error(err);
            MyToast('error', 'Falha ao realizar o LogOut!', '#a00000');
        } finally {
            setLoading(false);
            return;
        }
    }
	const routes = <Routes>
		<Route path='/' element={<Home />}></Route>
		<Route path='/code-assistant-python' element={<PythonCodeEditor />}></Route>
		<Route path='/books' element={<Books />}></Route>
		<Route path='/blogposts' element={<Blogposts />}></Route>
		<Route path='*' element={<NotFound />} />
	</Routes>;
	return (<Layout>
		 <Header style={{ color:'white', display: 'flex',  alignItems: 'center' }}>
        <div className="demo-logo"><h1>Content Generator</h1></div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}>
			
        </Menu>
		
      </Header>
		<Layout
		>
			<Sider  trigger={null} collapsible collapsed={collapsed} >
				<Menu
				theme="dark"
					inlineCollapsed={collapsed}
					mode="inline"
					items={items}
				>
				</Menu>
				
			</Sider>
			<Content style={{
				overflow: 'auto',
			}}>
				<Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 32,
            }}
          />
          <Menu  
          mode="horizontal">
					<MenuItem>
					<Button type='text' icon={<MenuUnfoldOutlined />}
               title="Atualizar Perfil"
               onClick={() => navigate('/update-profile')}
           />
		    <p>{currentUser.email}</p>
					</MenuItem>
					<MenuItem>
					<Button icon={<MenuUnfoldOutlined />}  type='text' title="LogOut" onClick={handleLogOut} disabled={loading} />
					</MenuItem>
					
				</Menu>
				{routes}

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

export default ContentGeneratorApp

