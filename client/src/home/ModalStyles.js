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

export const ModalContent = styled.div`
  background-color: #fffaed;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  padding: 20px;
  animation: ${slideIn} 0.5s ease-in-out;
  width: 100%; /* 모달의 너비를 조정할 수 있습니다 */
  height: 90%;
  max-width: 500px; /* 모달의 최대 너비를 조정할 수 있습니다 */
`;
