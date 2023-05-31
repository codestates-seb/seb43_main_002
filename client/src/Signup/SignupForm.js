/* eslint-disable no-debugger */
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
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../style/EditProfileStyle';
import axiosInstance from '../axiosConfig';

const emailRegex = /^[\w-]+(.[\w-]+)@([\w-]+.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// 이메일 유효성 검사
const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  } else {
    return '';
  }
};

const validateNickname = (nickname) => {
  if (!nickname) {
    return '별명을 입력하세요.';
  }
  if (nickname.length < 2 || nickname.length > 10) {
    return '별명은 2자 이상 10자 이하로 입력해주세요.';
  }
  return null;
};

// 비밀번호 유효성 검사
const validatePassword = (password, confirmPassword) => {
  if (!passwordRegex.test(password)) {
    return '비밀번호는 영문, 숫자 포함 8글자 이상이어야합니다.';
  }
  if (password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};

// 이메일, 닉네임 중복 Hook;
const useCheckDuplicate = (
  url,
  value,
  successMessage,
  errorMessage,
  validate
) => {
  const [checkDuplicateBtnActive, setDuplicateBtnActive] = useState(false);
  const [checkDuplicateBtnActive2, setDuplicateBtnActive2] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');

  const checkDuplicate = useCallback(() => {
    // validateFunc이 제공 => 아래 함수 실행, 없다면 건너뛰고 axios;
    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    axiosInstance
      .post(url, { email: value, nickname: value })
      .then((response) => {
        if (!response.data) {
          alert(successMessage);
          setIsChecked(true);
          setDuplicateBtnActive2(true);
          setDuplicateBtnActive(true);
        } else {
          alert(errorMessage);
        }
      })
      .catch((error) => {
        setError('서버가 유지보수 중이거나, 인터넷 연결이 끊겨있습니다.');
      });
  }, [errorMessage, successMessage, url, validate, value]);

  return [
    isChecked,
    checkDuplicate,
    error,
    setError,
    checkDuplicateBtnActive,
    checkDuplicateBtnActive2,
  ];
};

const NewSignupForm = () => {
  // const [checkDuplicateBtnActive, setCheckDuplicateBtnActive] = useState(false);
  const [passwordBtnActive, setPasswordBtnActive] = useState(false);
  const [values, setValues] = useState({
    email: '',
    nickname: '',
    name: '',
    password: '',
    confirmPassword: '',
    gender: null,
    birthday: '',
  });

  const [errors, setErrors] = useState({
    fetchError: '',
    lengthError: '',
  });

  const navigate = useNavigate();

  // 이메일 체크 로직과 비밀번호 체크 로직 제대로 테스트 해볼것.
  const [
    isEmailChecked,
    checkDuplicateEmail,
    emailError,
    setEmailError,
    checkDuplicateBtnActive2,
  ] = useCheckDuplicate(
    'api/members/signup/checkduplicateemail',
    values.email,
    '사용 가능한 이메일입니다.',
    '이미 사용중인 메일입니다.',
    validateEmail
  );

  const [
    isNicknameChecked,
    checkDuplicateNickname,
    nicknameError,
    setNicknameError,
    checkDuplicateBtnActive,
  ] = useCheckDuplicate(
    'api/members/signup/checkduplicatenickname',
    values.nickname,
    '사용 가능한 활동명입니다.',
    '이미 사용중인 활동명입니다.',
    validateNickname
  );

  const clearError = useCallback(
    (field) => {
      setErrors((prev) => ({ ...prev, [field]: '' }));
      if (field === 'email') setEmailError('');
      if (field === 'nickname') setNicknameError('');
    },
    [setEmailError, setNicknameError]
  );

  const nameIcon = '/svg/join-name.svg';
  const introIcon = '/svg/join-intro.svg';
  const dateIcon = '/svg/join-date.svg';
  const genderIcon = '/svg/join-gender.svg';
  const mailIcon = '/svg/join-mail.svg';
  const pwdIcon = '/svg/join-password.svg';

  const inputChangeHanlder = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePassword = () => {
    const error = validatePassword(values.password, values.confirmPassword);
    if (!error) {
      alert('비밀 번호가 일치합니다.');
      setPasswordBtnActive(true);
    } else {
      setErrors((prev) => ({ ...prev, lengthError: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      nickname,
      name,
      password,
      confirmPassword,
      gender,
      birthday,
    } = values;

    if (
      !email ||
      !nickname ||
      !name ||
      !password ||
      !confirmPassword ||
      gender === null ||
      !birthday
    ) {
      alert('모든 정보를 입력해주세요.');
    } else if (!isEmailChecked) {
      alert('이메일 중복확인을 해주세요.');
    } else if (!isNicknameChecked) {
      console.log('닉네임이 비어있음.');
      alert('별명 중복확인을 해주세요.');
    } else {
      axiosInstance
        .post('api/members/signup', values)
        .then((response) => {
          if (response.status === 201) {
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
          }
        })
        .catch((error) => {
          setErrors((prev) => ({
            ...prev,
            fetchError: '회원가입에 실패하였습니다.',
          }));
        });
    }
  };

  return (
    <Mobile>
      <BackGround>
        <BackYellow />
      </BackGround>
      <LogoContainer>
        <StyledLogo
          onClick={() => {
            navigate('/');
          }}
        />
      </LogoContainer>
      <SignupContainer>
        <SignupForm onSubmit={handleSubmit} noValidate>
          <SignupTitle>Create Account</SignupTitle>

          <Text>
            <EditIcon backgroundImage={mailIcon} />
            <label htmlFor="nickname">식구로 가입할 이메일을 적어주세요.</label>
          </Text>
          <Input
            type="email"
            placeholder="식구에서 사용하실 이메일을 입력해주세요."
            name="email"
            value={values.email}
            onChange={inputChangeHanlder}
            onFocus={() => {
              clearError('email');
            }}
          />
          <CheckDuplicateButton
            type="button"
            onClick={checkDuplicateEmail}
            className={checkDuplicateBtnActive2 ? 'active' : ''}
          >
            이메일 중복 확인
          </CheckDuplicateButton>
          {emailError && <Error>{emailError}</Error>}

          <Text>
            <EditIcon backgroundImage={introIcon} />
            <label htmlFor="nickname">식구로 활동할 별명을 만들어주세요.</label>
          </Text>
          <Input
            type="text"
            name="nickname"
            placeholder="식구의 별명을 10자이내로 입력해주세요."
            value={values.nickname}
            onChange={inputChangeHanlder}
            onFocus={() => {
              clearError('nickname');
            }}
          />
          <CheckDuplicateButton
            type="button"
            onClick={checkDuplicateNickname}
            className={checkDuplicateBtnActive ? 'active' : ''}
          >
            활동명 중복 확인
          </CheckDuplicateButton>
          {nicknameError && <Error>{nicknameError}</Error>}
          <div className="form-gender">
            <Text>
              <EditIcon backgroundImage={genderIcon} />
              <label htmlFor="gender">
                본인의 성별을 노란색으로 바꿔주세요.
              </label>
            </Text>
            <GenderBox>
              <GenderButton
                type="button"
                active={values.gender === true}
                onClick={() => {
                  console.log('male');
                  setValues((prev) => ({ ...prev, gender: true }));
                }}
              >
                남성
              </GenderButton>
              <GenderButton
                type="button"
                active={values.gender === false}
                onClick={() => {
                  console.log('female');
                  setValues((prev) => ({ ...prev, gender: false }));
                }}
              >
                여성
              </GenderButton>
            </GenderBox>
          </div>

          <Text>
            <EditIcon backgroundImage={nameIcon} />
            <label htmlFor="name">이름을 적어주세요.</label>
          </Text>
          <Input
            type="text"
            name="name"
            placeholder="식구의 이름은 무엇인가요?"
            value={values.name}
            onChange={inputChangeHanlder}
          />
          <Text>
            <EditIcon backgroundImage={pwdIcon} />
            <label htmlFor="password">사용할 비밀번호를 입력해주세요.</label>
          </Text>
          <Input
            type="password"
            name="password"
            placeholder="숫자, 영문자 포함 8글자 이상이어야 합니다."
            value={values.password}
            onChange={inputChangeHanlder}
            onFocus={() => {
              setErrors('');
            }}
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            value={values.confirmPassword}
            onChange={inputChangeHanlder}
            onFocus={() => {
              setErrors('');
            }}
          />
          <CheckPasswordButton
            type="button"
            onClick={handlePassword}
            className={passwordBtnActive ? 'active' : ''}
          >
            비밀번호 일치 여부 확인
          </CheckPasswordButton>
          {errors.lengthError && <Error>{errors.lengthError}</Error>}
          <Text>
            <EditIcon backgroundImage={dateIcon} />
            <label htmlFor="birthday">생년월일을 입력해주세요</label>
          </Text>
          <Input
            type="date"
            name="birthday"
            value={values.birthday}
            onChange={inputChangeHanlder}
          />

          <SignupButton type="submit">회원가입</SignupButton>
          {errors.fetchError && <Error>{errors.fetchError}</Error>}

          <FooterText>이미 식구이신가요?</FooterText>

          <StyledLink to="/login">
            지금 바로 여기를 눌러 로그인하세요.
          </StyledLink>
        </SignupForm>
      </SignupContainer>
    </Mobile>
  );
};
export default NewSignupForm;
