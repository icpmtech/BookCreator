import { Layout,    } from 'antd';
const {  Content } = Layout;
import Intro from '../../components/Intro';
export default function Home() {
    return (
             <>
            <Content>
      <Intro></Intro>
      </Content>
            </>
       
    );
}
