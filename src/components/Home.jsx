import react, { useState } from 'react'
import BookList from './BookList';
import Input from './Input';
import Navbar from './Navbar';
import { Circles } from 'react-loader-spinner';
import { Breadcrumb, Layout, Menu, Image   } from 'antd';

const { Header, Content, Footer } = Layout;
import Intro from './Intro';
const Home = () => {
	

	return (
			<>
			<Content>
      <Intro></Intro>
      
	
      </Content>
			</>
	);
}

export default Home;
