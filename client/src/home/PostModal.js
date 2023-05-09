import { useState } from 'react';
import {
  ModalWrap,
  ModalContent,
  ModalHeadr,
  ModalInput,
  ModalPeople,
  ModalCount,
  ModalCountMbutton,
  ModalCountPbutton,
  ModalWhen,
  ModalWhenInput,
  ModalWho,
  ModalWhat,
  ModalText,
  ModalTag,
  ModalButtonWrap,
  ModalButton,
} from './ModalStyles';
import PropTypes from 'prop-types';

const PostModal = ({ isOpen, onClose }) => {
  const [postBoard, setPostBoard] = useState({
    food: '',
    people: 0,
    when: '',
    who: '',
    content: '',
    tag: '',
  });

  const handleIncrement = () => {
    setPostBoard((prevBoard) => ({
      ...prevBoard,
      people: prevBoard.people + 1,
    }));
  };

  const handleDecrement = () => {
    if (postBoard.people > 0) {
      setPostBoard((prevBoard) => ({
        ...prevBoard,
        people: prevBoard.people - 1,
      }));
    }
  };

  const handleChange = (e) => {
    setPostBoard({
      ...postBoard,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  PostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  console.log(postBoard);
  return (
    <ModalWrap isOpen={isOpen}>
      <ModalContent onSubmit={handleSubmit}>
        <ModalHeadr>같이 먹을 음식은?</ModalHeadr>
        <ModalInput name="food" onChange={handleChange}></ModalInput>
        <ModalPeople>같이 먹을 인원은?</ModalPeople>
        <ModalCount name="people" onChange={handleChange}>
          <ModalCountMbutton onClick={handleDecrement}>-</ModalCountMbutton>
          <span>{postBoard.people}</span>
          <ModalCountPbutton onClick={handleIncrement}>+</ModalCountPbutton>
        </ModalCount>
        <ModalWhen>언제 먹을까?</ModalWhen>
        <ModalWhenInput name="when" onChange={handleChange}></ModalWhenInput>
        <ModalWho>누구랑 먹을까?</ModalWho>
        <ModalWhenInput name="who" onChange={handleChange}></ModalWhenInput>
        <ModalWhat>추가로 입력할 정보는?</ModalWhat>
        <ModalText name="content" onChange={handleChange}></ModalText>
        <ModalTag name="tag" onChange={handleChange}></ModalTag>
        <ModalButtonWrap>
          <ModalButton type="submit">작성하기</ModalButton>
          <ModalButton onClick={onClose}>취소하기</ModalButton>
        </ModalButtonWrap>
      </ModalContent>
    </ModalWrap>
  );
};

export default PostModal;
