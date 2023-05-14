import { useState, useEffect } from 'react';
import {
  DayWrap,
  SelectedDay,
  WeekWrap,
  DayNumberWrap,
  BoardsWrap,
} from './HomeStyle';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from '../store/boardSlice';

const Days = () => {
  const now = new Date();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const today = now.getDate();
  const dayOfWeek = now.getDay();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board.boards);

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

  const filteredBoards = boards.filter((board) => {
    const boardDate = new Date(board.when).getDate();
    return boardDate === selectedDateIndex;
  });

  return (
    <>
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
