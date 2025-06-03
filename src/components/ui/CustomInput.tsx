// import * as React from 'react';

// import { cn } from '@/lib/utils';
// import { cva } from 'class-variance-authority';

// const inputVariants = cva(
//   'shadow-default text-text-default font-suite file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded border bg-white py-1 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-muted-foreground',
//   {
//     variants: {
//       size: {
//         sm: 'h-8 text-sm px-3 py-1.5',
//         md: 'h-10 text-sm px-3 py-2',
//         lg: 'h-10 text-base px-3 py-2.5',
//       },
//     },
//     defaultVariants: {
//       size: 'md',
//     },
//   }
// );

// type CustomInputProps = React.ComponentProps<'input'> & {
//   width?: string;
//   size?: 'sm' | 'md' | 'lg' | any;
//   placeholderClassName?: string;
// };

// function CustomInput({ className, width = '', size = 'md', placeholderClassName = '', type, value, defaultValue, ...props }: CustomInputProps) {
//   // value가 undefined일 경우 uncontrolled 유지
//   const isControlled = value !== undefined;

//   return (
//     <input
//       type={type}
//       data-slot="input"
//       // className={cn(inputVariants({ size }), width, placeholderClassName && `placeholder:${placeholderClassName}`, className)}
//       className={`flex bg-white w-full border !border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 shadow-md rounded-md border-none placeholder:text-tog-999 ${className}`}
//       {...props}
//       {...(isControlled ? { value } : { defaultValue })}
//     />
//   );
// }

// export { CustomInput, inputVariants };

import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const inputVariants = cva(
  'shadow-default text-text-default font-suite file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded border bg-white py-1 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm px-3 py-1.5',
        md: 'h-10 text-sm px-3 py-2',
        lg: 'h-10 text-base px-3 py-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type CustomInputProps = React.ComponentProps<'input'> & {
  width?: string;
  size?: 'sm' | 'md' | 'lg';
  placeholderClassName?: string;
};

function CustomInput({ className, width = '', size = 'md', placeholderClassName = '', type = 'text', value, defaultValue, ...props }: CustomInputProps) {
  const isControlled = value !== undefined && value !== null;

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size }), width, placeholderClassName && `placeholder:${placeholderClassName}`, className)}
      {...props}
      // @ts-ignore
      {...(isControlled ? { value } : { defaultValue })}
    />
  );
}

export { CustomInput, inputVariants };
