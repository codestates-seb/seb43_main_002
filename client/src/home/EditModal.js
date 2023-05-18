import { useState, useEffect } from 'react';
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
// import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../store/boardSlice';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const ModalDay = styled(DatePicker)`
  padding: 10px;
  margin-left: 20px;
  width: 325px;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
`;

const EditModal = ({ isOpen, onClose, board }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [editedBoard, setEditedBoard] = useState({
    food: board.food,
    people: board.people,
    content: board.content,
  });

  //   console.log(editedBoard.tag);

  const handleIncrement = (e) => {
    e.preventDefault();
    setEditedBoard((prevBoard) => ({
      ...prevBoard,
      people: prevBoard.people + 1,
    }));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedBoard({ ...board });
    setStartDate(new Date());
  }, [board]);

  const handleDecrement = (e) => {
    e.preventDefault();
    if (editedBoard.people > 0) {
      setEditedBoard((prevBoard) => ({
        ...prevBoard,
        people: prevBoard.people - 1,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setEditedBoard((prevBoard) => ({
      ...prevBoard,
      when: date,
    }));
  };

  const handleWhoChange = (e) => {
    e.preventDefault();
    let updatedWho = '';

    switch (editedBoard.who) {
      case '누구나 참여가능':
        updatedWho = '여성만 참여가능';
        break;
      case '여성만 참여가능':
        updatedWho = '남성만 참여가능';
        break;
      case '남성만 참여가능':
        updatedWho = '누구나 참여가능';
        break;
      default:
        break;
    }

    setEditedBoard((prevBoard) => ({
      ...prevBoard,
      who: updatedWho,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      editedBoard.food === '' ||
      editedBoard.people === 0 ||
      editedBoard.content === ''
    ) {
      alert('모든 곳을 입력해주세요.');
      return;
    }

    dispatch(updateBoard({ boardId: board.id, board: editedBoard }))
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

  EditModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    board: PropTypes.object.isRequired,
  };

  return (
    <ModalWrap isOpen={isOpen}>
      <ModalContent isOpen={isOpen} onSubmit={handleSubmit}>
        <ModalQurry>같이 먹을 음식은?</ModalQurry>
        <ModalInput
          name="food"
          onChange={handleChange}
          value={editedBoard.food}
        ></ModalInput>
        <ModalQurry>같이 먹을 인원은?</ModalQurry>
        <ModalCount name="people" onChange={handleChange}>
          <ModalCountbutton onClick={handleDecrement}>-</ModalCountbutton>
          <span>{editedBoard.people}</span>
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
          <span>{editedBoard.who}</span>
          <ModalWhobutton onClick={handleWhoChange}>
            <BsArrowRightShort />
          </ModalWhobutton>
        </ModalWhoButtonWrap>
        <ModalQurry>추가로 입력할 정보는?</ModalQurry>
        <ModalText
          name="content"
          onChange={handleChange}
          value={editedBoard.content}
        ></ModalText>
        <Tag name="tag" onChange={handleChange} value={editedBoard.tag}></Tag>
        <ModalButtonWrap>
          <ModalButton type="submit">수정하기</ModalButton>
          <CancelButton onClick={handleCancel}>취소하기</CancelButton>
        </ModalButtonWrap>
      </ModalContent>
    </ModalWrap>
  );
};

export default EditModal;
