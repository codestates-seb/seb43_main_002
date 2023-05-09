import './App.css';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
import Login from './login/Login';
import { Routes, Route } from 'react-router-dom';
import Main from './home/Main';

function App() {
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
