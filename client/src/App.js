import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
import Login from './login/Login';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Main from './home/Main';
import { useEffect, useState } from 'react';
import { login } from './store/userSlice';
import Signup from './Signup/Signup';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUSer = sessionStorage.getItem('user');
    if (storedUSer) {
      dispatch(login(JSON.parse(storedUSer)));
    }
    setLoading(false);
  }, [dispatch]);

  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <GlobalStyle />
      <GlobalWrap>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/boards" element={<PrivateRoute />}>
            <Route index element={<Main />} />
          </Route>
        </Routes>
      </GlobalWrap>
    </>
  );
}

export default App;
