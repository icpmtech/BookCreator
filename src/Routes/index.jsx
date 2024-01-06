import { BrowserRouter as Router, Route, Routes as RouterRoutes } from 'react-router-dom';
import React, { useState } from 'react'
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import UpdateProfile from '../pages/UpdateProfile';
import PythonCodeEditor from '../components/PythonCodeEditor';
import BookDetails from '../components/BookDetails';
import NotFound from '../components/NotFound';
import Books from '../components/Book';
import Blogposts from '../components/BlogPosts';
import { theme , Layout, FloatButton } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
import {
	MailOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import { Button, Divider, Menu, Switch } from 'antd';
import { items } from '../items';
import MyToast from '../components/MyToast';
import { useAuth } from '../Context/AuthContext';
import MenuItem from 'antd/es/menu/MenuItem';

export default function Routes() {
    const {
		token: { colorBgContainer, borderRadiusLG },
	  } = theme.useToken();
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	const { currentUser, logOut } = useAuth();
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
    return (
        <Layout>
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
                <Router>
            <RouterRoutes>
                <Route path='/books' element={<Books />}></Route>
                <Route path='/blogposts' element={<Blogposts />}></Route>
                <Route path='Books/:id' element={<BookDetails />}></Route>
                <Route path='*' element={<NotFound />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/code-assistant-python" element={ 
                <PrivateRoute>
                    <PythonCodeEditor />
                </PrivateRoute>} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/update-profile"
                    element={
                        <PrivateRoute>
                            <UpdateProfile />
                        </PrivateRoute>
                    }
                />
            </RouterRoutes>
        </Router>

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
