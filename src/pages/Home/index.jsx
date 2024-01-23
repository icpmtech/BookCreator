import React from 'react';
import { Layout, Card, Button } from 'antd';
const { Content } = Layout;
const { Meta } = Card;
import slide1 from '../../img/00.svg'
import { ButtonStyled, ImageStyled } from './styles';
import {
	AppstoreOutlined,
	
} from '@ant-design/icons';
export default function Home(currentUser) {
    return (
        <Content style={{ textAlign: 'center', backgroundColor: 'black' }} >
            {!currentUser == null && (<Content style={{ backgroundColor: 'black' }} >
                <ImageStyled>
                    <img width={500} src={slide1} alt="Presentingt the AI Content Editor" />
                </ImageStyled>
            </Content>)}
            {currentUser != null && (<Content style={{ height: '70vh', backgroundColor: 'black' }} >
                <img width={500} src={slide1} alt="Presentingt the AI Content Editor" />
                <Content style={{ top: 0, backgroundColor: 'black' }} >
                    <Button  icon={<AppstoreOutlined />} size={'large'} style={{
                    }} type='primary' href="/plans">Choose your Plan</Button>
                </Content>
            </Content>)}
        </Content>
        
    );
}
