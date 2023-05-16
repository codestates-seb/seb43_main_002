import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ModalWrap,
  ModalContent,
  ModalQurry,
  ModalInput,
  ModalCount,
  ModalCountbutton,
  ModalPlusbutton,
  ModalWhoButtonWrap,
  ModalWhobutton,
  ModalText,
  ModalButtonWrap,
  ModalButton,
  CancelButton,
} from './ModalStyles';
import PropTypes from 'prop-types';
import Tag from './Tag';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createBoard } from '../store/boardSlice';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const ModalDay = styled(DatePicker)`
  padding: 10px;
  margin-left: 10px;
  width: 340px;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
  border: none;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
`;

const PostModal = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [postBoard, setPostBoard] = useState({
    food: '',
    people: 0,
    when: startDate,
    who: '누구나 참여가능',
    content: '',
    tag: '',
    comment: [],
  });

  const handleIncrement = (e) => {
    e.preventDefault();
    setPostBoard((prevBoard) => ({
      ...prevBoard,
      people: prevBoard.people + 1,
    }));
  };

  const handleDecrement = (e) => {
    e.preventDefault();
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

  const handleDateChange = (date) => {
    setStartDate(date);
    setPostBoard((prevBoard) => ({
      ...prevBoard,
      when: date,
    }));
  };

  const handleWhoChange = (e) => {
    e.preventDefault();
    switch (postBoard.who) {
      case '누구나 참여가능':
        setPostBoard((prevBoard) => ({
          ...prevBoard,
          who: '여성만 참여가능',
        }));
        break;
      case '여성만 참여가능':
        setPostBoard((prevBoard) => ({
          ...prevBoard,
          who: '남성만 참여가능',
        }));
        break;
      case '남성만 참여가능':
        setPostBoard((prevBoard) => ({
          ...prevBoard,
          who: '누구나 참여가능',
        }));
        break;
      default:
        break;
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      postBoard.food === '' ||
      postBoard.people === 0 ||
      postBoard.content === ''
    ) {
      alert('모든 곳을 입력해주세요.');
      return;
    }

    dispatch(createBoard(postBoard))
      .unwrap()
      .then(() => {
        console.log('게시물이 성공적으로 작성되었습니다.');
        onClose();
        navigate(0);
      })
      .catch((error) => {
        console.error('게시물 작성 중 오류가 발생했습니다.', error);
      });
  };

  const navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  PostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    people: PropTypes.string.isRequired,
  };
  // console.log(startDate);

  return (
    <ModalWrap isOpen={isOpen}>
      <ModalContent onSubmit={handleSubmit}>
        <ModalQurry>같이 먹을 음식은?</ModalQurry>
        <ModalInput name="food" onChange={handleChange}></ModalInput>
        <ModalQurry>같이 먹을 인원은?</ModalQurry>
        <ModalCount name="people" onChange={handleChange}>
          <ModalCountbutton onClick={handleDecrement}>-</ModalCountbutton>
          <span>{postBoard.people}</span>
          <ModalPlusbutton onClick={handleIncrement}>+</ModalPlusbutton>
        </ModalCount>
        <ModalQurry>언제 먹을까?</ModalQurry>
        <ModalDay
          name="when"
          dateFormat="yyyy/MM/dd aa h시"
          selected={startDate}
          locale={ko}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH"
          timeIntervals={60}
          timeCaption="시간"
        />
        <ModalQurry>누구랑 먹을까?</ModalQurry>
        <ModalWhoButtonWrap>
          <ModalWhobutton onClick={handleWhoChange}>
            <BsArrowLeftShort />
          </ModalWhobutton>
          <span>{postBoard.who}</span>
          <ModalWhobutton onClick={handleWhoChange}>
            <BsArrowRightShort />
          </ModalWhobutton>
        </ModalWhoButtonWrap>
        <ModalQurry>추가로 입력할 정보는?</ModalQurry>
        <ModalText name="content" onChange={handleChange}></ModalText>
        <Tag name="tag" onChange={handleChange}></Tag>
        <ModalButtonWrap>
          <ModalButton type="submit">작성하기</ModalButton>
          <CancelButton onClick={handleCancel}>취소하기</CancelButton>
        </ModalButtonWrap>
      </ModalContent>
    </ModalWrap>
  );
};

export default PostModal;
