import {
  useState,
  // , useEffect
} from 'react';
// import { useNavigate } from 'react-router-dom';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchBoards, updateBoard } from '../store/boardSlice';
// import axiosInstance from '../axiosConfig';

const ModalDay = styled(DatePicker)`
  padding: 10px;
  height: 40px;
  width: 360px;
  font-size: 12pt;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  color: #505050;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
`;

const EditModal = ({ isOpen, onClose, board, editBoard }) => {
  EditModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    board: PropTypes.object.isRequired,
    editBoard: PropTypes.object.isRequired,
  };
  // const [filterBoard,setFilterBoard] = useState(board)

  const dispatch = useDispatch();

  // const isOpened = (board)=> {
  //   console.log(board)
  // }

  // const selectBoard = () => {
  //   axiosInstance.get(`/api/boards/${editBoard}`).then((res) => {
  //     const data = res.data;
  //     setEditedBoard({
  //       title: data.title,
  //       total: data.total,
  //       body: data.body,
  //       passedGender: data.passedGender,
  //       mealTime: data.mealTime,
  //       tags: data.tags,
  //     });
  //     console.log(editedBoard);
  //   });
  // };
  // console.log(selectBoard());
  // const selectedBoard = dispatch(selectBoard(editBoard));
  // console.log(selectedBoard);
  // console.log(editBoard);

  const [editedBoard, setEditedBoard] = useState({
    title: board.title,
    total: board.total,
    body: board.body,
    passedGender: board.passedGender,
    mealTime: board.mealTime,
    tags: [...board.tags],
  });

  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 60 * 60 * 1000)
  );

  // useEffect(() => {
  //   selectBoard();
  //   console.log(selectBoard());
  // }, []);

  const handleIncrement = (e) => {
    e.preventDefault();
    setEditedBoard((prevBoard) => ({
      ...prevBoard,
      total: prevBoard.total + 1,
    }));
  };

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
    const offset = date.getTimezoneOffset() * 60000; // 시간 오프셋(분 단위)을 밀리초로 변환
    const adjustedDate = new Date(date.getTime() - offset); // 시간 오프셋을 적용한 새로운 날짜 생성

    setStartDate(date);
    setEditedBoard((prevBoard) => ({
      ...prevBoard,
      mealTime: adjustedDate.toISOString(), // 서버로 전송할 ISO 8601 형식의 날짜 문자열로 변환
    }));
  };

  const handleWhoChange = (e) => {
    e.preventDefault();
    switch (editedBoard.passedGender) {
      case 'ANY':
        setEditedBoard((prevBoard) => ({
          ...prevBoard,
          passedGender: 'FEMALE',
        }));
        break;
      case 'FEMALE':
        setEditedBoard((prevBoard) => ({
          ...prevBoard,
          passedGender: 'MALE',
        }));
        break;
      case 'MALE':
        setEditedBoard((prevBoard) => ({
          ...prevBoard,
          passedGender: 'ANY',
        }));
        break;
      default:
        break;
    }
  };

  const genderMapping = {
    ANY: '누구나 참여 가능',
    FEMALE: '여성만 참여 가능',
    MALE: '남성만 참여 가능',
  };
  const displayedGender = genderMapping[editedBoard.passedGender];
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
        alert(`식사매너 지켜주실 거죠??`);
        dispatch(fetchBoards());
      });
  };

  // const navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };
  const shouldOpenModal = editBoard === board.boardId;
  return (
    <ModalWrap isOpen={isOpen && shouldOpenModal}>
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
          <ModalCountbutton onClick={handleDecrement}></ModalCountbutton>
          <span>{editedBoard.total}</span>
          <ModalPlusbutton onClick={handleIncrement}></ModalPlusbutton>
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
          <ModalWhobutton onClick={handleWhoChange} arrow="prev" />
          <span>{displayedGender}</span>
          <ModalWhobutton onClick={handleWhoChange} arrow="next" />
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
          <ModalButton type="submit">작성하기</ModalButton>
          <CancelButton onClick={handleCancel}>취소하기</CancelButton>
        </ModalButtonWrap>
      </ModalContent>
    </ModalWrap>
  );
};

export default EditModal;
