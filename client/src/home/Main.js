import { MainWrap } from '../style/HomeStyle';
import Header from './Header';
import Footer from './Footer';
import Days from './Days';

const Main = () => {
  return (
    <MainWrap>
      <Header></Header>
      <Days></Days>
      <Footer></Footer>
    </MainWrap>
  );
};

export default Main;
