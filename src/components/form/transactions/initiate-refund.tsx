import {Download, X} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

import {useState} from 'react';
import Success from '../../../features/modules/dashboard/success';

export default function InitiateARefund() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpenSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-3 w-36 rounded-md">Initiate a refund</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b py-2">
            <span className="text-gray-800 text-2xl font-normal py-3">
              Initiate a refund
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

        <div className="overflow-scroll h-[450px] ">
          <div>
            {/* 2-column form */}
            <div className="grid grid-cols-1   gap-6 mt-6  ">
              <div>
                <label className="text-gray-800">Transaction ID</label>
                <input
                  placeholder="Enter"
                  className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-2 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-800">Patient name</label>
                <input
                  placeholder="Enter"
                  className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-2 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-800">Refund amount</label>
                <input
                  placeholder="#0.00"
                  className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-2 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-800">Reason for refund</label>
                <textarea
                  rows={4}
                  placeholder="write..."
                  className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-2 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-800">Extra document</label>

              <div className="flex  mt-2 ">
                <label
                  htmlFor="passport-upload"
                  className="border-2 border-dashed border-primary rounded-lg w-full py-6 flex flex-col items-center justify-center text-center cursor-pointer  transition"
                >
                  <Download className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-4 font-medium text-lg text-gray-700">
                    Drag and Drop to upload a passport photo
                  </p>
                  <p className="text-lg  text-gray-700 ">
                    or{' '}
                    <span className="text-primary font-semibold">browse</span>{' '}
                    to select a PNG file
                  </p>
                  <input
                    id="passport-upload"
                    type="file"
                    accept="image/png"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="bg-gray-200  px-4 mt-4 rounded-md mb-6">
              <div className=''>
                <h1 className='text-gray-900 text-xl  py-4'>Important</h1>

                <p className='text-gray-700 text-md font-normal pb-4'>
                  Refunding this transaction will credit the patient wallet.
                  This will take between 2-5 working days for the patient to
                  recieve the money in their wallet.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center gap-4 mt-8">
          <Button
            variant="link"
            onClick={() => setOpen(false)}
            className="py-3 w-48 rounded-md bg-gray-300 border-none"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
            Refund
          </Button>
        </div>
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully submitted a refund request"
      />
    </Dialog>
  );
}
