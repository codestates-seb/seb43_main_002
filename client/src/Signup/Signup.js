import {
  SignupForm,
  Input,
  SignupButton,
  CheckboxContainer,
  GenderCheckbox,
  CheckboxLabel,
  CheckDuplicateButton,
  CheckPasswordButton,
  Text,
  FooterText,
  StyledLink,
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
    }
    // 중복 확인 로직 작성_되는지 아직 점검 안해봄 => 됨 => 백엔드와 통신해 볼 것.
    else {
      axios
        .get('members/회원정보 모아 놓은 곳', {
          email,
        })
        .then((response) => {
          const alreadyExistEmail = response.data.find(
            (user) => user.email === email
          );
          if (alreadyExistEmail) {
            setEmailError('이미 가입된 이메일입니다.');
          } else {
            alert('사용 가능한 이메일입니다.');
          }
        })
        .catch((error) => {
          setFetchError('인터넷 연결을 확인하세요.');
          console.log('연결 안됨0');
        });
    }
  };

  const handleCheckDuplicateNickName = () => {
    axios
      .get('members/회원정보 모아 놓은 곳', {
        nickname,
      })
      .then((response) => {
        const alreadyExistNickName = response.data.find(
          (user) => user.nickname === nickname
        );
        if (alreadyExistNickName) {
          setNicknameError('이미 가입된 활동명입니다.');
        } else {
          alert('사용 가능한 활동명입니다.');
        }
      })
      .catch((error) => {
        setFetchError('인터넷 연결을 확인하세요.');
        console.log('연결 안됨1');
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
        alert('회원가입이 성공적으로 완료되었습니다.');
        navigate('/');
      })
      .catch((error) => {
        setFetchError2('인터넷 연결을 확인하세요.2');
        console.log('연결안됨2;');
      });
  };

  return (
    <>
      <Text>Create Account</Text>
      <SignupForm onSubmit={handleSubmit} noValidate>
        {/*onSubmit={handleSubmit} 이 부분에서 문제가 생긴듯하다.
        로그인 파트에서 알아보면 좋겟다고 한 부분도 이 부분이지 않을까 싶다. */}
        <Input
          type="email"
          placeholder="식구에서 사용하실 이메일을 입력해주세요."
          value={email}
          onChange={handleEmailChange}
        />
        <CheckDuplicateButton type="button" onClick={handleCheckDuplicateEmail}>
          이메일 중복확인
        </CheckDuplicateButton>
        {emailError && <Error>{emailError}</Error>}

        <Input
          type="text"
          placeholder="식구에서 사용하실 활동명을 입력해주세요."
          value={nickname}
          onChange={handleNicknameChange}
        />
        <CheckDuplicateButton
          type="button"
          onClick={handleCheckDuplicateNickName}
        >
          활동명 중복확인
        </CheckDuplicateButton>
        {nicknameError && <Error>{nicknameError}</Error>}
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
              {/* 이 span은 styled-components로 디자인한 체크박스를 대신하는 역할을 합니다 */}
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
              {/* 이 span은 styled-components로 디자인한 체크박스를 대신하는 역할을 합니다 */}
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
        <Text>본인의 주민등록번호 앞 6자리를 입력해주세요.</Text>
        <Input
          type="text"
          placeholder="예) 2022년 7월 1일 생 = 220701"
          value={birthday}
          onChange={handleBirthday}
        />

        <SignupButton type="submit">회원가입</SignupButton>
        {fetchError && <Error>{fetchError2}</Error>}
      </SignupForm>
      <FooterText>이미 식구이신가요?</FooterText>
      <StyledLink to="/">지금 바로 여기를 눌러 로그인하세요.</StyledLink>
    </>
  );
};

// 이름, 닉네임, 이메일, 비밀번호, 성별, 생년월일
// 닉네임, 이메일은 중복 안되게 할 것.

export default Signup;
