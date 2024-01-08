import { Layout, Card, Button,Form,Input } from 'antd';
const { Content } = Layout;
const { Meta } = Card;
export default function ContactUs() {
    return (
        <Content>
          <Card  >
            <h2>Send  your question:</h2>
          <Form  name="contact" netlify>
  <Form.Item label="Name"> <Input type="text" name="name" /></Form.Item>
  <Form.Item label="Email"> <Input type="email" name="email" /></Form.Item>
  <Form.Item label="Message"> <Input type="textarea" name="message" /></Form.Item>
    <Button style={{ color:'white',backgroundColor:'blue'}} type="submit">Send</Button>
</Form>
          </Card>
          
        </Content>
    );
}
