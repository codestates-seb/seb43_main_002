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
  height: 272px;
  top: 0;
  left: 0;
`;

export const Mobile = styled.div`
  position: relative;
  width: 400px;
  height: 850px;

  box-sizing: border-box;
  padding: 20px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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

export const Profile = styled.div`
  display: flex;
  margin-top: 20px;
  letter-spacing: -0.05em;

  > div:first-child {
    background-color: #cdeeff;
    box-sizing: border-box;
    border-radius: 10px;
    width: 100px;
    height: 200px;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    flex: 1;

    > ul {
      list-style: none;
      margin: 0;
      padding: 0;
      color: white;

      > li:first-child {
        font-size: 18pt;
        font-weight: 700;
      }

      > li:nth-child(2) {
        font-size: 10pt;
        opacity: 0.8;
      }

      > li:last-child {
        display: flex;
        justify-content: space-between;

        > ul {
          display: flex;
          margin: 10px 0 0 0;
          padding: 0;

          font-size: 10pt;
          align-items: center;
          list-style: none;

          > li:first-child {
            width: 30px;
            height: 30px;
            margin-right: 10px;
            border-radius: 50px;
            background-color: #cdeeff;
          }

          > li:last-child > div:first-child {
            font-weight: 700;
          }
        }
      }
    }
  }
`;

export const NewPosts = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: -0.05em;

  h3 {
    margin: 20px 0 10px 0;
  }

  .post {
    display: flex;

    > div {
      background-color: white;
      width: 175px;
      padding: 10px;
      border-radius: 10px;

      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li:first-child div {
          background-color: #cdeeff;
          border-radius: 30px;
          width: 30px;
          height: 30px;
        }

        li:nth-child(2) {
          text-align: right;
          font-size: 10pt;
          opacity: 0.5;
        }

        li:last-child {
          margin-top: 3px;
          text-align: right;
          font-weight: 700;
        }
      }

      :first-child {
        margin-right: 10px;
      }
    }
  }
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: -0.05em;

  h3 {
    margin: 20px 0 10px 0;
  }

  .post > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    width: 360px;
    padding: 10px;
    background-color: white;
    box-sizing: border-box;
    border-radius: 10px;

    > div:first-child {
      background-color: #cdeeff;
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }

    > div:nth-child(2) {
      flex: 1;

      ul {
        list-style: none;
        margin: 0 0 0 10px;
        padding: 0;

        li:first-child {
          font-weight: 700;
        }

        li:last-child {
          font-size: 10pt;
          opacity: 0.7;
        }
      }
    }

    > button:last-child {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      background-color: #c9c9c9;
      color: white;
      border: none;

      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14pt;
      font-weight: 700;
      cursor: pointer;

      :hover {
        background-color: #ffca61 !important;
      }
    }
  }
`;
