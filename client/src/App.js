import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
import Login from './login/Login';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Main from './home/Main';
import { useEffect, useState } from 'react';
import { login } from './store/userSlice';
import Signup from './Signup/Signup';
import Map from './map/Map';
import MyPage from './mypage/MyPage';
import EditProfile from './mypage/EditProfile';
import UserState from './mypage/UserState';
import UserPage from './mypage/UserPage';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('jwt');
    if (storedUser && storedToken) {
      dispatch(login(storedUser));
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
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/api/boards" /> : <Login />
            }
          />
          {/* <Route path="/boards" element={<PrivateRoute />}>
            <Route index element={<Main />} />
          </Route> */}
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
          <Route path="/mypage/:userId" element={<UserPage />}>
            <Route index element={<UserState />} />
          </Route>
          {/* <Route path="/main" element={<Main />} /> */}
          <Route path="api/boards" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/state" element={<UserState />} />
          <Route path="/members/:userId" element={<UserPage />} />
        </Routes>
      </GlobalWrap>
    </>
  );
}

export default App;
