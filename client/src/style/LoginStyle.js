import styled from 'styled-components';

const Form = styled.div`
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
const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 3px;
`;
export { Form, Input, LoginButton, Error };
