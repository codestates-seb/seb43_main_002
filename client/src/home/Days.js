import { useState } from 'react';
import { DayWrap, SelectedDay, WeekWrap, DayNumberWrap } from './HomeStyle';

const Days = () => {
  const now = new Date();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const today = now.getDate();

  const [selectedDateIndex, setSelectedDateIndex] = useState(now.getDay());

  const startIdx = selectedDateIndex - 7 < 0 ? 0 : selectedDateIndex - 7;
  const endIdx =
    selectedDateIndex + 7 >= daysOfWeek.length
      ? daysOfWeek.length
      : selectedDateIndex + 7;

  const displayedDates = daysOfWeek.slice(startIdx, endIdx);

  console.log(endIdx);

  return (
    <DayWrap>
      {displayedDates.map((el, idx) => (
        <SelectedDay
          key={idx}
          id={startIdx + idx}
          el={el}
          selected={selectedDateIndex === startIdx + idx}
          onClick={() => setSelectedDateIndex(startIdx + idx)}
        >
          <WeekWrap>{el}</WeekWrap>
          <DayNumberWrap selected={selectedDateIndex === startIdx + idx}>
            {today + startIdx + idx}
          </DayNumberWrap>
        </SelectedDay>
      ))}
    </DayWrap>
  );
};

export default Days;
