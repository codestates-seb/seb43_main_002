import styled from 'styled-components';

export const BackGround = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const BackYellow = styled.div`
  background-color: #ffca61;
  height: 102px;
  top: 0;
  left: 0;
`;

export const Mobile = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 400px;
  height: 850px;
  padding: 20px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  > div:first-child {
    width: 50px;
    height: 50px;
    background-color: white;
  }

  > div:nth-child(2) {
    margin-left: 10px;
    font-size: 24pt;
    font-weight: 700;
    color: white;
  }

  > div:last-child {
    margin-left: auto;
    color: white;
  }
`;

export const Posts = styled.div`
  position: relative;
  letter-spacing: -0.05em;

  > .post {
    background-color: white;
    display: flex;
    align-items: center;
    width: 100%;
    height: 85px;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;

    > .before {
      background-color: #ffca61;
      border-radius: 25px;
      width: 50px;
      height: 50px;

      ::before {
        content: '';
        display: block;
        width: 36px;
        height: 36px;
        margin: 7px;
        border-radius: 50%;
        background-color: white;
      }
    }

    > .complete {
      position: relative;
      background-color: #c9c9c9;
      border-radius: 25px;
      width: 50px;
      height: 50px;

      ::before {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
      }
    }

    > div:nth-child(2) {
      flex: 1;
      max-width: calc(100% - 75px);

      ul {
        list-style: none;
        margin: 0;
        padding: 0 0 0 15px;

        li:first-child {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 700;
          width: 90%;
        }

        li span {
          font-size: 10pt;
          color: #c9c9c9;
        }

        li:last-child span:first-child {
          margin-right: 40px;
        }
      }
    }
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
    width: 360px;
    height: 160px;
    border-radius: 10px;
    padding: 20px;

    > ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li h3 {
        font-size: 14pt;
        margin-bottom: 5px;
      }

      li:nth-child(2) {
        color: #c9c9c9;
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
  }

  button:first-child {
    margin-right: 20px;
    background-color: #ffca61;
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
    background-color: #e9e9e9;
    width: 100%;
    height: 600px;
    border-radius: 20px 20px 0 0;
    padding: 20px;
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
        border-radius: 25px;
        background-color: #c9c9c9;
        margin-bottom: 5px;
      }

      > div:last-child {
        font-size: 14pt;
      }
    }

    > .post {
      background-color: white;
      position: relative;
      border-radius: 10px;

      > div:first-child {
        padding: 15px 20px 20px 20px;
        margin-top: 30px;

        > div:first-child {
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
          }
        }

        > div:last-child {
          margin-top: 10px;
          width: 100%;
          display: flex;

          input {
            flex: 1;
            border: none;
            height: 30px;
            background-color: #c9c9c9;
            border-radius: 5px 0 0 5px;
            padding-left: 5px;
          }

          button {
            border: none;
            border-radius: 0 5px 5px 0;
            background-color: #ffca61;
          }
        }
      }
    }
  }
`;
