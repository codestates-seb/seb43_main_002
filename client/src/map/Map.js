import { useEffect, useRef, useState } from 'react';
import { MainWrap } from '../home/HomeStyle';
import Header from '../home/Header';
import Footer from '../home/Footer';
import { Mapbox, ButtonWrap, CategoryButton } from './MapStyle';

const Map = () => {
  // Map 컴포넌트의 상태 및 참조를 초기화
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [markers, setMarkers] = useState([]);
  // 지정된 위치에 마커와 인포윈도우 표시
  const displayMarker = (locPosition, message) => {
    let marker = new window.kakao.maps.Marker({
      map: mapInstance.current,
      position: locPosition,
    });
    // 인포윈도우 생성
    let iwContent = message,
      iwRemoveable = true;

    let infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    infowindow.open(mapInstance.current, marker);
    marker.infowindow = infowindow;
    setMarkers((prev) => [...prev, marker]);
  };
  // 지도에서 모든 마커와 인포윈도우에서 제거
  const clearMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
      marker.infowindow.close();
    });
    setMarkers([]);
  };
  // 카테고리에 대한 장소를 검색하고 결과를 지도에 표시
  const searchAndDisplayPlacesByCategory = (category) => {
    clearMarkers();
    const places = new window.kakao.maps.services.Places();
    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        result.forEach((place) => {
          let locPosition = new window.kakao.maps.LatLng(place.y, place.x),
            message = `<div style="padding:5px;">${category}: ${place.place_name}</div>`;
          displayMarker(locPosition, message);
        });
      }
    };
    let currentCenter = mapInstance.current.getCenter();
    let options = {
      location: currentCenter,
      radius: 1000, // 1km 반경 안의 위치 검색
    };
    places.keywordSearch(category, callback, options);
  };
  // 현재 위치를 업데이트하고 지도의 중심을 현재 위치로
  const updateCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude,
          lon = position.coords.longitude;
        let locPosition = new window.kakao.maps.LatLng(lat, lon),
          message = '<div style="padding:5px;">현재위치</div>';
        displayMarker(locPosition, message);
        mapInstance.current.setCenter(locPosition);
      });
    } else {
      // 위치 정보를 사용할 수 없는 경우 기본 위치를 설정하고 해당 위치에 마커를 표시
      let locPosition = new window.kakao.maps.LatLng(37.56779, 126.98051),
        message = '현재 위치 사용 불가';
      displayMarker(locPosition, message);
    }
  };
  // 컴포넌트가 마운트될 때 Kakao 지도를 초기화하고 현재 위치를 업데이트
  useEffect(() => {
    if (window.kakao && mapRef.current && !mapInstance.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.56779, 126.98051),
        level: 7,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };
      // 지도 인스턴스를 생성하고 mapInstance에 저장
      const map = new window.kakao.maps.Map(mapRef.current, mapOption);
      mapInstance.current = map;
      // 현재 위치를 업데이트합니다.
      updateCurrentLocation();
    }
  }, []);

  // 카테고리 버튼 설정
  const categories = ['맛집', '한식', '일식', '중식', '양식', '패스트푸드'];
  const categoryButtons = categories.map((category) => (
    // 각 카테고리 버튼 클릭 시 해당 카테고리의 장소를 검색하고 결과를 지도에 표시
    <CategoryButton
      onClick={() => searchAndDisplayPlacesByCategory(category)}
      key={category}
    >
      {category}
    </CategoryButton>
  ));

  return (
    <MainWrap>
      <Header></Header>
      <Mapbox ref={mapRef} id="map"></Mapbox>
      <ButtonWrap>
        {categoryButtons}
        <button onClick={updateCurrentLocation}>현재 위치</button>
      </ButtonWrap>
      <Footer></Footer>
    </MainWrap>
  );
};

export default Map;
