import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useState } from "react";
import { Filter } from "lucide-react";

export const HmoFilter = ({ onApply, onReset }: any) => {
  const [enroleeType, setEnroleeType] = useState<string | undefined>();
  const [planType, setPlanType] = useState<string | undefined>();
  const [enroleeClass, setEnroleeClass] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const handleApply = () => {
    onApply({ enroleeType, planType, enroleeClass, date, status });
  };

  const handleReset = () => {
    setEnroleeType(undefined);
    setPlanType(undefined);
    setEnroleeClass(undefined);
    setDate(undefined);
    setStatus(undefined);
    onReset();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-gray-700 font-medium border border-gray-300 rounded-md gap-2 py-2 px-4">
          <Filter size={20} />
          Filter
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-6 w-[400px]">
        <div className="flex items-center justify-between mb-6 border-b py-3">
          <Label>Filter HMO</Label>

          <span onClick={handleReset} className="text-primary cursor-pointer">
            Reset filter
          </span>
        </div>
        {/* 2x2 Grid Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Enrolee Class */}
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue
                  className="text-gray-500"
                  placeholder="Select Status"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <input
              type="date"
              className="border border-gray-300 rounded-md py-2 px-3"
              value={date || ''}
              onChange={e => setDate(e.target.value || undefined)}
            />
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
