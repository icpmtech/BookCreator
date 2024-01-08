import React from 'react';
import { Layout,Card, Button,Image } from 'antd';
const {  Content } = Layout;
const { Meta } = Card;
import slide1 from '../../img/00.svg'
import slide2 from '../../img/2.svg'
import slide3 from '../../img/3.svg'
import slide4 from '../../img/4.svg'
import {ButtonStyled}  from './styles';
export default function Home() {
    return (
             <Content style={{ textAlign: 'center', backgroundColor:'black'}} >
              <ButtonStyled >
              <a style={{color:'white'}} href="/plans">Choose your Plan</a>
              </ButtonStyled>
             <img  src={slide1} alt="Presentingt the AI Content Editor"/>
            
            </Content>
       
    );
}
