import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 0.5s ease-in-out;
`;

export const ModalContent = styled.form`
  background-color: #fffaed;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  padding: 20px;
  animation: ${slideIn} 0.5s ease-in-out;
  width: 100%;
  height: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/////////////////////////////////////

export const ModalHeadr = styled.div`
  padding: 10px;
  font-size: 18px;
`;

export const ModalInput = styled.input`
  width: 325px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5%;
`;

export const ModalPeople = styled.div`
  padding: 10px;
  font-size: 18px;
`;

export const ModalCount = styled.div`
  padding: 10px;
  width: 325px;
  height: 38px;
  border: 1px solid black;
  background-color: white;
  display: flex;
  justify-content: space-between;
`;

export const ModalCountMbutton = styled.button`
  border-radius: 50%;
  width: 18px;
  height: 18px;
`;

export const ModalCountPbutton = styled.button`
  border-radius: 50%;
  width: 18px;
  height: 18px;
`;

export const ModalWhen = styled.div`
  padding: 10px;
  font-size: 18px;
`;

export const ModalWhenInput = styled.input`
  padding: 10px;
  width: 325px;
  font-size: 14px;
  border-radius: 5%;
`;

export const ModalWho = styled.div`
  padding: 10px;
  font-size: 18px;
`;

export const ModalWhat = styled.div`
  padding: 10px;
  font-size: 18px;
`;
export const ModalText = styled.textarea`
  padding: 10px;
  width: 325px;
  height: 132px;
  font-size: 12px;
`;

export const ModalTag = styled.input`
  margin-top: 20px;
  padding: 10px;
  font-size: 12px;
  width: 325px;
`;

export const ModalButtonWrap = styled.div`
  padding: 10px;
`;

export const ModalButton = styled.button`
  width: 148px;
  height: 48px;
`;
