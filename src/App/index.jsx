import { BrowserRouter as Router, Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import React, { useState } from 'react'
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import UpdateProfile from '../pages/UpdateProfile';
import PythonCodeEditor from '../components/AssistantCode/Python/PythonCodeEditor';
import NotFound from '../components/NotFound';
import Books from '../components/ContentGenerator/Books/Book';
import BlogPosts from '../components/ContentGenerator/Blogs/BlogPosts';
import Article from '../components/ContentGenerator/Articles/Article';
import { theme, Layout, Avatar, FloatButton, Space } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { LogoAnimation,DivStyled } from './styles';
const { Header, Content, Footer, Sider } = Layout;
import {
    MailOutlined,
    UserOutlined,
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

export default function App() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  
    const { currentUser, logOut } = useAuth();
    const [loading, setLoading] = useState(false);

    async function handleLogOut() {
        setLoading(true);
        try {
            await logOut();

            MyToast('success', 'LogOut successfully completed!', '#61dafb');

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            console.error(err);
            MyToast('error', 'Failed to Log Out!', '#a00000');
        } finally {
            setLoading(false);
            return;
        }
    }

    return (
        <Layout>
            <Header style={{ color: 'rgb(97, 218, 251)', display: 'flex', alignItems: 'center' }}>
                <DivStyled className="demo-logo hidden lg:block "> <h2 className=' hidden lg:block'><LogoAnimation /> AI Content Generator &nbsp; </h2></DivStyled>
                {currentUser && (<Menu  
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}>

                </Menu>
                )}
            </Header>
            <Layout
            >
                {currentUser && (<Sider   breakpoint="lg"
        collapsedWidth="0"   >
                    <Menu
                        theme="dark"
                        
                        mode="inline"
                        items={items}
                    >
                    </Menu>

                </Sider>)}
                <Content style={{
                    overflow: 'auto',
                }}>

                    {currentUser && (<Menu
                        mode="horizontal">
                        <MenuItem onClick={handleLogOut} >
                            <Space wrap >
                                <a href='/update-profile'><UserOutlined /> {currentUser?.email}</a>
                            </Space>
                        </MenuItem>
                        <MenuItem>
                            <Button icon={<UserOutlined />} title="LogOut" onClick={handleLogOut} disabled={loading} >LogOut</Button>
                        </MenuItem>
                    </Menu>
                    )}
                    <Router>
                        <RouterRoutes>
                            <Route path='/books' element={  <PrivateRoute><Books /></PrivateRoute>}></Route>
                            <Route path='/articles' element={  <PrivateRoute><Article /></PrivateRoute>}></Route>
                            <Route path='/blogposts' element={ <PrivateRoute><BlogPosts /></PrivateRoute>}></Route>
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
