import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';

import {X} from 'lucide-react';
import {useState} from 'react';
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

export default function Confirm({open, setOpen, data}: Props) {
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
              <X className="text-neutral-600  hover:text-neutral-600" />
            </button>
          </DialogHeader>

          <div className="flex flex-col gap-8 mt-8 ">
            <h1 className="text-center text-xl font-semibold text-gray-700 ">
              Confirm {data?.name || ''}
            </h1>
            <p className="text-lg text-center text-[#15322d] ">
              Are you sure you want to approve this doctor’s credentials? This
              action will grant them access to consult patients on the platform
            </p>
          </div>

          <DialogFooter className="mt-10 flex items-center justify-between">
            <Button
              className="py-3"
              variant="link"
              onClick={() => setOpen(false)}
            >
              No, cancel
            </Button>
            <Button className="py-3" onClick={handleSuccess}>
              Yes, Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="Doctor was approved successfully"
      />
    </>
  );
}
