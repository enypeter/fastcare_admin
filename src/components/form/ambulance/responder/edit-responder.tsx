import {EditIcon, X} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Button} from '@/components/ui/button';

import {useState} from 'react';
import Success from '../../../../features/modules/dashboard/success';

type Props = {
  data?: any;
};

export default function EditResponder({data}: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(data);

  const handleSubmit = () => {
    setOpen(false);
    setOpenSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditIcon className="w-4 h-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b py-2">
            <span className="text-gray-800 text-xl font-normal py-3">
              Add New Responder
            </span>

            <button
              onClick={() => setOpen(false)}
              type="button"
              className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-scroll h-[400px] ">
          <div>
            {/* 2-column form */}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mt-6  ">
              <div>
                <label className="text-gray-800">Responder ID</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">Full Name</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">Professional License</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="valid">Valid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-gray-800">Certificate Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="valid">Valid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-gray-800">Phone Number </label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">Email</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div className="col-span-2 w-full">
                <label className="text-gray-800">Address</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center gap-4 mt-8">
          <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
            Submit
          </Button>
        </div>
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully edit the responder"
      />
    </Dialog>
  );
}
