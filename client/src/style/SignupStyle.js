import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignupContainer = styled.div`display: flex;
height : 100%;
flex-direction: column;
justify-content: center;
align- items: center;
`;

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
  border-radius: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffc257;
  margin-bottom: 10px;
  color: white;
  border: none;
  border-radius: 20px;
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

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const GenderCheckbox = styled.input`
  margin: 10px 0;
`;

const CheckDuplicateButton = styled(Button)`
  width: auto;
  margin-left: 10px;
`;

const CheckPasswordButton = styled(Button)`
  width: auto;
  margin-left: 10px;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 3px;
`;
const CheckboxLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin: 0px;
  //여기서부터 다시
  cursor: pointer;
  font-size: 15px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #ccc;
    border-radius: 50%;
  }

  &:hover input ~ span {
    background-color: #9c9c9c;
  }

  input:checked ~ span {
    background-color: #ffc257;
  }

  span:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
  }

  //   span:after {
  //     top: 9px;
  //     left: 9px;
  //     width: 9px;
  //     height: 9px;
  //     border-radius: 50%;
  //     background: black;
  //   }
  //
`;
const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #979797;
  padding: 7px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffc257;
`;

export {
  SignupContainer,
  SignupForm,
  Input,
  SignupButton,
  CheckboxContainer,
  GenderCheckbox,
  CheckDuplicateButton,
  CheckPasswordButton,
  Error,
  Text,
  FooterText,
  StyledLink,
  CheckboxLabel,
};
