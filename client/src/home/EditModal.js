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
  CancelButton,
  ModalButton,
} from '../style/ModalStyles';
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
  height: 40px;
  width: 360px;
  font-size: 12pt;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  color: #505050;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
`;

const EditModal = ({ isOpen, onClose, board }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [editedBoard, setEditedBoard] = useState({
    title: board.title,
    total: board.total,
    body: board.body,
    passedGender: board.passedGender,
    mealTime: board.mealTime,
    tags: [...board.tags],
  });
  console.log(board.boardId);

  const handleIncrement = (e) => {
    e.preventDefault();
    setEditedBoard((prevBoard) => ({
      ...prevBoard,
      total: prevBoard.total + 1,
    }));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedBoard({ ...board });
    setStartDate(new Date());
  }, [board]);

  const handleDecrement = (e) => {
    e.preventDefault();
    if (editedBoard.total > 0) {
      setEditedBoard((prevBoard) => ({
        ...prevBoard,
        total: prevBoard.total - 1,
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
      mealTime: date,
    }));
  };

  const handleWhoChange = (e) => {
    e.preventDefault();
    let updatedWho = '';

    switch (editedBoard.passedGender) {
      case 'ANY':
        updatedWho = 'FEMALE';
        break;
      case 'FEMALE':
        updatedWho = 'MALE';
        break;
      case 'MALE':
        updatedWho = 'ANY';
        break;
      default:
        break;
    }

    setEditedBoard((prevBoard) => ({
      ...prevBoard,
      passedGender: updatedWho,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      editedBoard.title === '' ||
      editedBoard.total === 0 ||
      editedBoard.body === ''
    ) {
      alert('모든 곳을 입력해주세요.');
      return;
    }
    dispatch(updateBoard({ boardId: board.boardId, board: editedBoard }))
      .unwrap()
      .then(() => {
        onClose();
        navigate(0);
      })
      .catch((error) => {});
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
        <div></div>
        <ModalQurry>같이 먹을 음식은?</ModalQurry>
        <ModalInput
          name="title"
          onChange={handleChange}
          value={editedBoard.title}
        ></ModalInput>
        <ModalQurry>같이 먹을 인원은?</ModalQurry>
        <ModalCount name="total" onChange={handleChange}>
          <ModalCountbutton onClick={handleDecrement}>-</ModalCountbutton>
          <span>{editedBoard.total}</span>
          <ModalPlusbutton onClick={handleIncrement}>+</ModalPlusbutton>
        </ModalCount>
        <ModalQurry>언제 먹을까?</ModalQurry>
        <ModalDay
          name="mealTime"
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
          <span>{editedBoard.passedGender}</span>
          <ModalWhobutton onClick={handleWhoChange}>
            <BsArrowRightShort />
          </ModalWhobutton>
        </ModalWhoButtonWrap>
        <ModalQurry>추가로 입력할 정보는?</ModalQurry>
        <ModalText
          name="body"
          onChange={handleChange}
          value={editedBoard.body}
        ></ModalText>
        <Tag
          name="tags"
          tagList={editedBoard.tags}
          setTagList={(tagList) =>
            setEditedBoard((prevBoard) => ({ ...prevBoard, tags: tagList }))
          }
          onChange={handleChange}
          value={editedBoard.tags}
        ></Tag>
        <ModalButtonWrap>
          <ModalButton type="submit">수정하기</ModalButton>
          <CancelButton onClick={handleCancel}>취소하기</CancelButton>
        </ModalButtonWrap>
      </ModalContent>
    </ModalWrap>
  );
};

export default EditModal;
