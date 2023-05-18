import {
  SignupContainer,
  BackYellow,
  SignupForm,
  Input,
  SignupTitle,
  SignupButton,
  CheckboxContainer,
  GenderCheckbox,
  CheckboxLabel,
  CheckDuplicateButton,
  CheckPasswordButton,
  Text,
  FooterText,
  StyledLink,
  StyledLogo,
  Mobile,
  BackGround,
  LogoContainer,
  Error,
} from '../style/SignupStyle';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[\w-]+(.[\w-]+)@([\w-]+.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
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
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value === 'male'); // 수정
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
      axios
        .post('members/signup/checkduplicateemail', {
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
    axios
      .post('members/signup/checkduplicatenickname', {
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
    e.stopPropagation();
    axios
      .post('/members/signup', {
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
  };

  return (
    <Mobile>
      <BackGround>
        <BackYellow />
      </BackGround>
      <LogoContainer>
        <StyledLogo />
      </LogoContainer>
      <SignupContainer>
        <SignupForm onSubmit={handleSubmit} noValidate>
          <SignupTitle>Create Account</SignupTitle>
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
          <Text>본인의 성별을 알려주세요.</Text>
          <CheckboxContainer>
            <div>
              <CheckboxLabel>
                <GenderCheckbox
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === true}
                  onChange={handleGender}
                  onClick={() => {
                    console.log('남자임');
                  }}
                />
                <span></span>{' '}
                {/* 이 span은 styled-components로 디자인한 체크박스를 대신하는 역할 */}
                남자
              </CheckboxLabel>
            </div>
            <div>
              <CheckboxLabel>
                <GenderCheckbox
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === false}
                  onChange={handleGender}
                  onClick={() => {
                    console.log('여자임');
                  }}
                />
                <span></span>{' '}
                {/* 이 span은 styled-components로 디자인한 체크박스를 대신하는 역할 */}
                여자
              </CheckboxLabel>
            </div>
          </CheckboxContainer>
          <Input
            type="text"
            placeholder="식구가 될 분의 이름을 적어주세요."
            value={name}
            onChange={handleName}
          />

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
          <Text>생년월일을 입력해주세요.</Text>
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
