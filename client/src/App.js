import './App.css';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
import Login from './login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './home/Main';
import Map from './map/Map';

function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalWrap>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/boards" element={<Main />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </Router>
      </GlobalWrap>
    </>
  );
}

export default App;
