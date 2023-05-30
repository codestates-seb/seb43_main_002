import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Fredoka+One&display=swap');

  * {
    margin: 0;
    box-sizing: border-box;
    font-size: 12pt;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
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
  overflow: hidden;

  @media (max-width: 767px) and (max-height: 800px) {
    // 모바일 기기에서는 화면에 꽉차게 해야함..
    width: 100%;
  }

  @media (max-height: 800px) {
    height: 100%;
  }

  .hide {
    visibility: hidden;
  }

  @media (max-width: 767px) and (max-height: 800px) {
    // 모바일 기기에서는 화면에 꽉차게 해야함..
    width: 100%;
  }

  @media (max-height: 800px) {
    height: 100%;
  }
`;
