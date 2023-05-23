import { MainWrap, HeaderBackWrap } from '../style/HomeStyle';

// import { BackYellow } from '../style/MypageStyle';
import Header from '../mypage/Header';
import Footer from '../mypage/Footer';
import Days from './Days';

const Main = () => {
  return (
    <MainWrap>
      <HeaderBackWrap></HeaderBackWrap>
      <div>
        <Header
          iconSrc="/svg/header-search.svg"
          fnc="search"
          scrollNumber={10}
        />
      </div>
      <Days></Days>
      <Footer activeIcon="boards" />
    </MainWrap>
  );
};

export default Main;
