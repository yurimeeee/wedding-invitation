'use client';

import 'react-calendar/dist/Calendar.css';

import { formatTime, formattedDate } from '@utils/func';

import Calendar from 'react-calendar';
import Countdown from './Countdown';
import React from 'react';
import { TemplatesData } from '@type/templates';
import WeddingDday from './WeddingDday';
import styled from '@emotion/styled';
import theme from '@styles/theme';

type WeddingCalendarProps = {
  weddingDate: string; // 'YYYY-MM-DD'
  date: TemplatesData['main']['date'];
  time: TemplatesData['main']['time'];
  calendar_display: TemplatesData['calendar_display'];
  countdown_display: TemplatesData['countdown_display'];
  d_day_display: TemplatesData['d_day_display'];
};

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 320px;
  padding: 16px 12px;
  background-color: white;
  border: none;
  font-family: 'SUITE Variable';
  font-weight: 400;
  color: ${theme.color.gray_700};
  .react-calendar__tile {
    pointer-events: none;
    cursor: default;
    &:hover {
      background-color: transparent !important;
      background: transparent !important;
    }
  }
  .react-calendar__navigation {
    display: none;
  }
  .react-calendar__navigation__label {
    pointer-events: none;
    cursor: default;
  }
  .react-calendar__navigation__arrow {
    display: none;
  }
  .react-calendar__month-view__days__day {
    :hover {
      background: none;
      background-color: none;
    }
  }
  .react-calendar__tile--now {
    background: none;
  }
  .react-calendar__month-view__weekdays__weekday {
    color: ${theme.color.gray_600};
    abbr {
      text-decoration: none;
    }
  }
  .react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend {
    color: ${theme.color.gray_700};
  }

  .react-calendar__tile--active {
    /* background: ${theme.color.pink100} !important; */
    background: #f7ece8 !important;
    color: ${theme.color.gray_700} !important;
  }

  .highlight {
    background: #ffeaa7;
    font-weight: bold;
    border-radius: 8px;
  }
`;
const isValidDate = (date: string) => {
  const d = new Date(date);
  return !isNaN(d.getTime());
};

const WeddingCalendar = React.memo(({ weddingDate, date, time, calendar_display, countdown_display, d_day_display }: WeddingCalendarProps) => {
  const wedding = isValidDate(weddingDate) ? new Date(weddingDate) : new Date();
  const tileClassName = ({ date }: { date: Date }) => {
    if (date.getFullYear() === wedding.getFullYear() && date.getMonth() === wedding.getMonth() && date.getDate() === wedding.getDate()) {
      return 'highlight';
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <p className="text-md mb-1 font-chosun">
        <span>{formattedDate(date) || '2025년 6월 24일 토요일'}</span>
        <span className="px-2">|</span>
        <span>{formatTime(time) || '오후 2시'}</span>
      </p>
      {calendar_display && <StyledCalendar tileClassName={tileClassName} value={wedding} formatDay={(_, date) => date.getDate().toString()} />}
      {countdown_display && <Countdown targetDate={wedding} />}
      {d_day_display && <WeddingDday targetDate={wedding} />}
    </div>
  );
});

export default WeddingCalendar;
