import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Icons } from '@/components/UI/Icons';
import { cn } from '@/lib/utils';

export const buttonVariants = cva('group flex w-fit items-center rounded-md px-4 py-2 font-medium duration-200 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none', {
 variants: {
  variant: {
   primary: 'border-[var(--color-layout)] hover:border-[var(--color-layout)]/50 text-zinc-300 bg-[var(--color-layout)]/80 hover:bg-[var(--color-layout)]/90 dark:border-[var(--color-layout)] dark:hover:border-[var(--color-layout)]/50 dark:bg-[var(--color-layout)]/80 dark:hover:bg-[var(--color-layout)]/90',
   secondary: 'border-neutral-300 hover:border-neutral-300/50 bg-black/5 hover:bg-black/10 dark:border-neutral-800 dark:hover:border-neutral-800/50 dark:bg-gray-50/5 dark:hover:bg-gray-50/10',
   tertiary: 'border-neutral-300 hover:border-neutral-300/50 bg-black/5 hover:bg-black/10 dark:border-neutral-800 dark:hover:border-neutral-800/50 dark:bg-gray-50/5 dark:hover:bg-gray-50/10',
  },
 },
 defaultVariants: {
  variant: 'primary',
 },
});

export const Button = ({
 className,
 variant,
 asChild = false,
 ...props
}: React.ComponentPropsWithRef<'button'> &
 VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
 }) => {
 const Comp = asChild ? Slot : 'button';

 return (
  <Comp
   data-slot="button"
   className={cn(buttonVariants({ variant }), className || '')}
   {...props}
  />
 );
};

export const ButtonArrow = ({ className, ...props }: React.ComponentProps<typeof Icons.ArrowRight>) => (
 <Icons.ArrowRight
  className={cn('size-4 duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0', className)}
  {...props}
 />
);
