import styled from 'styled-components';

export const HeaderBackWrap = styled.div`
  padding: 0px;
  display: flex;
  height: 10%;
  width: 100%;
  border-bottom-left-radius: 21px;
  border-bottom-right-radius: 21px;
  position: absolute;
  background-image: radial-gradient(#ffd571, #ffac36);
  z-index: 100;
`;

export const HeaderWrap = styled.header`
  padding: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrap = styled.img`
  padding-left: 30px;
`;

export const MapContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  top: 8%;
  height: 80%;
  width: 100%;
  overflow: hidden;
  z-index: 10;
`;

export const Mapbox = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 10;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 20px 0;
`;

export const CategoryButton = styled.button`
  position: relative;
  padding: 7px 7px;
  border: none;
  border-radius: 5px;
  margin: 3px;
  background: radial-gradient(#ffd571, #ffac36);
  color: black;
  font-size: 1rem;
  cursor: pointer;
  z-index: 20;

  &:hover {
    background: radial-gradient(#ccad5c, #cc8400);
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 5%;
  left: ${(props) => (props.animate ? '10px' : '-500px')};
  transition: left 1s;
  z-index: 20;
`;

export const CurrentLocationButton = styled.div`
  position: absolute;
  bottom: ${(props) => (props.animate ? '230px' : '10px')};
  height: 40px;
  width: 40px;
  padding: 7px 7px;
  border: none;
  border-radius: 50px;
  margin: 3px;
  right: 10px;
  background-image: radial-gradient(#ffd571, #ffac36);
  transition: bottom 1s;
  z-index: 20;
  cursor: pointer;
  &:hover {
    background-image: radial-gradient(#ccad5c, #cc8400);
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  bottom: 20px;
  transform: ${(props) =>
    props.animate ? 'translateY(0)' : 'translateY(calc(100% + 20px))'};
  transition: transform 1s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 200px;
  overflow-y: auto;
  background: rgba(255, 250, 237, 0.8);
  border-top: 1px solid #ddd;
  z-index: 20;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ResultItem = styled.div`
  width: 90%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background: #eee;
  }
  z-index: 20;
`;
