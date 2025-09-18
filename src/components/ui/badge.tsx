import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';
import {
  ApplicationStatusT,
  JobStatusT,
  PaymentStatusT,
  SubscriptionT,
  UserStatusT,
} from '@/types';
import { CheckIcon } from 'lucide-react';
import { CancelIcon } from './icons';

export type BadgeVariants =
  | UserStatusT
  | SubscriptionT
  | PaymentStatusT
  | ApplicationStatusT
  | JobStatusT;

const badgeVariants = cva(
  'inline-flex items-center rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 capitalize dark:border-gray-800 dark:focus:ring-gray-300',
  {
    variants: {
      variant: {
        pending: 'border border-amber-200 bg-amber-100 text-amber-500',
        PENDING: 'border border-amber-200 bg-amber-100 text-amber-500',
        CUSTOM: 'border border-amber-200 bg-amber-100 text-amber-500',
        ONGOING: 'border border-amber-200 bg-amber-100 text-amber-500',
        Accepted: 'border border-green-400 bg-green-100/60  text-green-600',
        DEFAULT: 'border border-primary bg-[#D8E2FF]  text-primary',
        COMPLETED: 'border border-green-400 bg-green-100/60  text-green-600',
        Rejected: 'border border-red-400 bg-red-100 text-red-500',
        CANCELLED: 'border border-red-400 bg-red-100 text-red-500',
        subscribed: 'border border-primary/20 bg-primary/15 text-primary',
        'not subscribed':
          'border border-neutral-200 bg-neutral-100 text-neutral-500',
        success: 'border border-green-100 bg-green-100/60 text-green-600',
         SUCCESS: 'border border-green-100 bg-green-100/60 text-green-600',
        failed: 'border border-red-200 bg-red-100 text-red-500',
        applied: 'border border-green-100 bg-green-100/60 text-green-600',
      },
    },
    defaultVariants: {
      variant: 'pending',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

    function Badge({ children, className, variant, ...props }: BadgeProps) {
      return (
        <div
          className={cn('w-fit', badgeVariants({variant}), className)}
          {...props}
        >
          {/* Icon or dot */}
          {variant === 'Accepted' ? (
            <CheckIcon className="mr-2 h-4 w-4 text-green-700 border border-green-700 rounded-full" />
          ) : variant === 'Rejected' ? (
            <CancelIcon className="mr-2 h-4 w-4 text-red-700  rounded-full" />
          ) : (
            <span
              className={cn(
                '',
                variant === 'pending' && 'bg-amber-500',
                variant === 'subscribed' && 'bg-primary',
                variant === 'not subscribed' && 'bg-neutral-500',
                variant === 'success' && 'bg-green-600',
                variant === 'failed' && 'bg-red-500',
                variant === 'applied' && 'bg-green-600',
                'bg-black', // fallback color
              )}
            />
          )}
          {children}
        </div>
      );
    }
    

export {Badge};
