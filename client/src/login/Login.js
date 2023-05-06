/*eslint-disable */

import { Link, useNavigate } from 'react-router-dom';
import { LoginForm, Input, LoginButton } from '../style/LoginStyle';
import axios from 'axios';
import { useState } from 'react';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };

  const loginUser = (email, password) => {
    axios
      .get('http://localhost:5000/users', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.length > 0) {
          console.log('로그인 잘 됨');
        }
      })
      .catch((error) => {
        console.log('보지 말아야할 것을 보고야 말았다.');
        setError('Something going wrong...');
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('The email is not a valid email address.');
      return null;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      return null;
    }

    await loginUser(email, password);
  };

  return (
    <>
      <LoginForm>
        <div>
          <img src="/Logo2.png" alt="식구 로고2" />
        </div>
        <Input
          error={error}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Username" required />

        <Input
        error={error}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" required />
          {error && <Error>{ error }</Error>}
        <LoginButton type="submit" to="/boards">
          Login
        </LoginButton>
      </LoginForm>
    </>
  );
};

export default Login;
