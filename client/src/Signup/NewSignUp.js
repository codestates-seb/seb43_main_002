import {
  SignupContainer,
  BackYellow,
  SignupForm,
  Input,
  SignupTitle,
  SignupButton,
  CheckDuplicateButton,
  CheckPasswordButton,
  Text,
  FooterText,
  StyledLink,
  StyledLogo,
  Mobile,
  GenderButton,
  GenderBox,
  BackGround,
  LogoContainer,
  Error,
} from '../style/SignupStyle';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../style/EditProfileStyle';
import axiosInstance from '../axiosConfig';

const emailRegex = /^[\w-]+(.[\w-]+)@([\w-]+.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const NewSignup = () => {
  const [values, setValues] = useState({
    email: '',
    nickname: '',
    name: '',
    password: '',
    confirmPassword: '',
    gender: null,
    birthday: '',
  });

  const [errrors, setErrors] = useState({
    emailError: '',
    nicknameError: '',
    passwordError: '',
    fetchError: '',
  });

  const navigate = useNavigate();

  const nameIcon = '/svg/join-name.svg';
  const introIcon = '/svg/join-intro.svg';
  const dateIcon = '/svg/join-date.svg';
  const genderIcon = '/svg/join-gender.svg';
  const mailIcon = '/svg/join-mail.svg';
  const pwdIcon = '/svg/join-password.svg';

  const handleInputchange = useCallback((e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === nickname && e.target.value.length > 9) {
      setErrors((prev) => ({
        ...prev,
        lengthError: '8글자까지 입력이 가능합니다.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lengthError: '',
      }));
    }
  }, []);

  const handleCheckDuplicateEmail = useCallback(() => {
    if (!emailRegex.test(values.email)) {
      setErrors((prev) => ({
        ...prev,
        emaillError: '올바른 이메일 형식이 아닙니다.',
      }));
      return null;
    }
    // 이메일 유효성 테스트 끝, 이제 할일은 로그인 중복여부 검사.
    axiosInstance
      .post('api/members/signup/checkduplicateemail', {
        email: values.email,
      })
      .then((response) => {
        if (response.data === false) {
          alert('사용 가능한 이메일입니다.');
          console.log('사용 가능한 이메일');
        } else if (response.data === true) {
          alert('이미 사용중인 메일입니다.');
        }
      })
      .catch((error) => {
        setErrors((prev) => ({
          ...prev,
          fetchError: '인터넷 연결을 확인하세요.',
        }));
        console.log('로그인 중복 검사 서버랑 통신 실패', error);
      });
  }, [values.email]);
  //dependency에서 values.email이 바뀔 때만 리렌더링하게 바꿔줌(useCallback()사용)

  // 이메일 검증 파트 끝 이제 이메일 유효성 검사, 이메일 중복 검사는 위 로직에서 전부 돌 것이다.
  // 이제 닉네임 파트를 작성해보자. 아마도 이메일과 크게 다르지 않을 것 같음
  const handleCheckDuplicateNickname = useCallback(() => {
    // 닉네임 중복여부 검사.
    axiosInstance
      .post('api/members/signup/checkduplicatenickname', {
        email: values.nickname,
      })
      .then((response) => {
        if (response.data === false) {
          alert('사용 가능한 활동명입니다.');
          console.log('사용 가능한 활동명');
        } else if (response.data === true) {
          alert('이미 사용중인 활동명입니다.');
          console.log('사용 못하는 활동명');
        }
      })
      .catch((error) => {
        setErrors((prev) => ({
          ...prev,
          fetchError: '인터넷 연결을 확인하세요.',
        }));
        console.log('활동명 중복 검사 서버랑 통신 실패', error);
      });
  }, [values.nickname]);
  // 비밀번호 입력 로직

  return;
};
