import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';

import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import Success from './success';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Deactivate({open, setOpen}: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
    setOpenSuccess(true);
   
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-3 py-10">
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
            <h1 className="text-center text-xl font-semibold text-gray-900 ">
              Deactivate Account
            </h1>
            <p className="text-lg text-gray-800">
              Deactivating this account will permanently delete this hospital's
              account. Do you still wish to continue?
            </p>
          </div>

          <DialogFooter className=" flex items-center justify-between mt-24">
            <Button
              className="py-3"
              variant="link"
              onClick={() => setOpen(false)}
            >
              No, cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="py-3"
              variant="destructive"
            >
              Yes, deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        title="Successful"
        text="Account was deactivated successfully"
      />
    </>
  );
}
