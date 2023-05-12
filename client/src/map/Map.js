import { useEffect, useRef } from 'react';
import { MainWrap } from '../home/HomeStyle';
import Header from '../home/Header';
import Footer from '../home/Footer';
import { Mapbox } from './MapStyle';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // 위치를 표시하는 함수
  const displayMarker = (locPosition, message) => {
    var marker = new window.kakao.maps.Marker({
      map: mapInstance.current,
      position: locPosition,
    });

    var iwContent = message,
      iwRemoveable = true;

    var infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    infowindow.open(mapInstance.current, marker);
    mapInstance.current.setCenter(locPosition);
  };

  useEffect(() => {
    if (window.kakao && mapRef.current && !mapInstance.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.56779, 126.98051),
        level: 4,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOption);
      mapInstance.current = map;
      const places = new window.kakao.maps.services.Places();

      // Geolocation을 이용해서 접속 위치를 얻어옵니다
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude,
            lon = position.coords.longitude;
          let locPosition = new window.kakao.maps.LatLng(lat, lon),
            message = '<div style="padding:5px;">현재위치</div>';
          displayMarker(locPosition, message);
          mapInstance.current.setCenter(locPosition); // 현재 위치로 지도의 중심을 업데이트합니다.
        });
      } else {
        let locPosition = new window.kakao.maps.LatLng(37.56779, 126.98051),
          message = '현재 위치 사용 불가';

        displayMarker(locPosition, message);
      }

      // 카테고리 별로 검색하고 결과를 지도에 표시하는 함수
      const searchAndDisplayPlacesByCategory = (category) => {
        const callback = function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            result.forEach((place) => {
              let locPosition = new window.kakao.maps.LatLng(place.y, place.x),
                message = `<div style="padding:5px;">${category}: ${place.place_name}</div>`;
              displayMarker(locPosition, message);
            });
          }
        };

        // 키워드로 장소 검색
        places.keywordSearch(category, callback);
      };

      // 각 카테고리별로 장소를 검색하고 결과를 지도에 표시합니다
      const categories = ['한식', '일식', '중식', '양식', '패스트푸드'];
      categories.forEach(searchAndDisplayPlacesByCategory);
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
