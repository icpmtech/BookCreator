import React from 'react';
import { Card, Space,Image } from 'antd';
import slide1 from '../img/1.svg'
import slide2 from '../img/2.svg'
import slide3 from '../img/3.svg'
import slide4 from '../img/4.svg'

const { Meta } = Card;
const CardHome = () => (
  <Space direction="horizontal"  size={60}>
    <Card
     hoverable
     style={{   textAlign: 'center', width: 500 }}
    >
      
      <Image  src={slide1} alt="Slide 1 Prompp Engineering"/>
     <Meta title="The Super Coder Academy" description="www.thesupercoder.com" />
    </Card>
    <Card
     hoverable
     style={{   textAlign: 'center', width: 500 }}
    >
     <Image src={slide2} alt="Slide 2 Prompp Engineering"/>
     <Meta title="The Super Coder Academy" description="www.thesupercoder.com" />
    </Card>
    <Card
     hoverable
     style={{   textAlign: 'center', width: 500 }}
    >
    <Image src={slide3} alt="Slide 3 Prompp Engineering"/>
     <Meta title="The Super Coder Academy" description="www.thesupercoder.com" />
    </Card>
    <Card
     hoverable
     style={{   textAlign: 'center', width: 500 }}
    >
     <Image src={slide4} alt="Slide 4 Prompp Engineering"/>
     <Meta title="The AI Content Generator" description="www.thesupercoder.com" />
    </Card>
  </Space>
);
export default CardHome;