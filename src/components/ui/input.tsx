import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { label: string; id: string }
>(({ className, type, label, id, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {/* Input */}
      <input
        id={id}
        type={type}
        ref={ref}
        className={cn(
          'peer flex h-12 w-full rounded-lg border border-[#b6c2cc] bg-gray-50 px-3 pt-3 text-md font-medium text-gray-900 placeholder-transparent focus:border-primary focus:outline-none',
          className,
        )}
        placeholder=" " // required for peer-placeholder-shown
        {...props}
      />

      {/* Label on border */}
      <label
        htmlFor={id}
        className="
          absolute left-3 -top-2.5 
          bg-gray-50 px-1 text-md font-medium text-gray-900 cursor-text
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-md
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary
          transition-all duration-200
        "
      >
        {label}
      </label>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
