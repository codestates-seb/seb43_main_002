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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../style/EditProfileStyle';
import axiosInstance from '../axiosConfig';

const emailRegex = /^[\w-]+(.[\w-]+)@([\w-]+.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // 비밀번호 상태관리 및 과도한 state 남발로 인한 과도한 리렌더링 해결하기
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [fetchError2, setFetchError2] = useState('');
  const navigate = useNavigate();

  const nameIcon = '/svg/join-name.svg';
  const introIcon = '/svg/join-intro.svg';
  const dateIcon = '/svg/join-date.svg';
  const genderIcon = '/svg/join-gender.svg';
  const mailIcon = '/svg/join-mail.svg';
  const pwdIcon = '/svg/join-password.svg';

  const validationEmail = (email) => {
    return emailRegex.test(email);
  };
  const validationPassword = (password) => {
    return passwordRegex.test(password);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    if (e.target.value.length > 9) {
      setLengthError('8글자까지 입력 가능합니다.');
      e.preventDefault();
      setNickname('');
    } else {
      setLengthError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCheckDuplicateEmail = (e) => {
    if (!validationEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return null;
    } else {
      axiosInstance
        .post('api/members/signup/checkduplicateemail', {
          email,
        })
        .then((response) => {
          if (response.data === false) {
            alert('사용 가능한 메일입니다.');
            console.log('이게 되네?');
          } else if (response.data === true) {
            alert('이미 사용중인 메일입니다.');
            console.log('중복된 이메일임');
          }
        })
        .catch((error) => {
          setFetchError('인터넷 연결을 확인하세요.', error);
          console.log('연결 안됨0');
        });
    }
  };

  const handleCheckDuplicateNickname = () => {
    axiosInstance
      .post('api/members/signup/checkduplicatenickname', {
        nickname,
      })
      .then((response) => {
        if (response.data === false) {
          alert('사용 가능한 활동명입니다.');
        } else {
          setNicknameError('이미 활동중인 식구이름입니다.');
        }
      })
      .catch((error) => {
        setFetchError('인터넷 연결을 확인하세요.');
        console.log('연결 안됨1', error);
      });
  };

  const handlePassword = () => {
    console.log('비밀번호 일치 여부 확인 버튼이 클릭되었습니다.');
    if (!validationPassword(password)) {
      setPasswordError(
        '비밀번호는 영문자, 숫자를 포함하여 8자 이상이어야합니다.'
      );
      return null;
    } else if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else if (password === confirmPassword) {
      alert('비밀번호가 일치합니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !handleCheckDuplicateNickname
      // !handlePassword ||
      // handleCheckDuplicateEmail ||
      // !handleBirthday ||
      // !handleName
    ) {
      setFetchError2('각 항목의 중복 확인 및 비밀번호 일치 여부를 확인하세요');
    } else {
      axiosInstance
        .post('api/members/signup', {
          email,
          nickname,
          password,
          name,
          birthday,
          gender,
        })
        .then((response) => {
          if (response.status === 201) {
            alert('회원가입이 성공적으로 완료되었습니다.');
            navigate('/');
          } else {
            alert('뭔가 문제가 있습니다.');
          }
        })
        .catch((error) => {
          setFetchError2('인터넷 연결을 확인하세요.2');
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
            value={email}
            onChange={handleEmailChange}
          />
          <CheckDuplicateButton
            type="button"
            onClick={handleCheckDuplicateEmail}
          >
            이메일 중복확인
          </CheckDuplicateButton>
          {emailError && <Error>{emailError}</Error>}

          <Text>
            <EditIcon backgroundImage={introIcon} />
            <label htmlFor="nickname">식구로 활동할 별명을 만들어주세요.</label>
          </Text>
          <Input
            type="text"
            placeholder="식구로 활동할 별명을 8글자까지 입력해주세요."
            value={nickname}
            onChange={handleNicknameChange}
          />
          <CheckDuplicateButton
            type="button"
            onClick={handleCheckDuplicateNickname}
          >
            활동명 중복확인
          </CheckDuplicateButton>
          {/* 활동명에 제한을 두어야할까? */}
          {nicknameError && <Error>{nicknameError}</Error>}
          {lengthError ? <Error>{lengthError}</Error> : null}

          <div className="form-gender">
            <Text>
              <EditIcon backgroundImage={genderIcon} />
              <label htmlFor="gender">
                본인에 성별에 노란불이 들어오게 해주세요.
              </label>
            </Text>
            <GenderBox>
              <GenderButton
                type="button"
                active={gender === true}
                onClick={() => {
                  console.log('male');
                  setGender(true);
                }}
              >
                남성
              </GenderButton>
              <GenderButton
                type="button"
                active={gender === false}
                onClick={() => {
                  console.log('female');
                  setGender(false);
                }}
              >
                {/* null일떄도 false로 인식하니 null일때 상태 추가하기 => 간단하게 끝남*/}
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
            placeholder="식구의 이름은 무엇인가요?"
            value={name}
            onChange={handleName}
          />
          <Text>
            <EditIcon backgroundImage={pwdIcon} />
            <label htmlFor="password">사용할 비밀번호를 입력해주세요.</label>
          </Text>
          <Input
            type="password"
            placeholder="숫자, 영문자 포함 8글자 이상이어야 합니다."
            value={password}
            onChange={handlePasswordChange}
          />

          <Input
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <CheckPasswordButton type="button" onClick={handlePassword}>
            비밀번호 일치 여부 확인 버튼
          </CheckPasswordButton>
          {passwordError && <Error>{passwordError}</Error>}
          <Text>
            <EditIcon backgroundImage={dateIcon} />
            <label htmlFor="birthday">생년월일을 입력해주세요</label>
          </Text>
          <Input type="date" value={birthday} onChange={handleBirthday} />

          <SignupButton type="submit">회원가입</SignupButton>
          {fetchError && <Error>{fetchError2}</Error>}

          <FooterText>이미 식구이신가요?</FooterText>

          <StyledLink to="/">지금 바로 여기를 눌러 로그인하세요.</StyledLink>
        </SignupForm>
      </SignupContainer>
    </Mobile>
  );
};

// 이름, 닉네임, 이메일, 비밀번호, 성별, 생년월일
// 닉네임, 이메일은 중복 안되게 할 것.

export default Signup;
