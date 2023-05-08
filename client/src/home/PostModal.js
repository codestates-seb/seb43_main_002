// import { useState } from 'react';
import { ModalWrap, ModalContent } from './ModalStyles';
import PropTypes from 'prop-types';

const PostModal = ({ isOpen, onClose }) => {
  PostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <ModalWrap isOpen={isOpen}>
      <ModalContent>
        {/* 모달 내용 */}
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalWrap>
  );
};

export default PostModal;
