import styled from 'styled-components';

export const Mapbox = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: space-between;
  top: 20%;
  height: 50%;
  width: 90%;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 20px 0;
`;

export const CategoryButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;
