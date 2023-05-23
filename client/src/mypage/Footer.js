/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FooterWrap,
  FooterIcon,
  FooterCicleWrap,
  MainIcon,
} from '../style/NewHeaderFooterStyle';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PostModal from '../home/PostModal'; // 모달 컴포넌트 임포트

// eslint-disable-next-line react/prop-types
const Footer = ({ activeIcon }) => {
  const [homeHovered, setHomeHovered] = useState(activeIcon === 'home');
  const [mapHovered, setMapHovered] = useState(activeIcon === 'map');
  const [cicleHovered, setCicleHovered] = useState(true);
  const [stateHovered, setStateHovered] = useState(activeIcon === 'state');
  const [mypageHovered, setMypageHovered] = useState(activeIcon === 'mypage');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const myPageId = JSON.parse(sessionStorage.getItem('user')).memberId;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMouseEnter = () => {
    setCicleHovered(false);
  };

  const handleMouseLeave = () => {
    setCicleHovered(true);
  };

  const handlePlusClick = () => {
    navigate('/boards');
    setIsModalOpen(true);
  };

  return (
    <>
      <FooterWrap>
        <FooterIcon>
          <NavLink
            to="/api/boards"
            onMouseEnter={() => setHomeHovered(true)}
            onMouseLeave={() => {
              if (activeIcon !== 'boards') {
                setHomeHovered(false);
              }
            }}
          >
            <MainIcon
              backgroundImage={
                homeHovered ? '/svg/footer-home-2.svg' : '/svg/footer-home.svg'
              }
            />
          </NavLink>
          <NavLink
            to="/map"
            onMouseEnter={() => setMapHovered(true)}
            onMouseLeave={() => {
              if (activeIcon !== 'map') {
                setMapHovered(false);
              }
            }}
          >
            <MainIcon
              backgroundImage={
                mapHovered ? '/svg/footer-map-2.svg' : '/svg/footer-map.svg'
              }
            />
          </NavLink>
        </FooterIcon>
        <FooterCicleWrap
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isHovered={cicleHovered}
        >
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div role="button" onClick={handlePlusClick} />
        </FooterCicleWrap>
        <FooterIcon>
          <NavLink
            to="/state"
            onMouseEnter={() => setStateHovered(true)}
            onMouseLeave={() => {
              if (activeIcon !== 'state') {
                setStateHovered(false);
              }
            }}
          >
            <MainIcon
              backgroundImage={
                stateHovered
                  ? '/svg/footer-state-2.svg'
                  : '/svg/footer-state.svg'
              }
            />
          </NavLink>
          <NavLink
            to={`/mypage/${myPageId}`}
            onMouseEnter={() => setMypageHovered(true)}
            onMouseLeave={() => {
              if (activeIcon !== 'mypage') {
                setMypageHovered(false);
              }
            }}
          >
            <MainIcon
              backgroundImage={
                mypageHovered
                  ? '/svg/footer-mypage-2.svg'
                  : '/svg/footer-mypage.svg'
              }
            />
          </NavLink>
        </FooterIcon>
      </FooterWrap>
      <PostModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Footer;
