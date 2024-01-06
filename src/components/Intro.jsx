import React from 'react';
import { Carousel, Layout, Menu, Image   } from 'antd';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
import CardHome from './CardHome';
import CardHome2 from './CardHome2';
const Intro = () => {
  
  return (
    <Carousel autoplay >
      <div>
      <CardHome></CardHome>
      </div>
      <div>
      <CardHome2></CardHome2>
      </div>
    </Carousel>
  );
};
export default Intro;