import react, { useState } from 'react'
import BookList from './BookList';
import Input from './Input';
import Navbar from './Navbar';
import UseFetch from './UseFetch';
import { Circles } from 'react-loader-spinner';
import { Breadcrumb, Layout, Menu, Image   } from 'antd';

const { Header, Content, Footer } = Layout;
const Home = () => {
	

	return (
			<>
			<Content>
        <div  className='text-center'
         
        >
          <Image
    width={600}
    src="https://cantinhode.net/cdn/shop/files/1.jpg?v=1702003681&width=900"
  />
        </div>
	
      </Content>
			</>
	);
}

export default Home;
