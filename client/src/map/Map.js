/*eslint-disable */
import { useEffect, useRef, useState } from 'react';
import Header from '../mypage/Header';
import Footer from '../mypage/Footer';
import {
  Mapbox,
  MapContainer,
  CategoryButton,
  ButtonContainer,
  CurrentLocationButton,
  SearchResults,
  ResultItem,
  MainWrap,
} from '../style/MapStyle';

const Map = () => {
  // Map 컴포넌트의 상태 및 참조를 초기화
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('맛집');
  const [animation, setAnimation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);
  const [expandedResult, setExpandedResult] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);

  // 지정된 위치에 마커와 인포윈도우 표시
  const displayMarker = (locPosition, place, index) => {
    let pinImage = {
      url: '/svg/map-main.svg', // 핀 이미지의 경로를 수정해야 합니다.
      size: new window.kakao.maps.Size(30, 30), // 핀 이미지의 크기를 조정할 수 있습니다.
      origin: new window.kakao.maps.Point(0, 0),
      anchor: new window.kakao.maps.Point(15, 30), // 핀 이미지의 앵커 포인트를 조정할 수 있습니다.
    };

    let marker = new window.kakao.maps.Marker({
      map: mapInstance.current,
      position: locPosition,
      icon: pinImage, // 핀 이미지 설정
    });
    marker.index = index;
    let message = `
    <div style="
    width: 200px;
    height: 80px;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  ">
    <b>${place.place_name}</b>
    <br/>${place.road_address_name || place.address_name}
    ${place.phone ? `<br />${place.phone}` : ''}
  </div>`;
    let infowindow = new window.kakao.maps.InfoWindow({
      content: message,
    });
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
    console.log('marker remove');
  };
  // 카테고리에 대한 장소를 검색하고 결과를 지도에 표시
  const searchAndDisplayPlacesByCategory = (category) => {
    console.log(`Searching for category: ${category}`);
    clearMarkers();
    setSearchResults([]); // 검색 결과 초기화
    const places = new window.kakao.maps.services.Places();
    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(result); // 검색 결과를 상태에 저장
        result.forEach((place) => {
          let locPosition = new window.kakao.maps.LatLng(place.y, place.x);
          displayMarker(locPosition, place);
        });
      }
    };
    setSelectedCategory(category);
    let currentCenter = mapInstance.current.getCenter();
    let options = {
      location: currentCenter,
      radius: 1000, // 1km 반경 안의 위치 검색
    };
    places.keywordSearch(category, callback, options);
  };
  // 현재 위치를 업데이트하고 지도의 중심을 현재 위치로
  const updateCurrentLocation = () => {
    setLoading(true); // 현재 위치 업데이트를 시작하므로 로딩 상태를 true로 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let lat = position.coords.latitude,
            lon = position.coords.longitude;
          let locPosition = new window.kakao.maps.LatLng(lat, lon);
          mapInstance.current.setCenter(locPosition);
          clearMarkers();
          // 현재 위치를 업데이트 한 후에 마지막 선택된 장소를 검색
          searchAndDisplayPlacesByCategory(selectedCategory);
          // 현재 위치를 주소로 변환
          let geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(lon, lat, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              setCurrentAddress(
                result[0].address.road_address_name ||
                  result[0].address.address_name
              ); // 주소를 상태에 저장
            }
          });
          setLoading(false); // 현재 위치 업데이트가 완료되었으므로 로딩 상태를 false로 설정
        },
        function (error) {
          console.error(error);
          setLoading(false); // 현재 위치 업데이트에 실패했으므로 로딩 상태를 false로 설정
        }
      );
    } else {
      // 위치 정보를 사용할 수 없는 경우 기본 위치를 설정하고 해당 위치에 마커를 표시
      let locPosition = new window.kakao.maps.LatLng(37.56779, 126.98051),
        message = '현재 위치 사용 불가';
      displayMarker(locPosition, message);
      setLoading(false); // 현재 위치 업데이트에 실패했으므로 로딩 상태를 false로 설정
    }
  };
  // 컴포넌트가 마운트될 때 Kakao 지도를 초기화하고 현재 위치를 업데이트
  useEffect(() => {
    if (window.kakao && mapRef.current && !mapInstance.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.56779, 126.98051),
        level: 4,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };
      // 지도 인스턴스를 생성하고 mapInstance에 저장
      const map = new window.kakao.maps.Map(mapRef.current, mapOption);
      mapInstance.current = map;
      window.kakao.maps.event.addListener(
        mapInstance.current,
        'click',
        function () {
          markers.forEach((marker) => marker.infowindow.close());
        }
      );
      updateCurrentLocation();
    }

    console.log(loading);
  }, []);

  useEffect(() => {
    clearMarkers(); // 기존 마커 제거
    searchResults.forEach((result) => {
      let locPosition = new window.kakao.maps.LatLng(result.y, result.x);
      displayMarker(locPosition, result);
    });
  }, [clearMarkers, searchResults]);

  useEffect(() => {
    markers.forEach((marker) => {
      window.kakao.maps.event.addListener(marker, 'click', function () {
        markers.forEach((m) => m.infowindow.close());
        marker.infowindow.open(mapInstance.current, marker);
        setSelectedResult(marker.index);
      });
    });
  }, [markers]);

  // 지도가 로드되면 애니메이션 시작
  useEffect(() => {
    if (markers.length > 0) {
      setAnimation(true);
    }
  }, [markers]);

  // 카테고리 버튼 설정
  const categories = ['맛집', '한식', '일식', '중식', '양식', '패스트푸드'];
  const categoryButtons = categories.map((category) => (
    // 각 카테고리 버튼 클릭 시 해당 카테고리의 장소를 검색하고 결과를 지도에 표시
    <CategoryButton
      onClick={() => searchAndDisplayPlacesByCategory(category)}
      key={category}
    >
      <img src="/svg/map-icon.svg" alt="아이콘" />
      {category}
    </CategoryButton>
  ));

  const resultItems = searchResults.map((result, index) => {
    let locPosition = new window.kakao.maps.LatLng(result.y, result.x);
    return (
      <ResultItem
        key={result.id}
        style={selectedResult === index ? { backgroundColor: '#eee' } : {}}
        onClick={(e) => {
          markers.forEach((marker) => marker.infowindow.close());
          markers[index].infowindow.open(mapInstance.current, markers[index]);
          setSelectedResult(index);
          e.stopPropagation();
          mapInstance.current.panTo(locPosition);
          if (selectedResult === index) {
            setExpandedResult((prev) => (prev === index ? null : index));
          }
        }}
      >
        {result.place_name}{' '}
        {expandedResult === index && ( // 선택된 항목이면 추가 정보를 표시
          <iframe
            title="Expanded Result"
            src={`https://place.map.kakao.com/m/${result.id}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        )}
      </ResultItem>
    );
  });

  return (
    <MainWrap>
      <div>
        <Header iconSrc="/svg/header-back.svg" fnc="back" scrollNumber={10} />
        <div>
          {currentAddress && (
            <img src="/svg/map-location.svg" alt="위치아이콘" />
          )}
          {currentAddress && `현재 위치: ${currentAddress}`}
        </div>
      </div>
      {currentAddress === null ? (
        <div className="loading">
          <img src="/svg/loding.svg" alt="로딩이미지" />
          위치 정보를 불러오는 중입니다.
        </div>
      ) : null}
      <MapContainer>
        <ButtonContainer animate={animation}>{categoryButtons}</ButtonContainer>
        <Mapbox ref={mapRef} id="map"></Mapbox>
        <CurrentLocationButton
          animate={animation}
          onClick={() => {
            if (!loading) {
              updateCurrentLocation();
            }
          }}
        >
          <img src="/svg/location.svg" alt="현재위치" />
        </CurrentLocationButton>
        <SearchResults animate={animation} expandedResult={expandedResult}>
          <img src="/svg/main-logo-2.svg" alt="로고" />
          {resultItems}
        </SearchResults>
      </MapContainer>
      <Footer activeIcon="map" />
    </MainWrap>
  );
};

export default Map;
