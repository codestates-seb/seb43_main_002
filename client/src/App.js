import './App.css';
import { useSelector } from 'react-redux';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
import Login from './login/Login';
import { Routes, Route } from 'react-router-dom';
import Main from './home/Main';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <GlobalStyle />
      <GlobalWrap>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/boards" element={<Main />} />
        </Routes>
      </GlobalWrap>
    </>
  );
}

export default App;
