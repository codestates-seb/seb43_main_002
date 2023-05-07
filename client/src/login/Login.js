import { useNavigate } from 'react-router-dom';
import { Form, Input, LoginButton, Error } from '../style/LoginStyle';
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get('http://localhost:3001/users')
      .then((response) => {
        const users = response.data;
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          console.log('로그인 됨');
          navigate('/boards');
        } else if (!user) {
          console.log('설마 여기니?');
        }
      })
      .catch((err) => {
        console.log('제발 서버에서 못받아 오면 이거라도 보여줘...');
        setError('제발 서버에서 못받아 오면 이거라도 보여줘...');
      });
  };

  return (
    <Form>
      <Input
        type="text"
        placeholder="아이디"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton type="submit" onSubmit={handleSubmit}>
        로그인
      </LoginButton>
      {error && <Error>{error}</Error>}
    </Form>
  );
}

export default Login;
