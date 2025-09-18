import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export const RefundFilter = ({ onApply, onReset }: any) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [patient, setPatient] = useState<string>('');
  const [hospital, setHospital] = useState<string>('');

  const handleApply = () => {
    onApply({ startDate, endDate, status, type, patient, hospital });
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setStatus(null);
    setType(null);
    setPatient('');
    setHospital('');
    onReset();
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 py-3">
        <Label className="text-xl">Filter By</Label>
        <span onClick={handleReset} className="text-primary cursor-pointer">
          Reset filter
        </span>
      </div>

      {/* Grid Form */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Date range */}
        <div className='w-full'>
          <Label>Date</Label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="border border-gray-300 rounded-md py-2 px-3 w-full outline-none"
              value={startDate || ''}
              onChange={e => setStartDate(e.target.value || null)}
            />
            <p className="text-md font-medium">To</p>
            <input
              type="date"
              className="border border-gray-300 rounded-md py-2 px-3 w-full outline-none"
              value={endDate || ''}
              onChange={e => setEndDate(e.target.value || null)}
            />
          </div>
        </div>

        {/* Patient */}
        <div className="flex flex-col gap-2 w-full">
          <Label>Patient</Label>
          <input
            type="text"
            placeholder="Enter name"
            className="border border-gray-300 rounded-md py-2 px-3 w-full outline-none"
            value={patient}
            onChange={e => setPatient(e.target.value)}
          />
        </div>

      


        {/* Status */}
        <div className="flex flex-col gap-2 w-full">
          <Label>Status</Label>
          <Select value={status || ''} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <Button className="py-2.5 rounded-md w-44" onClick={handleApply}>
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};
