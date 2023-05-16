import { useState, useEffect } from 'react';
import {
  DayWrap,
  SelectedDay,
  WeekWrap,
  DayNumberWrap,
  BoardsWrap,
} from '../style/HomeStyle';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBoards,
  setSearchTerm,
  selectFilteredBoards,
} from '../store/boardSlice';

const Days = () => {
  const now = new Date();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const today = now.getDate();
  const dayOfWeek = now.getDay();
  const dispatch = useDispatch();

  // 검색어 상태를 관리하는 state를 추가합니다.
  const [searchTerm, setSearchTermState] = useState('');

  const reorderedDays = [
    ...daysOfWeek.slice(dayOfWeek),
    ...daysOfWeek.slice(0, dayOfWeek),
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
  const handleSearchChange = (e) => {
    setSearchTermState(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  // useSelector에서 selectFilteredBoards를 사용하여 검색 결과를 가져옵니다.
  const filteredBoards = useSelector(selectFilteredBoards).filter((board) => {
    const boardDate = new Date(board.when).getDate();
    return boardDate === selectedDateIndex;
  });

  return (
    <>
      {/* 검색어 입력 필드를 추가합니다. */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <DayWrap>
        {reorderedDays.map((el, idx) => {
          const dayNumber = today + idx;
          const isSelected = idx === selectedDateIndex;
          return (
            <SelectedDay
              key={idx}
              id={idx}
              el={el}
              selected={isSelected}
              onClick={() => handleClick(idx)}
            >
              <WeekWrap>{el}</WeekWrap>
              <DayNumberWrap selected={isSelected}>{dayNumber}</DayNumberWrap>
            </SelectedDay>
          );
        })}
      </DayWrap>
      <BoardsWrap>
        {filteredBoards.map((board, idx) => (
          <Board key={idx} board={board} />
        ))}
      </BoardsWrap>
    </>
  );
};

export default Days;
