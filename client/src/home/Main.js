import { MainWrap } from './HomeStyle';
import Header from './Header';
import Boards from './Boards';
import Footer from './Footer';
import Days from './Days';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

const Main = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <MainWrap>
      <Header>
        <button onClick={handleLogout}>로그아웃</button>
      </Header>
      <Days></Days>
      <Boards></Boards>
      <Footer></Footer>
    </MainWrap>
  );
};

export default Main;
