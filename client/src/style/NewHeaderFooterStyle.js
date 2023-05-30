import styled from 'styled-components';

export const TitleBox = styled.footer`
  position: fixed;
  top: -1px;
  left: 0;
  width: 100%;
  padding: 20px;
  z-index: 1;
  border-radius: 0 0 10px 10px;
  background-image: ${(props) => props.backgroundImage};
`;

export const Title = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  > div:first-child {
    width: 50px;
    height: 50px;
    background-image: url('/svg/main-logo.svg');
    background-repeat: no-repeat;
    background-position: center;
  }

  > .search {
    flex: 1;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
  }

  > .font {
    margin-left: 10px;
    font-family: 'Fredoka One';
    font-size: 24pt;
    font-weight: 700;
    color: white;
    cursor: default;
  }

  > button {
    border: none;
    background-color: transparent;
    margin-left: auto;
    color: white;
    cursor: pointer;

    img {
      height: 25px;
    }
  }

  > .search-btn {
    margin: 0;
    width: 25px;
  }
`;

export const Space = styled.footer`
  margin-top: 70px;
`;

export const FooterWrap = styled.footer`
  position: absolute;
  bottom: 0;

  padding: 0 0 5px 0;
  height: 7%;
  width: 100%;
  z-index: 100;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
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
  align-items: center;
  justify-content: space-around;
  z-index: 3;
  cursor: pointer;
`;

export const FooterCicleWrap = styled.div`
  width: 50px;
  height: 50px;
  /* border: 1px solid black; */
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: -30%;
  left: 45%;
  transform: ${({ isHovered }) => (isHovered ? 'scale(1)' : 'scale(1.2)')};
  transition: transform 0.5s ease;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  > div {
    position: relative;
    background-image: linear-gradient(135deg, #ffd571, #ffac36);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    top: 12.5px;
    left: 12.5px;

    ::before {
      content: '+';
      position: absolute;
      font-size: 18px;
      font-weight: bold;
      color: white;
      top: -1.5px;
      left: 7px;
    }
  }
`;

export const MainIcon = styled.div`
  width: 22px;
  height: 22px;
  transition: background-image 0.3s ease;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-repeat: no-repeat;
  background-position: center;
`;

export const LodingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > img {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }
`;
