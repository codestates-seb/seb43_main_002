import { useEffect, useRef } from 'react';
import { MainWrap } from '../home/HomeStyle';
import Header from '../home/Header';
import Footer from '../home/Footer';
import { Mapbox } from './MapStyle';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  function onSuccessGeolocation(position, map, infowindow) {
    const location = new window.naver.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    map.setCenter(location);
    map.setZoom(15);

    infowindow.setContent(
      '<div style="padding:20px;">geolocation.getCurrentPosition() 위치</div>'
    );

    infowindow.open(map, location);
    console.log('Coordinates: ' + location.toString());
  }

  function onErrorGeolocation(map, infowindow) {
    const center = map.getCenter();

    infowindow.setContent(
      '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>latitude: ' +
        center.lat() +
        '<br />longitude: ' +
        center.lng() +
        '</div>'
    );

    infowindow.open(map, center);
  }

  useEffect(() => {
    if (window.naver && mapRef.current && !mapInstance.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 7,
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      mapInstance.current = map;
    }

    if (mapInstance.current) {
      const infowindow = new window.naver.maps.InfoWindow();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            onSuccessGeolocation(position, mapInstance.current, infowindow),
          () => onErrorGeolocation(mapInstance.current, infowindow)
        );
      } else {
        onErrorGeolocation(mapInstance.current, infowindow);
      }
    }
  }, [mapRef.current]);

  return (
    <MainWrap>
      <Header></Header>
      <Mapbox ref={mapRef} id="map"></Mapbox>
      <Footer></Footer>
    </MainWrap>
  );
};

export default Map;
