import {
  SignupForm,
  Input,
  SignupButton,
  CheckDuplicateButton,
  Error,
} from '../style/SignupStyle';
import { useState } from 'react';
// import { login } from '../store/userSlice';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fetchError, setFetchError] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCheckDuplicate = (e) => {
    // 중복 확인 로직 작성_되는지 아직 점검 안해봄 =>됨^^
    axios
      .get('/users', {
        params: { email },
      })
      .then((response) => {
        const alreadyExist = response.data.find((user) => user.email === email);
        if (alreadyExist) {
          setEmailError('이미 가입된 이메일입니다.');
        } else {
          alert('사용 가능한 이메일입니다.');
        }
      })
      .catch((error) => {
        setFetchError('인터넷 연결을 확인하세요.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      // 회원가입 로직 작성
    }
  };

  return (
    <SignupForm onSubmit={handleSubmit}>
      <p>Email:</p>
      <Input type="email" value={email} onChange={handleEmailChange} />
      <CheckDuplicateButton onClick={handleCheckDuplicate}>
        중복확인
      </CheckDuplicateButton>
      {emailError && <Error>{emailError}</Error>}

      <p>Password:</p>
      <Input type="password" value={password} onChange={handlePasswordChange} />

      <p>Confirm Password:</p>
      <Input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {passwordError && <Error>{passwordError}</Error>}
      {fetchError && <Error>{fetchError}</Error>}

      <SignupButton type="submit">회원가입</SignupButton>
    </SignupForm>
  );
};

// 이름, 닉네임, 이메일, 비밀번호, 성별, 생년월일
// 닉네임, 이메일은 중복 안되게 할 것.

export default Signup;
