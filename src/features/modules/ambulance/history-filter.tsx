import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {useState} from 'react';

export const HistoryFilter = ({onApply, onReset}: any) => {
  const [time, setTime] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const handleApply = () => {
    onApply({time, status,});
  };

  const handleReset = () => {
    setTime(undefined);
    setStatus(undefined);
    onReset();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-36 py-2.5">Filter</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-6 w-[400px]">
        <div className="flex items-center justify-between mb-6 border-b py-3">
          <Label>Filter</Label>

          <span onClick={handleReset} className="text-primary cursor-pointer">
            Reset filter
          </span>
        </div>
        {/* 2x2 Grid Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

             {/* Date */}
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <input
              type="date"
              className="border border-gray-300 rounded-md py-2 px-3"
              value={time || ''}
              onChange={e => setTime(e.target.value || undefined)}
            />
          </div>
          

          
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

         
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-16">
          <Button className="py-2" onClick={handleApply}>
            Apply Filter
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
