import { useEffect, useRef } from 'react';
import { MainWrap } from '../home/HomeStyle';
import Header from '../home/Header';
import Footer from '../home/Footer';
import { Mapbox } from './MapStyle';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.naver && mapRef.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };
      // eslint-disable-next-line no-unused-vars
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
    }
  }, []);

  return (
    <MainWrap>
      <Header></Header>
      <Mapbox ref={mapRef} id="map"></Mapbox>
      <Footer></Footer>
    </MainWrap>
  );
};

export default Map;
