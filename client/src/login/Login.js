import { useNavigate } from 'react-router-dom';
import {
  LoginForm,
  Input,
  LoginButton,
  GoogleLogo,
  GoogleLoginButton,
} from '../style/LoginStyle';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .get('/users', {
        params: {
          email,
          password,
        },
      })
      .then((response) => {
        const user = response.data.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          dispatch(login(user));
          alert('로그인 성공!');
          navigate('/boards');
        } else {
          setError('이메일 또는 비밀번호가 잘못되었습니다.');
        }
      })
      .catch((error) => {
        setError('연결이 잘못되었습니다.');
        console.error('로그인 에러:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
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
      <p>{error}</p>
      <LoginButton type="submit">Login</LoginButton>
      <GoogleLoginButton>
        <GoogleLogo />
        구글로 로그인
      </GoogleLoginButton>
    </LoginForm>
  );
};

export default Login;
