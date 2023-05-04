import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const GlobalWrap = styled.form`
  width: 393px;
  height: 852px;
  border: 1px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fffaed;
`;
