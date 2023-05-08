import { MainWrap } from './HomeStyle';
import Header from './Header';
import Boards from './Boards';
import Footer from './Footer';
import Days from './Days';

const Main = () => {
  return (
    <MainWrap>
      <Header></Header>
      <Days></Days>
      <Boards></Boards>
      <Footer></Footer>
    </MainWrap>
  );
};

export default Main;
