import styled, { keyframes } from 'styled-components';

export const BackGround = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const BackYellow = styled.div`
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 15px 15px;
  height: 102px;
  top: 0;
  left: 0;
`;

export const Mobile = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
  position: relative;
  width: 400px;
  height: 792px;
  padding: 20px;
`;

export const Posts = styled.div`
  position: relative;
  letter-spacing: -0.05em;

  > .opacity {
    > div:nth-child(2) > ul > li:first-child {
      color: #898989;
      text-decoration: line-through;
    }
  }

  > .post {
    background-color: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    width: 100%;
    height: 85px;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;

    > .before {
      background-image: linear-gradient(135deg, #ffd571, #ffac36);
      border-radius: 25px;
      width: 40px;
      height: 40px;

      ::before {
        content: '';
        display: block;
        width: 26px;
        height: 26px;
        margin: 7px;
        border-radius: 50%;
        background-color: white;
      }
    }

    > .complete {
      position: relative;
      background-color: #c9c9c9;
      border-radius: 25px;
      width: 40px;
      height: 40px;
      background-image: url('/svg/state-check.svg');
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center;
    }

    > div:nth-child(2) {
      flex-grow: 1;
      max-width: calc(100% - 60px);

      > ul {
        list-style: none;
        margin: 0;
        padding: 0 0 0 15px;

        > li:first-child {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 700;
          margin-bottom: 2px;
          width: 90%;
          max-width: 90%;
        }

        > li:last-child {
          display: flex;
          align-items: center;

          > img {
            width: 20px;
            height: 15px;
            margin-right: 2px;
          }

          > span {
            font-size: 10pt;
            color: #c9c9c9;
            margin-right: 15px;
          }
        }
      }
    }

    > button {
      width: 20px;
      background-color: transparent;
      border: none;
      cursor: pointer;

      img {
        height: 25px;
      }

      :disabled {
        cursor: auto;
      }
    }

    .hide {
      display: none;
    }
  }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const scaleOut = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const PopUp = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background-color: white;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.2);
    width: 360px;
    height: 160px;
    border-radius: 10px;
    padding: 20px;

    > ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li h3 {
        font-size: 16pt;
        margin-bottom: 5px;
      }

      li:nth-child(2) {
        color: #393939;
        opacity: 0.6;
      }
    }
  }

  button {
    margin-top: 15px;
    border: 0;
    width: 150px;
    height: 45px;
    color: white;
    border-radius: 50px;
    background-color: #c9c9c9;
    cursor: pointer;
  }

  button:first-child {
    margin-right: 20px;
    background-image: linear-gradient(135deg, #ffd571, #ffac36);
  }

  .scale-in {
    animation: ${scaleIn} 0.3s ease-out;
  }

  .scale-out {
    animation: ${scaleOut} 0.8s ease-out;
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
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

export const Modal = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: self-end;

  > div {
    background-color: #fffaed;
    width: 100%;
    height: auto;
    min-height: 280px;
    border-radius: 15px 15px 0 0;
    padding: 30px 20px 40px 20px;
    letter-spacing: -0.05em;

    overflow-y: auto;

    /* 스크롤바 */
    ::-webkit-scrollbar {
      display: none;
      width: 8px; /* 스크롤바 너비 */
    }

    /* 스크롤바 thumb */
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2); /* 스크롤바 색상 */
      border-radius: 4px; /* 스크롤바 모서리 반경 */
    }

    /* 스크롤바 track */
    ::-webkit-scrollbar-track {
      background-color: transparent; /* 스크롤바 트랙 색상 */
    }

    > div:first-child {
      > div:first-child {
        width: 50px;
        height: 50px;
        background-image: url('/svg/main-logo-2.svg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 15px;
      }

      > div:last-child {
        > span {
          font-size: 14pt;
          opacity: 0.6;
        }

        > h3 {
          font-size: 16pt;
        }
      }
    }

    > .post {
      background-color: white;
      border-radius: 10px;
      margin-top: 30px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

      > div:first-child {
        position: relative;
        padding: 15px 20px 20px 20px;

        > img {
          position: absolute;
          left: 20px;
          top: -10px;

          width: 55px;
          height: 55px;
          border-radius: 50px;
          background-color: #ffca61;
        }

        > div:nth-child(2) {
          display: flex;
          margin-left: 65px;

          > div:first-child {
            div:first-child {
              font-weight: 700;
            }
            div:last-child {
              color: #c9c9c9;
              font-size: 10pt;
            }
          }

          > button {
            margin-left: auto;
            background-color: transparent;
            border: none;
            cursor: pointer;

            > img {
              height: 15px;
            }
          }
        }

        > div:last-child {
          margin-top: 12px;
          width: 100%;
          display: flex;

          input {
            flex: 1;
            border: none;
            height: 30px;
            background-color: #e9e9e9;
            border-radius: 5px 0 0 5px;
            padding-left: 5px;

            :focus {
              border: 2px solid #ffd571;
              outline: none;
            }
          }

          button {
            width: 50px;
            font-weight: 700;
            border: none;
            color: white;
            border-radius: 0 5px 5px 0;
            background-image: linear-gradient(135deg, #ffd571, #ffac36);
            cursor: pointer;
          }
        }
      }
    }
  }

  .slide-in {
    animation: ${slideIn} 0.3s ease-out;
  }

  .slide-out {
    animation: ${slideOut} 0.3s ease-out;
  }
`;
