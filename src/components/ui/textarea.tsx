import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({className, ...props}, ref) => {
  return (
    <textarea
      className={cn(
        'flex h-[150px] w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#070C1A] focus-visible:ring-offset-0 focus-visible:bg-sweetLime-10 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 text-neutral-900 resize-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export {Textarea};
