import {
  SignupForm,
  Input,
  SignupButton,
  CheckDuplicateButton,
  Error,
} from '../style/SignupStyle';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    // 중복 확인 로직 작성
    setEmailError('hi');
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

      <SignupButton type="submit">회원가입</SignupButton>
    </SignupForm>
  );
};

export default Signup;
