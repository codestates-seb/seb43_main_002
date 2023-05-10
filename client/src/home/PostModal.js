import { useState } from 'react';
import {
  ModalWrap,
  ModalContent,
  ModalQurry,
  ModalInput,
  ModalCount,
  ModalCountbutton,
  ModalWhenInput,
  ModalWhoButtonWrap,
  ModalWhobutton,
  ModalText,
  ModalButtonWrap,
  ModalButton,
} from './ModalStyles';
import PropTypes from 'prop-types';
import Tag from './Tag';
import axios from 'axios';

const PostModal = ({ isOpen, onClose }) => {
  const [postBoard, setPostBoard] = useState({
    food: '',
    people: 0,
    when: '',
    who: '아무나',
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
    const { name, value } = e.target;
    setPostBoard({
      ...postBoard,
      [name]: value,
    });
  };

  const handleWhoChange = () => {
    switch (postBoard.who) {
      case '아무나':
        setPostBoard((prevBoard) => ({
          ...prevBoard,
          who: '여자만',
        }));
        break;
      case '여자만':
        setPostBoard((prevBoard) => ({
          ...prevBoard,
          who: '남자만',
        }));
        break;
      case '남자만':
        setPostBoard((prevBoard) => ({
          ...prevBoard,
          who: '아무나',
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/boards', postBoard);
      console.log('게시물이 성공적으로 작성되었습니다.');
      onClose();
    } catch (error) {
      console.error('게시물 작성 중 오류가 발생했습니다.', error);
    }
  };
  PostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  console.log(postBoard);
  return (
    <ModalWrap isOpen={isOpen}>
      <ModalContent onSubmit={handleSubmit}>
        <ModalQurry>같이 먹을 음식은?</ModalQurry>
        <ModalInput name="food" onChange={handleChange}></ModalInput>
        <ModalQurry>같이 먹을 인원은?</ModalQurry>
        <ModalCount name="people" onChange={handleChange}>
          <ModalCountbutton onClick={handleDecrement}>-</ModalCountbutton>
          <span>{postBoard.people}</span>
          <ModalCountbutton onClick={handleIncrement}>+</ModalCountbutton>
        </ModalCount>
        <ModalQurry>언제 먹을까?</ModalQurry>
        <ModalWhenInput name="when" onChange={handleChange}></ModalWhenInput>
        <ModalQurry>누구랑 먹을까?</ModalQurry>
        <ModalWhoButtonWrap>
          <ModalWhobutton onClick={handleWhoChange}></ModalWhobutton>
          <span>{postBoard.who}</span>
          <ModalWhobutton onClick={handleWhoChange}></ModalWhobutton>
        </ModalWhoButtonWrap>
        <ModalQurry>추가로 입력할 정보는?</ModalQurry>
        <ModalText name="content" onChange={handleChange}></ModalText>
        <Tag name="tag" onChange={handleChange}></Tag>
        <ModalButtonWrap>
          <ModalButton type="submit">작성하기</ModalButton>
          <ModalButton onClick={onClose}>취소하기</ModalButton>
        </ModalButtonWrap>
      </ModalContent>
    </ModalWrap>
  );
};

export default PostModal;
