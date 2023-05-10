import './App.css';
import { GlobalStyle, GlobalWrap } from './style/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
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
