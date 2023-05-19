import { FooterWrap, FooterIcon, FooterCicleWrap } from '../style/HomeStyle';
import { GrHomeRounded } from 'react-icons/gr';
import { MdOutlineFastfood } from 'react-icons/md';
import { BsBookmark, BsPlusCircleFill } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PostModal from './PostModal';

const Footer = () => {
  // const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // console.log(isModalOpen);
  return (
    <>
      <FooterWrap>
        <FooterIcon>
          <NavLink to="/api/boards">
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
