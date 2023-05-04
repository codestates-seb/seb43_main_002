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
  flex-direction: column;
  height: 30%;
  width: 100%;
  border: 1px solid black;
  border-bottom-left-radius: 15%;
  border-bottom-right-radius: 15%;
  z-index: -1;
  position: absolute;
  top: 0;
  background-image: radial-gradient(#ffd571, #ffac36);
`;

export const HeaderWrap = styled.header`
  height: 30%;
  width: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrap = styled.img`
  padding-left: 30px;
`;

// export const

export const SearchWrap = styled.div`
  height: 30%;
  width: 10%;
  border: 1px solid black;
  display: flex;
  justify-content: flex-end;
`;

export const DayWrap = styled.div`
  height: 30%;
  width: 100%;
  border: 1px solid black;
`;

export const BoardsWrap = styled.div`
  height: 80%;
  width: 85%;
  position: relative;
  border: 1px solid black;
  z-index: 0;
  margin-top: 39%;
`;

export const FooterWrap = styled.footer`
  height: 10%;
  width: 100%;
  z-index: 1;
  position: relative;
  border: 1px solid black;
`;
