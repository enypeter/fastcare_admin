import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300',
  {
    variants: {
      variant: {
        completed: 'border border-green-100 bg-green-100/60 text-green-600',
        started: 'border border-primary/20 bg-primary/15 text-primary',
      },
    },
    defaultVariants: {
      variant: 'completed',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function CourseBadge({children, className, variant, ...props}: BadgeProps) {
  return (
    <div
      className={cn('w-fit', badgeVariants({variant}), className)}
      {...props}
    >
      <img
        src={`/images/${
          variant === 'completed'
            ? 'completed-badge'
            : variant === 'started'
            ? 'started-badge'
            : 'completed-badge.svg'
        }.svg`}
        alt=""
        className="mr-1"
      />
      {children}
    </div>
  );
}

export {CourseBadge};
