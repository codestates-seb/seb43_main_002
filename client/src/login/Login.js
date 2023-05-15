import { useNavigate } from 'react-router-dom';
import {
  LoginForm,
  Input,
  LoginButton,
  ForgotPasswordButton,
  GoogleLoginButton,
  Error,
  GoogleLogo,
} from '../style/LoginStyle';

import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessError, setAccessError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fetchError, setFetchError] = useState('');
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
          sessionStorage.setItem('user', JSON.stringify(user)); // 세션스토리지에 저장
          dispatch(login(user));
          alert('로그인 되었습니다!');
          navigate('/boards');
        } else {
          setAccessError('이메일 또는 비밀번호가 잘못되었습니다.');
        }
      })
      .catch((error) => {
        setFetchError('연결이 잘못되었습니다.');
        console.error('로그인 에러:', error);
      });
  };

  const validationEmail = (email) => {
    return emailRegex.test(email);
  };

  const validationPassword = (password) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validationEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return null;
    }
    if (!validationPassword(password)) {
      setPasswordError(
        '비밀번호는 영문, 숫자를 포함하여 8자리 이상이어야 합니다.'
      );
      return null;
    }
    handleLogin();
  };

  return (
    <LoginForm onSubmit={handleSubmit} noValidate>
      <h1>Login</h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Error>{validationEmail(email) ? null : emailError}</Error>
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Error>{validationPassword(password) ? null : passwordError}</Error>
      <Error>{accessError}</Error>
      <LoginButton type="submit">Login</LoginButton>
      <Error>{fetchError}</Error>
      <ForgotPasswordButton
        type="button"
        onClick={() => {
          navigate('/signup');
        }}
      >
        대충 만든 회원가입 버튼
      </ForgotPasswordButton>
      <GoogleLoginButton type="button">
        <GoogleLogo />
        구글로 로그인
      </GoogleLoginButton>
    </LoginForm>
  );
};

export default Login;
