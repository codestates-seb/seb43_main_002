/* eslint-disable prettier/prettier */
import { useState, useEffect, useRef } from 'react';
import {
  DayWrap,
  SelectedDay,
  WeekWrap,
  DayNumberWrap,
  SlideContainer,
  // SlideItem,
  BoardsWrap,
} from '../style/HomeStyle';
import EditModal from './EditModal';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, selectFilteredBoards } from '../store/boardSlice';
import { PopUp } from '../style/UserStateStyle';
import day from 'dayjs'
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';



const Days = () => {
  const navigate = useNavigate()
  const now = day();

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const dispatch = useDispatch();

  
  const [isModalOpenNew, setIsModalOpenNew] = useState(false);

  const closeModal = () => {
    setIsModalOpenNew(false);
  };
  const sixday = now.add(6, 'day');
  const [lastDate, setLastDate] = useState(sixday);


  const [currentDate, setCurrentDate] = useState(now);

  const today = currentDate.date();

  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
          const nextDate = currentDate.add(1, 'day');
          if (nextDate.date() === 1) {
            setCurrentDate(nextDate.add(1, 'month'));
            setLastDate(nextDate.add(6, 'day'));
          } else {
            setCurrentDate(nextDate);
          }
        } else if (e.deltaY < 0) {
          const preDate = currentDate.subtract(1, 'day');
          if (preDate.date() === day().date()) {
            setCurrentDate(preDate.subtract(1, 'month'));
            setLastDate(preDate.subtract(6, 'day'));
          } else {
            setCurrentDate(preDate);
          }
        }
        el.scrollTo({
          behavior: 'smooth',
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [currentDate, today, lastDate]);

  const reorderedDays = [
    ...daysOfWeek.slice(currentDate.day()),
    ...daysOfWeek.slice(0, currentDate.day()),
  ];

  const [selectedDateIndex, setSelectedDateIndex] = useState(today);

  useEffect(() => {
    
    dispatch(fetchBoards());
  }, [dispatch]);

  const [boardEffect, setBoardEffect] = useState(false);

  useEffect(() => {
    setBoardEffect(true);
  }, [selectedDateIndex]);
  
  const handleClick = (index) => {
    const selectedDay = today + index;
    const selectedDayAdjusted = selectedDay > currentDate.daysInMonth() ? selectedDay - currentDate.daysInMonth() : selectedDay;
  setSelectedDateIndex(selectedDayAdjusted);
    setBoardEffect(false); 
    // console.log(selectedDayAdjusted)
  };
  

    const filteredBoards = useSelector(selectFilteredBoards).filter((board) => {
      const boardDate = new Date(board.mealTime).getDate();
      return boardDate === selectedDateIndex;
    });

  const sortedBoards = filteredBoards.sort((a, b) => {
    const mealA = new Date(a.mealTime).getTime();
    const mealB = new Date(b.mealTime).getTime();
    return mealA - mealB;
  });


  const [popup, setPopup] = useState(false);
  const [selectBoard,setSelectBoard] =useState(null)
  const [selectComment,setSelectComment] =useState(null)

  // const selectBoard = useSelector((state)=>state.board.boards)
  // console.log(sortedBoards)
  const handlePopup = (boardId, commentId) => {
    setPopup(true);
    setSelectBoard(boardId)
    setSelectComment(commentId)
    console.log(boardId,commentId)
  };

  const handleSelect = () => {
    axiosInstance
    .patch(
      `/api/boards/${selectBoard}/comments/${selectComment}/select`
    )
    .then((res) => res.data);

  navigate(0);

    setPopup(!popup);
  };

  const handleRefuse = () => {
    axiosInstance
    .patch(
      `/api/boards/${selectBoard}/comments/${selectComment}/refuse`
    )
    .then((res) => res.data);
    
  navigate(0);

    setPopup(!popup);
  };

  return (
    <>
      <DayWrap ref={elRef}>
        <SlideContainer>
          {reorderedDays.map((el, idx) => {
            const dayNumber = today + idx;
            const isSelected = dayNumber === selectedDateIndex;
            return (
              <div className='part' key={idx}>
                <SelectedDay
                  id={idx}
                  el={el}
                  selected={isSelected}
                  onClick={() => handleClick(idx)}
                >
                  <WeekWrap>{el}</WeekWrap>
                  <DayNumberWrap selected={isSelected}>
                  {dayNumber > currentDate.daysInMonth() ? dayNumber - currentDate.daysInMonth() : dayNumber}
                  </DayNumberWrap>
                </SelectedDay>
              </div>
            );
          })}
        </SlideContainer>
      </DayWrap>
      {sortedBoards.length === 0 ? (
            <div className='none'>작성된 게시글이 없습니다.</div>
          ) : null}
      <div className={boardEffect ? 'boards slide-in' : 'boards slide-out'}>
        <BoardsWrap>
          {sortedBoards.map((board, idx) => (
            <Board key={idx} board={board}
            handlePopup={handlePopup} 
            setIsModalOpenNew={setIsModalOpenNew} 
            handleSelect={handleSelect}
            selectedDateIndex={selectedDateIndex}/>
          ))}
        </BoardsWrap>
      </div>
      <PopUp
            className={popup ? '' : 'hide'}
            // onClick={handleOpen}
          >
            {/* eslint-disable-next-line
                  jsx-a11y/click-events-have-key-events */}
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => e.stopPropagation()}
              className={popup ? 'scale-in' : 'scale-out'}
            >
              <ul>
                <li>
                  <h3>같이 식사 하실 건가요?</h3>
                </li>
                <li>식사를 원하시면 수락버튼을 눌러주세요</li>
                <li>
                  <button onClick={handleSelect}>수락</button>
                  <button onClick={handleRefuse}>거절</button>
                </li>
              </ul>
            </div>
          </PopUp>
      {sortedBoards.map((board, idx) => (
        <EditModal key={idx} isOpen={isModalOpenNew} onClose={closeModal} board={board} />
      ))}
    </>
  );
};

export default Days;
