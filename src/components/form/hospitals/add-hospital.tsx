import {ImageIcon, X} from 'lucide-react';
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
import {Switch} from '@/components/ui/switch';

export default function AddHospital() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRegInput, setShowRegInput] = useState(false);

  const handleSubmit = () => {
    setOpenSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-3 w-36 rounded-md">Add Hospital</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b py-2">
            <span className="text-gray-800 text-2xl font-normal py-3">
              Add Hospital
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
                <label className="text-gray-800">Hospital code</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">Hospital name</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">
                  Virtual Consultation service fee
                </label>
                <input
                  placeholder="#0.00"
                  className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-800">
                  Physical consultation service fee
                </label>
                <input
                  placeholder="#0.00"
                  className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-800">Phone number</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">Email address</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">Hospital address</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">Website Url</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg text-gray-800">
                  Registration service fee
                </h1>
                <Switch
                  checked={showRegInput}
                  onCheckedChange={setShowRegInput}
                />
              </div>

              {showRegInput && (
                <div className="mt-3">
                  <input
                    placeholder="#0.00"
                    className="w-full  border-gray-300 border rounded-lg px-3 py-3 outline-none"
                  />
                </div>
              )}
            </div>

            <div className="my-8">
              <div>
                <label className="text-gray-800">Hospital Ip address</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-gray-800">Logo content</label>

              <div className="flex ">
                <label
                  htmlFor="passport-upload"
                  className="border-2 border-gray-300 rounded-lg w-full lg:w-[500px]   h-64 flex flex-col items-center justify-center text-center cursor-pointer  transition"
                >
                  <ImageIcon className="w-14 h-14 mb-4 text-gray-500" />
                  <p className="mb-4 font-medium text-lg text-gray-700">
                    Drag and Drop to upload a passport photo
                  </p>
                  {/* <p className="text-lg font-medium text-gray-700 ">
                    or <span className="text-primary">browse</span> to select a
                    PNG file
                  </p> */}
                  <input
                    id="passport-upload"
                    type="file"
                    accept="image/png"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center gap-4 mt-8">
          <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
            Add hospital
          </Button>
        </div>
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully added a new Hospital"
      />
    </Dialog>
  );
}
