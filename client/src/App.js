import './App.css';
import { useSelector } from 'react-redux';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
import Login from './login/Login';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Main from './home/Main';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
      <GlobalStyle />
      <GlobalWrap>
        <Routes>
          <Route path="/" element={<Login />} />
<<<<<<< HEAD
          <Route path="/boards" element={<Main />} />
=======
          <Route path="/boards" element={<PrivateRoute />}>
            <Route index element={<Main />} />
          </Route>
>>>>>>> dab45af8c88710136c17d9e6e2e3309a84b9d53c
        </Routes>
      </GlobalWrap>
    </>
  );
}

export default App;
