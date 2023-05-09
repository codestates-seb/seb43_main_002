import { DayWrap, SelectedDay, WeekWrap, DayNumberWrap } from './HomeStyle';
// import { useState, useEffect, useRef } from 'react';

const now = new Date();
const todayWeak = now.getDay();
const today = now.getDate();
// const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

const Days = () => {
  return (
    <DayWrap>
      <SelectedDay>
        <WeekWrap>{todayWeak}</WeekWrap>
        <DayNumberWrap>{today}</DayNumberWrap>
      </SelectedDay>
    </DayWrap>
  );
};

export default Days;
