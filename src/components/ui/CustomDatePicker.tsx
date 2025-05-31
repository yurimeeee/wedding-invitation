'use client';

import * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';

import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import theme from '@styles/theme';

interface CustomDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date | undefined) => {
    onChange(date);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            // 레이아웃 및 정렬
            'inline-flex items-center justify-start w-full h-12 px-4 py-2 text-left',

            // 타이포그래피
            'text-sm !font-normal !font-suite text-text-default',

            // 색상 및 배경
            'bg-background hover:bg-white',

            // 보더 및 쉐도우
            // 'rounded-md shadow-md border-none',
            'rounded-md shadow-md border-none',

            // 포커스 및 인터랙션
            'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors cursor-pointer',

            // 비활성화 상태
            'disabled:pointer-events-none disabled:opacity-50',

            // 조건부 클래스
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" color={theme.color.gray_500} />
          {value ? format(value, 'PPP', { locale: ko }) : <span>일자를 선택해주세요</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
