import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;

export const ModalWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 999;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
`;

export const ModalContent = styled.form`
  position: relative;
  bottom: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  left: 0;
  background-color: #fffaed;
  font-size: 15px;
  border-radius: 15px 15px 0 0;
  padding: 20px;
  width: 100%;
  height: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: start;
  animation: ${slideIn} 0.5s;
  transition: bottom 0.5s;
  z-index: 9999;

  > div:first-child {
    width: 50px;
    height: 50px;
    background-image: url('/svg/main-logo-2.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

/////////////////////////////////////

export const ModalQurry = styled.div`
  margin: 15px 0 5px 0;
  font-size: 14pt;
  font-weight: 500;
  color: #202020;
`;

export const ModalInput = styled.input`
  width: 360px;
  height: 40px;
  padding: 10px;
  font-size: 12pt;
  color: #505050;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  &:focus {
    outline: none;
  }
`;

export const ModalCount = styled.div`
  padding: 10px;
  width: 360px;
  height: 40px;
  border-radius: 10px;
  font-size: 12pt;
  height: 38px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  color: #505050;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
`;

export const ModalCountbutton = styled.button`
  border-radius: 50%;
  background-color: #9b9b9b;
  color: white;
  width: 18px;
  height: 18px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  &:hover {
    background-color: #696969;
  }

  ::before {
    content: '-';
    position: absolute;
    top: -5px;
    width: 20px;
    font-weight: 700;
    font-size: 16px;
  }
`;

export const ModalPlusbutton = styled.button`
  border-radius: 50%;
  background-color: #ffb44a;
  position: relative;
  color: white;
  width: 18px;
  height: 18px;
  border: none;
  cursor: pointer;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  &:hover {
    background-image: radial-gradient(#ffb44a, #ffca28);
  }
  ::before {
    content: '+';
    position: absolute;
    top: -4px;
    left: -1px;
    width: 20px;
    font-weight: 700;
    font-size: 16px;
  }
`;

export const ModalWhenInput = styled.input`
  padding: 10px;
  width: 325px;
  /* font-size: 14pt; */
  border-radius: 5%;
`;

export const ModalWhoButtonWrap = styled.div`
  border-radius: 10px;
  width: 360px;
  height: 40px;
  background-color: white;
  padding: 0 10px;
  display: flex;
  color: #505050;
  font-size: 12pt;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  justify-content: space-between;
  align-items: center;
`;

export const ModalWhobutton = styled.button`
  border-radius: 50%;
  background-color: #ffb44a;
  color: white;
  width: 18px;
  height: 18px;
  border: none;
  cursor: pointer;
  color: #505050;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  &:hover {
    background-image: radial-gradient(#ffb44a, #ffca28);
  }
  position: relative;

  ::before {
    content: '${(props) => (props.arrow === 'prev' ? '←' : '→')}';
    position: absolute;
    color: white;
    top: -1px;
    left: -1px;
    width: 20px;
    font-weight: 700;
    font-size: 10pt;
  }
`;

export const ModalText = styled.textarea`
  padding: 10px;
  width: 360px;
  height: 132px;
  font-size: 12pt;
  color: #505050;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

export const ModalTag = styled.input`
  margin-top: 20px;
  padding: 10px;
  font-size: 12px;
  width: 325px;
  &:focus {
    outline: none;
  }
`;

export const ModalButtonWrap = styled.div`
  margin-top: 10px;
  /* padding: 10px; */
  width: 360px;
  display: flex;
  justify-content: space-between;
`;

export const ModalButton = styled.button`
  width: 170px;
  height: 48px;
  border-radius: 40px;
  color: white;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffb44a;
  transition: background-color 0.3s ease;
  &:hover {
    background-image: radial-gradient(#ffb44a, #ffca28);
  }
`;
export const CancelButton = styled.button`
  width: 170px;
  height: 48px;
  border-radius: 40px;
  color: white;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background-color: #9b9b9b;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #696969;
  }
`;
