import styled from 'styled-components';

export const MainWrap = styled.div`
  padding: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderBackWrap = styled.div`
  padding: 0px;
  display: flex;
  height: 30%;
  width: 100%;
  /* border: 1px solid black; */
  border-bottom-left-radius: 15%;
  border-bottom-right-radius: 15%;
  position: absolute;
  background-image: radial-gradient(#ffd571, #ffac36);
`;

export const HeaderWrap = styled.header`
  padding: 0px;
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
  padding: 0px;
  margin-right: 10px;
  margin-top: 20px;
  height: 30%;
  width: 10%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;
  svg {
    padding: 0px;
    font-size: 30px;
  }
`;

export const DayWrap = styled.div`
  padding: 0px;
  margin-top: 70px;
  height: 7%;
  width: 80%;
  /* border: 1px solid black; */
  z-index: 1;
  background-color: pink;
`;

export const SelectedDay = styled.div`
  padding: 0px;
  width: 50px;
  height: 100%;
  /* border: 1px solid black; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
`;

export const WeekWrap = styled.div`
  padding: 0px;
  width: 100%;
  height: 17px;
  /* border: 1px solid black; */
  position: relative;
`;

export const DayNumberWrap = styled.div`
  margin-top: 10px;
  width: 60%;
  height: 100%;
  padding: 0px;
  border-bottom: 1px solid white;
  position: relative;
`;

export const BoardsWrap = styled.div`
  height: 80%;
  width: 360px;
  position: relative;
  background-color: transparent;
  z-index: 1;
`;

export const FooterWrap = styled.footer`
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  height: 7%;
  width: 100%;
  z-index: 2;
  position: relative;
  /* border: 1px solid black; */
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

export const FooterIcon = styled.div`
  padding-left: 0px;
  padding-right: 0px;
  width: 40%;
  position: relative;
  display: flex;
  justify-content: space-around;
  z-index: 3;
  a {
    padding: 0px;
    color: black;
    transition: color 0.2s;
  }
  a:hover {
    color: #ffb44a;
  }
  .active svg {
    fill: #ffb44a !important;
    color: #ffb44a !important;
    stroke: none !important;
  }
  a:hover:not(.active) {
    color: #ffb44a;
  }
  svg {
    padding: 0px;
    font-size: 20px;
  }
  cursor: pointer;
`;

export const FooterCicleWrap = styled.div`
  padding-left: 12px;
  padding-top: 12px;
  width: 50px;
  height: 50px;
  /* border: 1px solid black; */
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -110%);
  svg {
    color: #ffb44a;
    padding: 0px;
    font-size: 25px;
  }
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
