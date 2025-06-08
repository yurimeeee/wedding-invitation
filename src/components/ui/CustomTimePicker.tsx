'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { useEffect, useState } from 'react';

import { Button } from '@components/ui/button';
import { Clock4 as ClockIcon } from 'lucide-react';
import { CustomSelect } from './select';
import { cn } from '@/lib/utils';
import theme from '@styles/theme';

interface CustomTimePickerProps {
  value?: string;
  onChange: (type: 'hour' | 'minute', value: string) => void;
  className?: string;
}

export function CustomTimePicker({ value, onChange, className }: CustomTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState<string>('12');
  const [minute, setMinute] = useState<string>('00');

  useEffect(() => {
    if (value) {
      const [h, m] = value?.split(':');
      setHour(h.padStart(2, '0'));
      setMinute(m.padStart(2, '0'));
    }
  }, [value]);

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const h = String(i).padStart(2, '0');
    return { label: h, value: h };
  });

  const minuteOptions = Array.from({ length: 60 }, (_, i) => {
    const m = String(i).padStart(2, '0');
    return { label: m, value: m };
  });

  const handleHourChange = (newHour: string) => {
    const timeStr = `${newHour}:${minute}:00`;
    setHour(newHour);
    onChange('hour', timeStr);
  };

  const handleMinuteChange = (newMinute: string) => {
    const timeStr = `${hour}:${newMinute}:00`;
    setMinute(newMinute);
    onChange('minute', timeStr);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'inline-flex items-center justify-start w-full h-12 px-4 py-2 text-left',
            'text-sm !font-normal !font-suite text-text-default',
            'bg-background hover:bg-white',
            'rounded-md shadow-md border-none',
            'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors cursor-pointer',
            'disabled:pointer-events-none disabled:opacity-50',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <ClockIcon className="mr-2 h-4 w-4" color={theme.color.gray_500} />
          {value ? value?.slice(0, 5) : '시간을 선택해주세요'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto flex gap-2 p-4">
        <CustomSelect value={hour} onChange={handleHourChange} options={hourOptions} className="max-w-[80px]" />
        <span className="flex items-center">:</span>
        <CustomSelect value={minute} onChange={handleMinuteChange} options={minuteOptions} className="max-w-[80px]" />
      </PopoverContent>
    </Popover>
  );
}
