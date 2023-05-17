import styled from 'styled-components';

export const MapContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  bottom: 230px;
  right: 10px;
  z-index: 10;
`;

export const SearchResults = styled.div`
  position: absolute; // 추가
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 200px;
  overflow-y: auto;
  background: rgba(255, 213, 113, 0.7);
  border-top: 1px solid #ddd;
  z-index: 10;
`;

export const ResultItem = styled.div`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background: #eee;
  }
  z-index: 20;
`;
