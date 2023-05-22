import { useNavigate } from 'react-router-dom';
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

const emailRegex = /^[\w-]+(.[\w-]+)@([\w-]+.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// //이메일 유효성 검사
// const validateEmail = (email) => {
//   if (!emailRegex.test(email)) {
//     return '올바른 이메일 형식이 아닙니다.';
//   } else {
//     return '';
//   }
// };
// // 비밀번호 유효성 검사
// const validatePassword = (password, confirmPassword) => {
//   if (!passwordRegex.test(password)) {
//     return '비밀번호는 영문, 숫자 포함 8글자 이상이어야합니다.';
//   }
//   return '';
// };

const NewLogin = function NewLogin() {
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
      console.log(1);
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

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axiosInstance
        .post('api/members/login', values)
        .then((response) => {
          const token = response.headers.authorization;

          if (token) {
            const decoded = jwt_decode(token);

            const user = {
              email: decoded.email,
              nickname: decoded.nickname,
              memberId: decoded.memberId,
            };

            sessionStorage.setItem('user', JSON.stringify(user)); // 세션스토리지에 user정보 저장
            sessionStorage.setItem('jwt', token); // sessionStorage에 토큰 저장

            dispatch(login(user));
            alert(`${user.nickname}님, 식사는 잡쉈어?`);
            navigate('api/boards');
          } else if (!token) {
            alert('인증정보를 받아오지 못했습니다.');
            navigate('/');
          }
        })
        .catch((error) => {
          alert('이메일과 비밀번호가 맞게 작성됐는지 확인하세요.');
          console.error('로그인 에러:', error);
        });
    },
    [dispatch, navigate, values]
  );

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
            onChange={handlePasswordChange}
          />
          {passwordRegex.test(values.password) ||
          values.password === '' ? null : (
            <Error>{messages.passwordError}</Error>
          )}
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
