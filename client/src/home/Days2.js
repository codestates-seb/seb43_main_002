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
import day from 'dayjs'

const Days = () => {
  const now = new Date();

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  // const dayOfWeek = now.getDay();
  const dispatch = useDispatch();
  const a = day();
  const b = a.format()
  // const sixday = a.add(6,'day').format()

  console.log('dayjs',a)
  console.log('dayjs',b)
  console.log('datejs',now)
  // console.log('6dayjs',c)
  
  const [isModalOpenNew, setIsModalOpenNew] = useState(false);

  const closeModal = () => {
    setIsModalOpenNew(false);
  };


  // const [searchTerm, setSearchTermState] = useState(searchValue);

  // date를 앞뒤로 7일 씩 받아오기 -> state 저장?
  const [currentDate, setCurrentDate] = useState(now);
  // const [lastDate, setLastDate] = useState(sixday);
  const today = currentDate.getDate();
  // const lastDayOfMonth = new Date(
  //   currentDate.getFullYear(),
  //   currentDate.getMonth() + 1,
  //   0
  // ).getDate();
  // console.log('today:', sixday);
  // 슬라이드 될 때 마다 새로운 date를 불러오기
  // 슬라이드 방식 휠
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        e.preventDefault();
        // const scrollAmount = e.deltaY > 0 ? 1 : -1;
        const nextDate = new Date(currentDate);
        // currentDate.setDate(currentDate.getDate() + 6);
        // const sixDate = new Date(currentDate);
        // console.log(sixDate);
        // Y축? deltaY -> 반환값 스크롤량을 나타내는 Double 자료형 숫자 반환 위로 스크롤: 음(-)의 숫자 반환 아래로 스크롤: 양(+)의 숫자 반환. 스크롤 안 하면: 0 반환.
        // 앞뒤로 최대 한번씩만 할 수 있는 변수
        if (e.deltaY > 0) {
          // 아래로 스크롤 할 때 -> +의 숫자를 반환
          // const lastDayOfMonth = new Date(
          //   nextDate.getFullYear(),
          //   nextDate.getMonth() + 1,
          //   0
          // ).getDate();
          nextDate.setDate(currentDate.getDate() + 1);
          // if(sixday === )
          if (nextDate.getMonth() !== currentDate.getMonth()) {
            nextDate.setDate(1);
            nextDate.setMonth(currentDate.getMonth() + 1);
          }
          setCurrentDate(nextDate);
        } else if (e.deltaY < 0) {
          // 위로 스크롤 할 때 -> -의 숫자를 반환
          const preDate = new Date(currentDate);
          preDate.setDate(currentDate.getDate() - 1);

          setCurrentDate(preDate);
        }
        el.scrollTo({
          behavior: 'smooth',
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [currentDate, today]);

  const reorderedDays = [
    ...daysOfWeek.slice(currentDate.getDay()),
    ...daysOfWeek.slice(0, currentDate.getDay()),
  ];

  const [selectedDateIndex, setSelectedDateIndex] = useState(today);

  useEffect(() => {
    
    dispatch(fetchBoards());
  }, [dispatch]);

  // HN
  const [boardEffect, setBoardEffect] = useState(false);

  useEffect(() => {
    setBoardEffect(true);
  }, [selectedDateIndex]);
  
  const handleClick = (index) => {
    const selectedDay = today + index;
    setSelectedDateIndex(selectedDay);
    setBoardEffect(false); 
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
  // const boardexp = useSelector((state) => state.board.boards);
  // console.log(selectedDateIndex);
  
  const sortedBoards = filteredBoards.sort((a, b) => {
    const mealA = new Date(a.mealTime).getTime();
    const mealB = new Date(b.mealTime).getTime();
    return mealA - mealB;
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
                    {dayNumber}
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
            <Board key={idx} board={board} setIsModalOpenNew={setIsModalOpenNew} selectedDateIndex={selectedDateIndex}/>
          ))}
        </BoardsWrap>
      </div>

      {sortedBoards.map((board, idx) => (
        <EditModal key={idx} isOpen={isModalOpenNew} onClose={closeModal} board={board} />
      ))}
    </>
  );
};

export default Days;
