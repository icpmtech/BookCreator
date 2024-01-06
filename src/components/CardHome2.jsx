import React from 'react';
import { Card, Space,Image } from 'antd';
import slide5 from '../img/5.svg'
import slide6 from '../img/6.svg'
import slide7 from '../img/7.svg'

const { Meta } = Card;
const CardHome2 = () => (
  <Space direction="horizontal"  size={60}>
    <Card
     hoverable
     style={{   textAlign: 'center', width: 500 }}
    >
      
      <Image src={slide5} alt="Slide 5 Prompp Engineering"/>
     <Meta title="The Super Coder Academy" description="www.thesupercoder.com" />
    </Card>
    <Card
     hoverable
     style={{   textAlign: 'center', width: 500 }}
    >
     <Image src={slide6} alt="Slide 6 Prompp Engineering"/>
     <Meta title="The Super Coder Academy" description="www.thesupercoder.com" />
    </Card>
    <Card
     hoverable
     style={{   textAlign: 'center', width: 500 }}
    >
    <Image src={slide7} alt="Slide 7 Prompp Engineering"/>
     <Meta title="The Super Coder Academy" description="www.thesupercoder.com" />
    </Card>
  </Space>
);
export default CardHome2;