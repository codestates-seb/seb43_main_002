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

export const ProfileImg = styled.div`
  height: 150px;

  > div:first-child {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

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
      top: 75px;
      left: 200px;
      cursor: pointer;

      ::before {
        content: '+';
        position: absolute;
        font-size: 20px;
        font-weight: bold;
        color: #444;
        top: -3px;
        left: 7px;
      }
    }

    > input {
      // type이 file인 input의 변경은 버튼정도의 커스텀이 가능해서 그냥 display none으로 해버림.
      display: none;
    }
  }
`;

export const EditForm = styled.form`
  > div {
    margin-bottom: 20px;
    position: relative;
  }

  > div label {
    display: flex;
    align-items: center;
    font-weight: 500;
    margin-bottom: 7px;
    font-size: 13pt;
    color: #393939;
  }

  > div > input {
    width: 100%;
    height: 45px;
    border: none;
    padding: 15px;
    border-radius: 10px;
    font-size: 12pt;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);

    :focus {
      outline-color: #ffd571;
    }
  }

  > div:nth-child(4) {
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

        :hover {
          filter: brightness(90%);
          transition: filter 0.3s;
        }
      }

      .active {
        background-image: linear-gradient(135deg, #ffd571, #ffac36);
      }
    }
  }

  > div:first-child input {
    color: #c9c9c9;

    :focus {
      outline: none;
    }
  }

  > div {
    > button {
      width: 100%;
      height: 40px;
      margin-top: 15px;
      background-image: linear-gradient(135deg, #d9d9d9, #c9c9c9);
      color: white;
      border-radius: 100px;
      border: none;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

      :hover {
        filter: brightness(90%);
        transition: filter 0.3s;
      }
    }
  }

  > button {
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    background-image: linear-gradient(135deg, #ffd571, #ffac36);
    color: white;
    border-radius: 100px;
    border: none;

    :hover {
      transition: filter 0.3s;
      filter: invert(5%);
    }
  }

  .active {
    background-image: linear-gradient(135deg, #ffd571, #ffac36) !important;
  }
`;

export const EditIcon = styled.div`
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-repeat: no-repeat;
  background-position: center;
  width: 23px;
  height: 20px;
  margin-right: 5px;
`;
