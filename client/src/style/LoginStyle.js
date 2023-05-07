import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

<<<<<<< HEAD
const Form = styled.div`
=======
const LoginForm = styled.form`
>>>>>>> dab45af8c88710136c17d9e6e2e3309a84b9d53c
justify-content: center;
align- items: center;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffc257;
  margin-bottom: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f5b94a;
  }
`;

const LoginButton = styled(Button)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: white;
    text-decoration: #ffc250;
  }
`;
<<<<<<< HEAD
const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 3px;
`;
export { Form, Input, LoginButton, Error };
=======
const GoogleLoginButton = styled(Button)`
  background-color: #4285f4;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #357ae8;
  }
`;
const GoogleLogo = styled(FcGoogle)`
  margin-right: 8px;
`;

export { LoginForm, Input, LoginButton, GoogleLoginButton, GoogleLogo };
>>>>>>> dab45af8c88710136c17d9e6e2e3309a84b9d53c
