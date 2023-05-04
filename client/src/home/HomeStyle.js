import styled from 'styled-components';

export const MainWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderBackWrap = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
  border: 1px solid black;
  border-bottom-left-radius: 15%;
  border-bottom-right-radius: 15%;
  position: absolute;
  background-image: radial-gradient(#ffd571, #ffac36);
`;

export const HeaderWrap = styled.header`
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrap = styled.img`
  padding-left: 30px;
`;

// export const

export const SearchWrap = styled.div`
  margin-right: 10px;
  margin-top: 20px;
  height: 30%;
  width: 10%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;
`;

export const DayWrap = styled.div`
  margin-top: 70px;
  height: 7%;
  width: 100%;
  border: 1px solid black;
  z-index: 1;
  background-color: pink;
`;

export const BoardsWrap = styled.div`
  height: 80%;
  width: 85%;
  position: relative;
  background-color: transparent;
  z-index: 1;
`;

export const FooterWrap = styled.footer`
  height: 10%;
  width: 100%;
  z-index: 2;
  position: relative;
  border: 1px solid black;
  background-color: grey;
`;
