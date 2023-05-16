import styled from 'styled-components';

export const MapContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: 10%;
  height: 80%;
  width: 90%;
`;

export const Mapbox = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 20px 0;
`;

export const CategoryButton = styled.button`
  padding: 7px 7px;
  border: none;
  border-radius: 0px;
  margin: 0px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;
export const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;

export const CurrentLocationButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
`;
