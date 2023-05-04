import styled from 'styled-components';
// import Main from '../home/Main';
import { Link } from 'react-router-dom';

const LoginButton = styled.button`
  height: 50px;
  width: 50px;
  border: 1px solid black;
`;

const Login = () => {
  return (
    <>
      <LoginButton>
        <Link to="/boards">Login</Link>
      </LoginButton>
    </>
  );
};

export default Login;
