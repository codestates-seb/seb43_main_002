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

  const [errors, setErrors] = useState({
    emailError: '',
    nicknameError: '',
    passwordError: '',
    fetchError: '',
    lengthError: '',
  });

  const [isEmailChecked, setEmailChecked] = useState(false);
  const [isNicknameChecked, setNicknameChecked] = useState(false);

  const navigate = useNavigate();

  const nameIcon = '/svg/join-name.svg';
  const introIcon = '/svg/join-intro.svg';
  const dateIcon = '/svg/join-date.svg';
  const genderIcon = '/svg/join-gender.svg';
  const mailIcon = '/svg/join-mail.svg';
  const pwdIcon = '/svg/join-password.svg';

  const inputChangeHanlder = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    console.log(1);
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === 'nickname' && e.target.value.length > 9) {
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
  };

  // 이메일 입력 중복 검사
  const handleCheckDuplicateEmail = useCallback(() => {
    if (!emailRegex.test(values.email)) {
      setErrors((prev) => ({
        ...prev,
        emailError: '올바른 이메일 형식이 아닙니다.',
      }));
    }

    // 로그인 중복여부 검사.
    axiosInstance
      .post('api/members/signup/checkduplicateemail', {
        email: values.email,
      })
      .then((response) => {
        if (response.data === false) {
          alert('사용 가능한 이메일입니다.');
          setEmailChecked(true);
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
          setNicknameChecked(true);
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
  const handlePassword = () => {
    console.log('비밀번호 일치 여부 버튼 클릭');
    if (!passwordRegex.test(values.password)) {
      setErrors((prev) => ({
        ...prev,
        passwordError: '비밀번호는 영문, 숫자 포함 8글자 이상이어야합니다.',
      }));
      return null;
    } else if (values.password !== values.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        passwordError: '비밀번호가 일치하지 않습니다.',
      }));
    } else if ((values.password, values.confirmPassword)) {
      alert('비밀번호가 일치합니다.');
    }
  };

  // 회원가입 버튼 동작
  const handleSubmit = (e) => {
    e.preventDefault();
    const allChecked =
      !isEmailChecked ||
      !isNicknameChecked ||
      Object.values(values).some((v) => !v);
    if (allChecked) {
      setErrors((prev) => ({
        ...prev,
        fetchError: '각 항목의 중복 확인 및 비밀번호 일치 여부를 확인하세요',
      }));
    } else {
      axiosInstance
        .post('api/members/signup', values)
        .then((response) => {
          if (response.status === 201) {
            alert('회원가입이 성공적으로 완료되었습니다.');
            navigate('/');
          } else {
            alert('뭔가 문제가 있습니다.');
          }
        })
        .catch((error) => {
          setErrors((prev) => ({
            ...prev,
            fetchError: '인터넷 연결을 확인하세요.',
          }));
          console.log('연결안됨2;', error);
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
            onBlur={handleInputChange}
          />
          <CheckDuplicateButton
            type="button"
            onClick={handleCheckDuplicateEmail}
          >
            이메일 중복확인
          </CheckDuplicateButton>
          {errors.emailError ? <Error>{errors.emailError}</Error> : null}

          <Text>
            <EditIcon backgroundImage={introIcon} />
            <label htmlFor="nickname">식구로 활동할 별명을 만들어주세요.</label>
          </Text>
          <Input
            type="text"
            name="nickname"
            placeholder="식구로 활동할 별명을 8글자까지 입력해주세요."
            value={values.nickname}
            onBlur={handleInputChange}
            onChange={inputChangeHanlder}
          />
          <CheckDuplicateButton
            type="button"
            onClick={handleCheckDuplicateNickname}
          >
            활동명 중복확인
          </CheckDuplicateButton>
          {errors.nicknameError ? <Error>{errors.nicknameError}</Error> : null}
          {errors.lengthError ? <Error>{errors.lengthError}</Error> : null}

          <div className="form-gender">
            <Text>
              <EditIcon backgroundImage={genderIcon} />
              <label htmlFor="gender">
                본인에 성별을 노란색으로 바꿔주세요.
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
            onBlur={handleInputChange}
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
            onChange={handleInputChange}
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            value={values.confirmPassword}
            onChange={handleInputChange}
          />
          <CheckPasswordButton type="button" onClick={handlePassword}>
            비밀번호 일치 여부 확인 버튼
          </CheckPasswordButton>
          {errors.passwordError && <Error>{errors.passwordError}</Error>}
          <Text>
            <EditIcon backgroundImage={dateIcon} />
            <label htmlFor="birthday">생년월일을 입력해주세요</label>
          </Text>
          <Input
            type="date"
            name="birthday"
            value={values.birthday}
            onChange={handleInputChange}
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

export default NewSignup;
