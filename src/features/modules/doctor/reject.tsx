import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { X } from 'lucide-react';
import { useState } from 'react';
import Success from '../dashboard/success';

type Doctor = {
  name: string;
  // add other fields if needed
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: Doctor;
};

export default function Reject({ open, setOpen, data }: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSuccess = () => {
    setOpenSuccess(true);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-6">
          <DialogHeader className="flex items-end justify-end gap-4">
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="border border-gray-600 rounded-full "
            >
              <X className="text-neutral-600 hover:text-neutral-600" />
            </button>
          </DialogHeader>

          <div className="flex flex-col gap-8 mt-8">
            <h1 className="text-center text-xl font-semibold text-gray-700">
              Reject {data?.name || ''}
            </h1>
            <p className="text-lg text-center text-[#15322d]">
              You are about to reject this doctor’s verification request. Please
              provide a reason for rejection, this will be communicated to the
              doctor.
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-gray-800">Reason for rejection</label>
              <Select>
                <SelectTrigger className="border border-gray-300 rounded-lg px-3 py-3 text-gray-800">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incomplete">
                    Incomplete certification documents
                  </SelectItem>
                  <SelectItem value="invalid-license">
                    Invalid license number
                  </SelectItem>
                  <SelectItem value="blurry-docs">
                    Document too blurry, use another camera
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-10 flex items-center justify-between">
            <Button
              className="py-3"
              variant="link"
              onClick={() => setOpen(false)}
            >
              No, cancel
            </Button>
            <Button
              variant="destructive"
              className="py-3"
              onClick={handleSuccess}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="Doctor was rejected successfully"
      />
    </>
  );
}
