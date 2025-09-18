import { cn } from '@/lib/utils';
import { LeftArrowIcon, RightArrowIcon } from './icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  totalEntriesSize: number;
  currentEntriesSize: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

export const Pagination = ({
  totalEntriesSize,
  totalPages,
  currentPage,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: Props) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalEntriesSize);

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 w-full  pt-4">
      {/* Left side: showing entries */}
      <p className="text-sm text-neutral-900">
        Showing {startItem} - {endItem} of {totalEntriesSize}
      </p>

      {/* Right side: page navigation */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-neutral-700">Page</span>

        {/* Results Per Page Dropdown */}
        <Select
          value={pageSize.toString()}
          onValueChange={val => onPageSizeChange(Number(val))}
        >
          <SelectTrigger className="w-[80px] h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map(size => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Pagination Arrows */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full  disabled:opacity-50"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <LeftArrowIcon
              className={cn(
                'w-5 h-5',
                currentPage === 1 ? 'text-gray-900' : 'text-gray-900',
              )}
            />
          </button>

          <span className="text-sm font-semibold">{currentPage}</span>

          <button
            className="flex items-center justify-center w-8 h-8 rounded-full disabled:opacity-50"
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            <RightArrowIcon
              className={cn(
                'w-5 h-5',
                currentPage === totalPages ? 'text-gray-900' : 'text-gray-900',
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
