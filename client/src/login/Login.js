/*eslint-disable */

import { Link, useNavigate } from 'react-router-dom';
import { LoginForm, Input, LoginButton } from '../style/LoginStyle';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users', {
        params: {
          email,
          password,
        },
      });

      if (response.data.length > 0) {
        alert('로그인 성공!');
      } else {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  return (
    <LoginForm>
      <h1>Login</h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton onClick={handleLogin}>Login</LoginButton>
    </LoginForm>
  );
};

export default Login;
