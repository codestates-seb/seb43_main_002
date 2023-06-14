import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const widthAnimationIn = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 90%;
  }
`;

const widthAnimationOut = keyframes`
  0% {
    width: 90%;
  }
  100% {
    width: 0%;
  }
`;

export const MainWrap = styled.div`
  padding: 0px;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > div:nth-child(2) {
    padding: 20px 20px 0 20px;
  }

  .boards {
    display: flex;
    justify-content: center;
    height: 75%;
    position: relative;
  }

  .none {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slide-in {
    opacity: 1;
    animation: ${slideIn} 0.7s ease-out;
  }

  .slide-out {
    opacity: 0;
    animation: ${slideOut} 0.7s ease-out;
  }
`;

export const SearchSpan = styled.input`
  display: ${(onSearch) => (onSearch ? 'block' : 'none')};
  margin-right: 15px;
  padding: 0px 10px;
  height: 30px;
  width: 90%;
  border: none;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid black;
  border-radius: 10px;
  border: none;
  background-color: #ffddac;
  animation: ${(props) =>
    props.inputEffect
      ? css`
          ${widthAnimationIn} 0.5s ease-in-out forwards;
        `
      : css`
          ${widthAnimationOut} 0.5s ease-in-out forwards;
        `};
`;

export const HeaderBackWrap = styled.div`
  padding: 0px;
  display: flex;
  width: 100%;
  /* border: 1px solid black; */
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 25px 25px;
  height: 272px;
  position: absolute;
  z-index: -1;
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

export const LogoutButton = styled.button`
  width: 30%;
  height: 20%;
  background-color: #f44336;
  color: white;
  font-size: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;
  transition: 0.3s;

  &:hover {
    background-color: #da190b;
  }
`;

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
  padding: 0px 20px;
  margin-bottom: 10px;
  z-index: 1;
  width: 100%;
  /* border: 1px solid black; */
  background-color: transparent;
  display: flex;
  /* overflow: auto; */
  flex-direction: row;
  white-space: nowrap;
  justify-content: space-around;
`;

export const SelectedDay = styled.div`
  padding: 0px;
  height: 100%;
  /* border: 1px solid black; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  cursor: pointer;
  opacity: ${({ selected }) => (selected ? '1' : '0.7')};
`;

export const SlideContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 10px;
  }

  .part {
    border-bottom: 1px solid white;
    opacity: 0.7;
    flex: 1;
  }
`;

export const SlideItem = styled.div`
  flex: 0 0 50px;
`;

export const WeekWrap = styled.div`
  padding: 0px;
  width: 100%;
  height: 17px;
  font-weight: 700;
  /* border: 1px solid black; */
  position: relative;
`;

export const DayNumberWrap = styled.div`
  margin-top: 10px;
  padding-bottom: 10px;
  width: 60%;
  /* height: 100%; */
  position: relative;
  border-bottom: ${({ selected }) => selected && '2px solid white'};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 220px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #eaeaea;
  cursor: pointer;
`;

export const BoardsWrap = styled.div`
  padding: 0 20px;
  width: 100%;
  position: relative;
  background-color: transparent;
  z-index: 1;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 25px;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const BoardWrap = styled.article`
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  z-index: 0;
  position: relative;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const CompleteBoard = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const CompletedBack = styled.div`
  z-index: 99;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: ${({ isRecruitmentComplete }) =>
    isRecruitmentComplete ? 'block' : 'none'};
  padding: 0px;
  ${({ isRecruitmentComplete }) =>
    isRecruitmentComplete &&
    css`
      background-color: black;
      opacity: 0.6;
    `}
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
  cursor: pointer;
  svg {
    color: #ffb44a;
    padding: 0px;
    font-size: 25px;
  }
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

export const RefreshButton = styled.img`
  position: absolute;
  top: 16px;
  right: 48px;
  width: 17px;
  height: 17px;
  cursor: pointer;
  /* display: ${(props) => (props.inputEffect ? 'block' : 'none')}; */
  opacity: ${(props) => (props.inputEffect ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
