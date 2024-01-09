import { BrowserRouter as Router, Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react'
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import UpdateProfile from '../pages/UpdateProfile';
import PythonCodeEditor from '../components/AssistantCode/Python/PythonCodeEditor';
import ReactCodeEditor from '../components/AssistantCode/React/ReactCodeEditor';
import CSharpCodeEditor from '../components/AssistantCode/CSharp/CSharpCodeEditor';
import AngularCodeEditor from '../components/AssistantCode/Angular/AngularCodeEditor';
import SQLCodeEditor from '../components/AssistantCode/SQL/SQLCodeEditor';
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
import { items,itemsPublic } from '../items';
import MyToast from '../components/MyToast';
import { useAuth } from '../Context/AuthContext';
import MenuItem from 'antd/es/menu/MenuItem';
import "./App.css"
import ContactUs from '../pages/ContactUs';
import Plans from '../pages/Plans';
import HomePrivate from '../pages/HomePrivate';
import Email from '../components/ContentGenerator/Email/Email';
import ProjectBook from '../components/Projects/Books/Books';
import ProjectEmail from '../components/Projects/Emails/Emails';
import ProjectBlogPost from '../components/Projects/BlogPosts/BlogPosts';
import ProjectArticle from '../components/Projects/Articles/Articles';
import ProjectLesson from '../components/Projects/Lessons/Lessons';
export default function App() {
  
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [selectedKey, setSelectedKey] = useState(items.find(_item => location?.pathname?.startsWith(_item.key))?.key)

    const onClickMenu = (item) => {
      const clicked = items.find(_item => _item.key === item.key)
      history.push(clicked.key)
    }
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
    useEffect(() => {
        items.find(_item => {
        
            if(_item?.children)
            { 
                let value= _item?.children.find(item =>location?.pathname===item?.label?.props?.href);
                setSelectedKey(value);
            }
           else if(location?.pathname===_item?.label?.props?.href)
            {
                setSelectedKey(_item);
                return;
            }
           
       });
      
      }, [location])
    return (
        <Layout>
            <Header style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                <DivStyled className="demo-logo hidden lg:block "> <h2 className=' hidden lg:block'><LogoAnimation /> AI Content Editor &nbsp; </h2></DivStyled>
                {currentUser && (<Menu  
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey?.key]}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}>

                </Menu>
                )}
               {!currentUser &&  (<Menu  
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey?.key]}
                    items={itemsPublic}
                    style={{ flex: 1, minWidth: 0 }}>

                </Menu>)}
            </Header>
            <Layout
            >
                {currentUser && (<Sider   breakpoint="lg"
        collapsedWidth="0"   >
                    <Menu onClick={onClickMenu}
                        theme="dark"
                        selectedKeys={[selectedKey?.key]}
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
                        <MenuItem  >
                            <Space wrap >
                                <p><ContainerOutlined /> Credits:300</p>
                            </Space>
                        </MenuItem>
                        <MenuItem  >
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
                            <Route path='/emails' element={  <PrivateRoute><Email /></PrivateRoute>}></Route>
                            <Route path='/articles' element={  <PrivateRoute><Article /></PrivateRoute>}></Route>
                            <Route path='/blogposts' element={ <PrivateRoute><BlogPosts /></PrivateRoute>}></Route>
                            <Route path='*' element={<NotFound />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/contact-us" element={<ContactUs />} />
                            <Route path="/plans" element={<Plans />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route
                                path="/"
                                element={
                                        <Home currentUser={currentUser} />
                                }
                            />
                           
                             <Route
                                path="/home-private"
                                element={
                                    <PrivateRoute><HomePrivate currentUser={currentUser} /></PrivateRoute>
                                   
                                }
                            />
                           
                            <Route path="/code-assistant-python" element={
                                <PrivateRoute>
                                    <PythonCodeEditor />
                                </PrivateRoute>} />
                           
                              <Route path="/code-assistant-react" element={
                                <PrivateRoute>
                                    <ReactCodeEditor />
                                </PrivateRoute>} />
                              <Route path="/code-assistant-angular" element={
                                <PrivateRoute>
                                    <AngularCodeEditor />
                                </PrivateRoute>} />
                              <Route path="/code-assistant-csharp" element={
                                <PrivateRoute>
                                    <CSharpCodeEditor />
                                </PrivateRoute>} />
                                <Route path="/code-assistant-sql" element={
                                <PrivateRoute>
                                    <SQLCodeEditor />
                                </PrivateRoute>} />
                                <Route path="/project-books" element={
                                <PrivateRoute>
                                    <ProjectBook />
                                </PrivateRoute>} />

                                <Route path="/project-articles" element={
                                <PrivateRoute>
                                    <ProjectArticle />
                                </PrivateRoute>} />

                                <Route path="/project-blogposts" element={
                                <PrivateRoute>
                                    <ProjectBlogPost />
                                </PrivateRoute>} />

                                <Route path="/project-emails" element={
                                <PrivateRoute>
                                    <ProjectEmail />
                                </PrivateRoute>} />

                                <Route path="/project-lessons" element={
                                <PrivateRoute>
                                    <ProjectLesson />
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
