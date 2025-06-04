import { useEffect, useState } from 'react';

import { differenceInCalendarDays } from 'date-fns';

type CountdownProps = {
  targetDate: Date;
};

export default function DDAY({ targetDate }: CountdownProps) {
  const [today, setToday] = useState(new Date());
  const dDay = differenceInCalendarDays(targetDate, today);
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
    <div className="p-4">
      <p className="text-2xl mt-1 font-semibold text-primary font-suite">
        결혼식이{' '}
        {days > 0
          ? `${days}일 남았습니다`
          : days == 0
          ? `D-day`
          : `${Math.abs(days)}일 지났습니다
`}
      </p>
    </div>
  );
}
