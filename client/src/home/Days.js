import { useState, useEffect } from 'react';
import {
  DayWrap,
  SelectedDay,
  WeekWrap,
  DayNumberWrap,
  BoardsWrap,
} from './HomeStyle';
import axios from 'axios';
import Board from './Board';

const Days = () => {
  const now = new Date();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const today = now.getDate();
  const dayOfWeek = now.getDay();

  // 현재 요일을 중심으로 요일 배열 재배열
  const reorderedDays = [
    ...daysOfWeek.slice(dayOfWeek),
    ...daysOfWeek.slice(0, dayOfWeek),
  ];

  const [selectedDateIndex, setSelectedDateIndex] = useState(today);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/boards')
      .then((res) => {
        setBoards(res.data);
      })
      .catch((error) => {
        console.error('게시글 불러오기 실패:', error);
      });
  }, []);

  const handleClick = (index) => {
    const selectedDay = today + index;
    setSelectedDateIndex(selectedDay);
  };

  console.log(selectedDateIndex);
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
