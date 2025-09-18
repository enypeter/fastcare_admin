import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Filter } from "lucide-react";

export const IndividualFilterDropdown = ({ onApply, onReset }: any) => {
  const [enroleeType, setEnroleeType] = useState<string | undefined>();
  const [planType, setPlanType] = useState<string | undefined>();
  const [enroleeClass, setEnroleeClass] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();

  const handleApply = () => {
    onApply({ enroleeType, planType, enroleeClass, date, gender });
  };

  const handleReset = () => {
    setEnroleeType(undefined);
    setPlanType(undefined);
    setEnroleeClass(undefined);
    setDate(undefined);
    setGender(undefined);
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
          <Label>Filter Enrolees</Label>

          <span onClick={handleReset} className="text-primary cursor-pointer">
            Reset filter
          </span>
        </div>
        {/* 2x2 Grid Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Enrolee Type */}
          <div className="flex flex-col gap-2">
            <Label>Enrolee Type</Label>
            <Select value={enroleeType} onValueChange={setEnroleeType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Plan Type */}
          <div className="flex flex-col gap-2">
            <Label>Plan Type</Label>
            <Select value={planType} onValueChange={setPlanType}>
              <SelectTrigger>
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enrolee Class */}
          <div className="flex flex-col gap-2">
            <Label>Enrolee Class</Label>
            <Select value={enroleeClass} onValueChange={setEnroleeClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
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

          {/* Gender */}
          <div className="col-span-2 flex flex-col gap-2 ">
            <Label>Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={setGender}
              className="flex gap-6"
            >
              <div className="flex items-center gap-4">
                <RadioGroupItem className="w-5 h-5" value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center gap-4 ">
                <RadioGroupItem
                  className="w-5 h-5"
                  value="female"
                  id="female"
                />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
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
