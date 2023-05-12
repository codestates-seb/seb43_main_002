import './App.css';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
import Login from './login/Login';
import { Routes, Route } from 'react-router-dom';
import Main from './home/Main';
import Map from './map/Map';
import MyPage from './mypage/MyPage';
import EditProfile from './mypage/EditProfile';
import UserState from './mypage/UserState';

function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalWrap>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/boards" element={<Main />} />
          <Route path="/map" element={<Map />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/state" element={<UserState />} />
        </Routes>
      </GlobalWrap>
    </>
  );
}

export default App;
