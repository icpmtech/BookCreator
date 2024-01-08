import React from 'react';
import { Layout, Card, Button, Flex, Col, Space,QRCode  } from 'antd';
const { Content } = Layout;
const { Meta } = Card;
import { MainStyled } from './styles';
export default function Plans() {
    return (
        
            <Content style={{padding: 20,height:'100%',  textAlign: 'center',backgroundColor:'rgb(248 120 205)' }} >
                <Space  style={{ padding:20,fontSize:30,  textAlign: 'center', }} >
                    <h1 >Choose a plan that suits your content creation needs</h1>
                    </Space>
                <Space  direction="horizontal" style={{  textAlign: 'center', }}  >
                    <Card   title="START 10€/mo">
                        <p>Run create your content with AI efficiently with all the basics you need
                            <ul>
                                <li>100 prompts books content writer</li>
                                <li>100 prompts code assist writer</li>
                                <li>100 prompts articles content writer</li>
                                <li>General 300 credits in your account GROW plan</li>
                            </ul>
                        </p>
                        <QRCode
    errorLevel="H"
    value="https://cantinhode.net/products/plan-starter"
    icon="https://cantinhode.net/cdn/shop/files/AIContentEditor_885e18db-2b4f-4fb6-a5a5-fc3db57173c4.svg"
  />
                        <Button href='https://cantinhode.net/products/plan-starter' style={{ top:10 }}  type='primary'>Buy Now</Button>
                    </Card>

                    <Card className="item"  title="GROW 20€/mo" >
                        <p>Run create your content with AI efficiently with all the basics you need
                            <ul>
                                <li>100 prompts books content writer</li>
                                <li>100 prompts code assist writer</li>
                                <li>100 prompts articles content writer</li>
                                <li>General 300 credits in your account GROW plan</li>
                            </ul>
                        </p>
                        <QRCode 
    errorLevel="H"
    value="https://cantinhode.net/products/plan-grow"
    icon="https://cantinhode.net/cdn/shop/files/AIContentEditor_885e18db-2b4f-4fb6-a5a5-fc3db57173c4.svg"
  />
                        <Button  href='https://cantinhode.net/products/plan-grow' style={{ top:10 }} type='primary'>Buy Now</Button>
                    </Card>

                    <Card className="item" title="EXPAND 50€/mo" >
                        <p>Run create your content with AI efficiently with all the basics you need
                            <ul>
                                <li>100 prompts books content writer</li>
                                <li>100 prompts code assist writer</li>
                                <li>100 prompts articles content writer</li>
                                <li>General 300 credits in your account EXPAND plan</li>
                            </ul>
                        </p>
                        <QRCode
    errorLevel="H"
    value="https://cantinhode.net/products/plan-expand"
    icon="https://cantinhode.net/cdn/shop/files/AIContentEditor_885e18db-2b4f-4fb6-a5a5-fc3db57173c4.svg"
  />
                        <Button href='https://cantinhode.net/products/plan-expand' style={{ top:10 }} type='primary'>Buy Now</Button>
                    </Card>
                </Space>
            </Content>
       

    );
}
