import { FooterWrap, FooterIcon, FooterCicleWrap } from './HomeStyle';
import { GrHomeRounded } from 'react-icons/gr';
import { MdOutlineFastfood } from 'react-icons/md';
import { BsBookmark, BsPlusCircleFill } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PostModal from './PostModal'; // 모달 컴포넌트 임포트

const Footer = () => {
  // const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlusClick = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <FooterWrap>
        <FooterIcon>
          <NavLink to="/boards">
            <GrHomeRounded />
          </NavLink>
          <NavLink to="/map">
            <MdOutlineFastfood />
          </NavLink>
        </FooterIcon>
        <FooterCicleWrap>
          <BsPlusCircleFill onClick={handlePlusClick} />
        </FooterCicleWrap>
        <FooterIcon>
          <NavLink to="/state">
            <BsBookmark></BsBookmark>
          </NavLink>
          <NavLink to="/mypage">
            <FaRegUserCircle></FaRegUserCircle>
          </NavLink>
        </FooterIcon>
      </FooterWrap>
      <PostModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Footer;
