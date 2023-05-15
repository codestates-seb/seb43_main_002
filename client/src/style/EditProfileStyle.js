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
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  height: 220px;
  border-radius: 0 0 50% 50%;
  top: 0;
  left: 0;
`;

export const Mobile = styled.div`
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
  width: 400px;
  height: 850px;
  padding: 20px;
  box-sizing: border-box;
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
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14pt;
  color: white;

  > div:nth-child(2) {
    font-size: 16pt;
    font-weight: 700;
  }
`;

export const EditForm = styled.form`
  height: 100%;

  > div:first-child {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;

    > div {
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 50px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

      > img {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }

      > div {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        border: 10px solid rgba(255, 255, 255, 0.3);
      }
    }

    > label {
      position: absolute;
      width: 25px;
      height: 25px;
      border-radius: 25px;
      background-color: white;
      top: 115px;
      left: 200px;

      ::before {
        content: '+';
        position: absolute;
        font-size: 16px;
        font-weight: bold;
        color: #444;
        left: 8px;
      }
    }

    > input {
      // type이 file인 input의 변경은 버튼정도의 커스텀이 가능해서 그냥 display none으로 해버림.
      display: none;
    }
  }

  > div {
    margin-bottom: 20px;
    position: relative;
  }

  > div label {
    display: block;
    font-weight: 700;
    margin-bottom: 7px;
    font-size: 14pt;
  }

  > div > input {
    width: 100%;
    height: 45px;
    border: none;
    padding-left: 35px;
    border-radius: 10px;
    font-size: 12pt;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  }

  > div .icon {
    background-color: #c9c9c9;
    position: absolute;
    top: 44px;
    left: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50px;
  }

  > div:nth-child(5) input {
    padding-right: 10px;
  }

  > div:nth-child(6) {
    > div {
      display: flex;

      button {
        border: none;
        width: 100%;
        height: 40px;
        border-radius: 50px;
        background-color: #d4d4d4;
        color: white;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

        :last-child {
          margin-left: 20px;
        }
      }

      .active {
        background-image: linear-gradient(135deg, #ffd571, #ffac36);
      }
    }
  }

  > button {
    width: 100%;
    height: 50px;
    background-image: linear-gradient(135deg, #ffd571, #ffac36);
    color: white;
    border-radius: 100px;
    border: none;
  }
`;
