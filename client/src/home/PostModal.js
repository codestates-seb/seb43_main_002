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
import { createBoard } from '../store/boardSlice';

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

const PostModal = ({ isOpen, onClose }) => {
  // const now = new Date()
  // const options = { timeZone: 'Asia/Seoul'};
  // const koreaTime = now.toLocaleString('en-US', options)
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 60 * 60 * 1000)
  );
  const [tagList, setTagList] = useState([]);

  // useEffect(() => {
  //   setPostBoard((prevState) => ({
  //     ...prevState,
  //     tags: [...tagList],
  //   }));
  // }, [tagList]);

  const [postBoard, setPostBoard] = useState({
    title: '',
    body: '',
    total: 2,
    passedGender: 'ANY',
    mealTime: startDate,
    tags: [...tagList],
  });

  const dispatch = useDispatch();

  const handleIncrement = (e) => {
    e.preventDefault();
    setPostBoard((prevBoard) => ({
      ...prevBoard,
      total: prevBoard.total + 1,
    }));
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (postBoard.total > 0) {
      setPostBoard((prevBoard) => ({
        ...prevBoard,
        total: prevBoard.total - 1,
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
    const offset = date.getTimezoneOffset() * 60000; // 시간 오프셋(분 단위)을 밀리초로 변환
    const adjustedDate = new Date(date.getTime() - offset); // 시간 오프셋을 적용한 새로운 날짜 생성

    setStartDate(date);
    setPostBoard((prevBoard) => ({
      ...prevBoard,
      mealTime: adjustedDate.toISOString(), // 서버로 전송할 ISO 8601 형식의 날짜 문자열로 변환
    }));
  };

  const handleWhoChange = (e) => {
    e.preventDefault();
    switch (postBoard.passedGender) {
      case 'ANY':
        setPostBoard((prevBoard) => ({
          ...prevBoard,
          passedGender: 'FEMALE',
        }));
        break;
      case 'FEMALE':
        setPostBoard((prevBoard) => ({
          ...prevBoard,
          passedGender: 'MALE',
        }));
        break;
      case 'MALE':
        setPostBoard((prevBoard) => ({
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
  const displayedGender = genderMapping[postBoard.passedGender];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      postBoard.title === '' ||
      postBoard.total === 0 ||
      postBoard.body === ''
    ) {
      alert('모든 곳을 입력해주세요.');
      return;
    }
    dispatch(createBoard(postBoard))
      .unwrap()
      .then(() => {
        onClose();
        alert(`식사매너 지켜주실 거죠??`);
        navigate(0);
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
  };

  return (
    <ModalWrap isOpen={isOpen}>
      <ModalContent isOpen={isOpen} onSubmit={handleSubmit}>
        <div></div>
        <ModalQurry>같이 먹을 음식은?</ModalQurry>
        <ModalInput
          placeholder="함께하고 싶은 음식을 적어주세요"
          name="title"
          onChange={handleChange}
        ></ModalInput>
        <ModalQurry>같이 먹을 인원은?</ModalQurry>
        <ModalCount name="total" onChange={handleChange}>
          <ModalCountbutton onClick={handleDecrement}></ModalCountbutton>
          <span>{postBoard.total}</span>
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
          placeholder="추가로 입력해야 할 사항들을 적어주세요"
          name="body"
          onChange={handleChange}
        ></ModalText>
        <Tag
          name="tags"
          value={postBoard.tags}
          tagList={tagList}
          setTagList={setTagList}
          onChange={handleChange}
        ></Tag>
        <ModalButtonWrap>
          <ModalButton type="submit">작성하기</ModalButton>
          <CancelButton onClick={handleCancel}>취소하기</CancelButton>
        </ModalButtonWrap>
      </ModalContent>
    </ModalWrap>
  );
};

export default PostModal;
