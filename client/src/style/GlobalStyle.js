import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&family=Playball&display=swap');

  * {
    margin: 0;
    box-sizing: border-box;
  }
`;

export const GlobalWrap = styled.div`
  width: 400px;
  padding: 0px;
  height: 852px;
  /* border: 1px solid black; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fffaed;

  .hide {
    visibility: hidden;
  }
`;
