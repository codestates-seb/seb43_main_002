import {
  SignupForm,
  Input,
  SignupButton,
  CheckDuplicateButton,
  CheckPasswordButton,
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fetchError, setFetchError] = useState('');
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

  const handleCheckDuplicateEmail = (e) => {
    if (!validationEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return null;
    }
    // 중복 확인 로직 작성_되는지 아직 점검 안해봄 => 됨 => 백엔드와 통신해 볼 것.
    else {
      axios
        .get('members/join', {
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
        });
    }
  };
  const handleCheckDuplicateNickName = (e) => {
    axios
      .get('members/join', {
        nickname,
      })
      .then((response) => {
        const alreadyExistNickName = response.data.find(
          (user) => user.nickName === nickname
        );
        if (alreadyExistNickName) {
          setNicknameError('이미 가입된 활동명입니다.');
        } else {
          alert('사용 가능한 활동명입니다.');
        }
      })
      .catch((error) => {
        setFetchError('인터넷 연결을 확인하세요.');
      });
  };

  const handlePassword = () => {
    if (!validationPassword(password)) {
      setPasswordError('올바른 이메일 형식이 아닙니다.');
      return null;
    } else if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    axios
      .post('your_signup_endpoint', {
        email,
        nickname,
        password,
      })
      .then((response) => {
        alert('회원가입이 성공적으로 완료되었습니다.');
        navigate('/');
      })
      .catch((error) => {
        setFetchError('인터넷 연결을 확인하세요.');
        console.log('연결안됨;;');
      });
  };

  return (
    <SignupForm onSubmit={handleSubmit} noValidate>
      <p>식구에서 사용하실 이메일을 입력해주세요.</p>
      <Input type="email" value={email} onChange={handleEmailChange} />
      <CheckDuplicateButton onClick={handleCheckDuplicateEmail}>
        이메일 중복확인
      </CheckDuplicateButton>
      {emailError && <Error>{emailError}</Error>}

      <p>식구에서 사용하실 활동명을 입력해주세요.</p>
      <Input type="text" value={nickname} onChange={handleNicknameChange} />
      <CheckDuplicateButton onClick={handleCheckDuplicateNickName}>
        활동명 중복확인
      </CheckDuplicateButton>
      {nicknameError && <Error>{nicknameError}</Error>}

      <p>식구에서 사용하실 비밀번호를 입력해주세요.</p>
      <Input type="password" value={password} onChange={handlePasswordChange} />

      <p>입력하신 비밀번호를 한 번 더 입력해주세요.</p>
      <Input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <CheckPasswordButton onClick={handlePassword}>
        비밀번호 일치 여부 확인 버튼
      </CheckPasswordButton>
      {passwordError && <Error>{passwordError}</Error>}

      <p>회원가입 버튼 눌러 가입하기</p>
      <SignupButton type="submit">회원가입</SignupButton>
      {fetchError && <Error>{fetchError}</Error>}
    </SignupForm>
  );
};

// 이름, 닉네임, 이메일, 비밀번호, 성별, 생년월일
// 닉네임, 이메일은 중복 안되게 할 것.

export default Signup;
