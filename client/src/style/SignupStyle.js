import styled from 'styled-components';

const SignupForm = styled.form`
  justify-content: center;
  align-items: center;
  padding: 20px;
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

const SignupButton = styled(Button)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckDuplicateButton = styled(Button)`
  width: auto;
  margin-left: 10px;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 3px;
`;

export { SignupForm, Input, SignupButton, CheckDuplicateButton, Error };
