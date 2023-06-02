import {
  LoginContainer,
  LoginForm,
  LoginTitle,
  Input,
  LoginButton,
  Error,
  FooterText,
  StyledLink,
  LogoContainer,
  BackGround,
  StyledLogo,
  BackYellow,
} from '../style/LoginStyle';

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[\w-]+(.[\w-]+)@([\w-]+.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const NewLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [messages, setMessages] = useState({
    emailError: '',
    emailMessage: '',
    passwordError: '',
    accessError: '',
    fetchError: '',
  });

  const inputChangeHanlder = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailChange = useCallback(
    (e) => {
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));

      if (!emailRegex.test(values.email)) {
        setMessages((prev) => ({
          ...prev,
          emailError: '올바른 이메일 형식이 아닙니다.',
        }));
      }
    },
    [values.email]
  );

  const handlePasswordChange = useCallback(
    (e) => {
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));

      if (!passwordRegex.test(values.password)) {
        setMessages((prev) => ({
          ...prev,
          passwordError: '비밀번호는 영문, 숫자 포함 8글자 이상이어야 합니다.',
        }));
      }
    },
    [values.password]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post('/api/members/login', values)
      .then((response) => {
        const token = response.headers.authorization;
        if (token) {
          const decoded = jwt_decode(token);
          console.log(response.headers.authorization);
          const user = {
            email: decoded.email,
            nickname: decoded.nickname,
            memberId: decoded.memberId,
          };

          sessionStorage.setItem('user', JSON.stringify(user)); // 세션스토리지에 user정보 저장
          sessionStorage.setItem('jwt', token); // sessionStorage에 토큰 저장

          dispatch(login(user));
          alert(`${user.nickname}님, 식사는 잡쉈어?`);
          navigate('/api/boards');
        } else if (!token) {
          alert('인증정보를 받아오지 못했습니다.');
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status >= 500) {
          setServerError(true);
        } else {
          alert('이메일과 비밀번호가 맞게 작성됐는지 확인하세요.');
        }
        console.error('로그인 에러:', error);
      });
  };

  // const responseGoogle = (response) => {
  //   console.log(response);
  //   axiosInstance
  //   .get()
  // };

  const [serverError, setServerError] = useState(false);

  return (
    <>
      <BackGround>
        <BackYellow />
      </BackGround>
      <LogoContainer>
        <StyledLogo />
      </LogoContainer>
      <LoginContainer>
        <LoginTitle>Sign in now</LoginTitle>
        <LoginForm onSubmit={handleSubmit} noValidate>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={inputChangeHanlder}
            onBlur={handleEmailChange}
          />
          {emailRegex.test(values.email) || values.email === '' ? null : (
            <Error>{messages.emailError}</Error>
          )}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={inputChangeHanlder}
            onBlur={handlePasswordChange}
          />
          {passwordRegex.test(values.password) ||
          values.password === '' ? null : (
            <Error>{messages.passwordError}</Error>
          )}
          {serverError && <Error>서버 유지보수 중입니다.</Error>}
          <LoginButton type="submit">Login</LoginButton>
          <Error>{messages.accessError}</Error>
        </LoginForm>
        <FooterText>아직 식구가 아니세요?</FooterText>
        <StyledLink to="/signup">지금 바로 여기를 눌러 가입하세요.</StyledLink>
      </LoginContainer>
    </>
  );
};

export default NewLogin;
