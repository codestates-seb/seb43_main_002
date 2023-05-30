import styled from 'styled-components';

export const HomeWrap = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  > div:nth-child(2) {
    width: 100%;
    height: 82%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;

    > .logo {
      width: 130px;
      height: 130px;
      background-image: url('/svg/main-logo-2.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin-bottom: 10px;
    }

    > h2 {
      font-size: 18pt;
      margin-bottom: 10px;
      font-size: 20px;
      min-width: 11px;
      white-space: nowrap;
      margin: 0;
      color: transparent;
      position: absolute;
      top: 46.5%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    > h2::before {
      content: '식사할 사람 : 구합니다.';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: black;
      overflow: hidden;
      border-right: 1px solid black;
      animation: typing 2s steps(31) forwards;
    }

    > p {
      margin-top: 37px;
      text-align: center;
      opacity: 0;
      animation: fade-in 2s 2s forwards;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }

  > div:last-child {
    position: relative;
    bottom: -150px;
    width: 100%;
    padding: 20px;
    animation: slide-up 2s 3s forwards;
  }

  @keyframes slide-up {
    0% {
      bottom: -150px;
    }
    100% {
      bottom: 0;
    }
  }
  @keyframes typing {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

export const SignBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 15px;
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  color: white;
  border-radius: 100px;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
`;

export const BackYellow = styled.div`
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 50% 50%;
  width: 100%;
  height: 20%;
  top: 0;
  left: 0;
  position: absolute;
`;
