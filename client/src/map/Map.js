import { useEffect, useRef } from 'react';
import { MainWrap } from '../home/HomeStyle';
import Header from '../home/Header';
import Footer from '../home/Footer';
import { Mapbox } from './MapStyle';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.kakao && mapRef.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.56779, 126.98051),
        level: 4,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOption);

      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(37.56779, 126.98051),
        map: map,
      });
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
