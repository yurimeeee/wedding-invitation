import { useEffect, useState } from 'react';

import { differenceInCalendarDays } from 'date-fns';
import styled from '@emotion/styled';

type CountdownProps = {
  targetDate: Date;
};

const DateBox = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-grow: 1;
  padding: 16px 0;
  border-radius: 8px;
`;
export default function Countdown({ targetDate }: CountdownProps) {
  const [today, setToday] = useState(new Date());
  function calculateTimeLeft(target: Date) {
    const total = target.getTime() - new Date().getTime();

    const totalInSeconds = Math.floor(total / 1000);
    const days = Math.floor(totalInSeconds / (3600 * 24));
    const hours = Math.floor((totalInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalInSeconds % 3600) / 60);
    const seconds = totalInSeconds % 60;

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000); // 매초 갱신

    return () => clearInterval(timer);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  useEffect(() => {
    const timer = setInterval(() => setToday(new Date()), 60 * 1000); // 1분마다 갱신
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 ">
      {days >= 0 && (
        <div className="flex gap-3">
          <DateBox>
            <p className="text-2xl font-chosun">{days}</p>
            <p className="text-sm font-chosun text-gray-500">days</p>
          </DateBox>
          <DateBox>
            <p className="text-2xl font-chosun">{hours}</p>
            <p className="text-sm font-chosun text-gray-500">hours</p>
          </DateBox>
          <DateBox>
            <p className="text-2xl font-chosun">{minutes}</p>
            <p className="text-sm font-chosun text-gray-500">minutes</p>
          </DateBox>
          <DateBox>
            <p className="text-2xl font-chosun">{seconds}</p>
            <p className="text-sm font-chosun text-gray-500">seconds</p>
          </DateBox>
        </div>
      )}
    </div>
  );
}
