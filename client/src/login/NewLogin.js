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

import { useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../axiosConfig';

const emailRegex = /^[\w-]+(.[\w-]+)@([\w-]+.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const NewLogin = memo(function NewLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [msgs, setMsgs] = useState({
    emailError: '',
    emailMsg: '',
    passwordError: '',
    accessError: '',
    fetchError: '',
  });

  const handleEmailChange = useCallback((e) => {
    console.log(1);
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handlePasswordChange = useCallback(
    (e) => {
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));

      if (!passwordRegex.test(values.password)) {
        setMsgs((prev) => ({
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
            alert('이메일과 비밀번호가 맞게 작성됐는지 확인하세요.');
            navigate('/');
          }
        })
        .catch((error) => {
          setMsgs((prev) => ({
            ...prev,
            fetchError: '연결이 잘못되었습니다.',
          }));
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
            onChange={handleEmailChange}
          />
          {emailRegex.test(values.email) ? (
            <Error>{msgs.emailMsg}</Error>
          ) : (
            <Error>{msgs.emailError}</Error>
          )}
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handlePasswordChange}
          />
          <LoginButton type="submit">Login</LoginButton>
          <Error>{msgs.accessError}</Error>
        </LoginForm>
        <FooterText>아직 식구가 아니세요?</FooterText>
        <StyledLink to="/signup">지금 바로 여기를 눌러 가입하세요.</StyledLink>
      </LoginContainer>
    </>
  );
});

export default NewLogin;
