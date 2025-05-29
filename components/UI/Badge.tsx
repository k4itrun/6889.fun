import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('group relative flex items-center justify-between overflow-hidden rounded-lg border border-gray-500/25 bg-gray-600/5 p-2.5 transition-all duration-200 hover:border-[var(--color-layout)] hover:shadow-xl dark:shadow-2xl', {
 variants: {
  size: {
   small: 'text-sm px-2 py-1',
   medium: 'px-2 py-1',
  },
 },
 defaultVariants: {
  size: 'medium',
 },
});

export const Badge: React.FC<React.ComponentPropsWithRef<'span'> & VariantProps<typeof badgeVariants>> = ({ children, size, className, ...props }) => {
 return (
  <span
   {...props}
   className={cn(badgeVariants({ size }), className)}
  >
   {children}
  </span>
 );
};
