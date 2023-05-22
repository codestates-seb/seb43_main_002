import { useState, useEffect, useRef } from 'react';
import {
  DayWrap,
  SelectedDay,
  WeekWrap,
  DayNumberWrap,
  SlideContainer,
  SlideItem,
  BoardsWrap,
} from '../style/HomeStyle';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, selectFilteredBoards } from '../store/boardSlice';
import PropTypes from 'prop-types';

const Days = () => {
  const now = new Date();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  // const dayOfWeek = now.getDay();
  const dispatch = useDispatch();
  Days.propTypes = {
    searchValue: PropTypes.string.isRequired,
  };

  // const [searchTerm, setSearchTermState] = useState(searchValue);

  // date를 앞뒤로 7일 씩 받아오기 -> state 저장?
  const [currentDate, setCurrentDate] = useState(now);
  const today = currentDate.getDate();
  console.log(currentDate);

  // 슬라이드 될 때 마다 새로운 date를 불러오기
  // 슬라이드 방식 휠
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        e.preventDefault();
        const scrollAmount = e.deltaY > 0 ? 1 : -1;
        const nextDate = new Date(currentDate);
        if (e.deltaY === 0) return;
        // Y축? deltaY -> 반환값 스크롤량을 나타내는 Double 자료형 숫자 반환 위로 스크롤: 음(-)의 숫자 반환 아래로 스크롤: 양(+)의 숫자 반환. 스크롤 안 하면: 0 반환.
        // 앞뒤로 최대 한번씩만 할 수 있는 변수
        else if (e.deltaY > 0) {
          // 아래로 스크롤 할 때 -> +의 숫자를 반환
          nextDate.setDate(currentDate.getDate() + scrollAmount * 7);
          setCurrentDate(nextDate);
        } else if (e.deltaY < 0) {
          // 위로 스크롤 할 때 -> -의 숫자를 반환
          const preDate = new Date(currentDate);
          preDate.setDate(currentDate.getDate() - scrollAmount * 7);
          setCurrentDate(preDate);
        }
        el.scrollTo({
          behavior: 'smooth',
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [currentDate]);

  const reorderedDays = [
    ...daysOfWeek.slice(currentDate),
    ...daysOfWeek.slice(0, currentDate),
  ];

  const [selectedDateIndex, setSelectedDateIndex] = useState(today);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleClick = (index) => {
    const selectedDay = today + index;
    setSelectedDateIndex(selectedDay);
  };

  // 검색어 변경 핸들러 함수를 추가합니다.
  // const handleSearchChange = (e) => {
  //   setSearchTermState(e.target.value);
  //   dispatch(setSearchTerm(e.target.value));
  // };

  // useSelector에서 selectFilteredBoards를 사용하여 검색 결과를 가져옵니다.
  const filteredBoards = useSelector(selectFilteredBoards).filter((board) => {
    const boardDate = new Date(board.mealTime).getDate();
    return boardDate === selectedDateIndex;
  });

  return (
    <>
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      /> */}
      <DayWrap ref={elRef}>
        <SlideContainer>
          {reorderedDays.map((el, idx) => {
            const dayNumber = today + idx;
            const isSelected = idx === selectedDateIndex;
            return (
              <SlideItem key={idx}>
                <SelectedDay
                  id={idx}
                  el={el}
                  selected={isSelected}
                  onClick={() => handleClick(idx)}
                >
                  <WeekWrap>{el}</WeekWrap>
                  <DayNumberWrap selected={isSelected}>
                    {dayNumber}
                  </DayNumberWrap>
                </SelectedDay>
              </SlideItem>
            );
          })}
        </SlideContainer>
      </DayWrap>
      <div className="boards">
        <BoardsWrap>
          {filteredBoards.map((board, idx) => (
            <Board key={idx} board={board} />
          ))}
        </BoardsWrap>
      </div>
    </>
  );
};

export default Days;
