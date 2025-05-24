'use client';

import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';
import React from 'react';
import styled from '@emotion/styled';
import theme from '@styles/theme';

type WeddingCalendarProps = {
  weddingDate: string; // 'YYYY-MM-DD'
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

const WeddingCalendar = ({ weddingDate }: WeddingCalendarProps) => {
  const wedding = new Date(weddingDate);

  const tileClassName = ({ date }: { date: Date }) => {
    if (date.getFullYear() === wedding.getFullYear() && date.getMonth() === wedding.getMonth() && date.getDate() === wedding.getDate()) {
      return 'highlight';
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center">
      <StyledCalendar tileClassName={tileClassName} value={wedding} />
    </div>
  );
};

export default WeddingCalendar;
