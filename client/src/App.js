import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
// import Login from './login/Login';
import NewLogin from './login/NewLogin';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Main from './home/Main';
import { useEffect, useState } from 'react';
import { login } from './store/userSlice';
// import Signup from './Signup/Signup';
// import NewSignup from './Signup/NewSignUp';
import HomePage from './HomePage';
import NewSignupForm from './Signup/SignupForm';
import Map from './map/Map';
import MyPage from './mypage/MyPage';
import EditProfile from './mypage/EditProfile';
import UserState from './mypage/UserState';
import UserPage from './mypage/UserPage';
// import NaverLoginForm from './login/NaverLogin';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const JsonUser = JSON.parse(storedUser);
    const storedToken = sessionStorage.getItem('jwt');
    if (JsonUser && storedToken) {
      dispatch(login(JsonUser));
    }
    setLoading(false);
  }, [dispatch]);
  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };

  // const myPageId = localStorage.getItem('myPageId');

  // console.log(myPageId);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GlobalStyle />
      <GlobalWrap>
        <Routes>
          {/* 누구나 접근 가능한 페이지 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<NewSignupForm />} />

          {/* 회원만 접근이 가능한 페이지 */}
          <Route path="/login" element={<NewLogin />} />
          <Route path="/map" element={<PrivateRoute />}>
            <Route index element={<Map />} />
          </Route>

          <Route path="/mypage/:userId" element={<PrivateRoute />}>
            <Route index element={<MyPage />} />
          </Route>

          <Route path="/editprofile/:userId" element={<PrivateRoute />}>
            <Route index element={<EditProfile />} />
          </Route>

          <Route path="/state" element={<PrivateRoute />}>
            <Route index element={<UserState />} />
          </Route>

          <Route path="/userpage/:userId" element={<PrivateRoute />}>
            <Route index element={<UserPage />} />
          </Route>

          <Route path="api/boards" element={<PrivateRoute />}>
            <Route index element={<Main />} />
          </Route>
        </Routes>
      </GlobalWrap>
    </>
  );
}

export default App;
