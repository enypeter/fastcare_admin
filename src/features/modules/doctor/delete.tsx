import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';

import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import Success from '../hospital/success';
import {Doctor} from '@/types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/services/store';
import {deleteDoctor} from '@/services/thunks';
import { useNavigate } from 'react-router-dom';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Doctor | null;
};

export default function DelectDoctor({open, setOpen, data}: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!data?.id) return;

   try {
      await dispatch(deleteDoctor(data.id)).unwrap();
      setOpen(false);
      setOpenSuccess(true);

      // ✅ Redirect after 2 seconds
      setTimeout(() => {
        setOpenSuccess(false);
        navigate("/doctors/all-doctors"); // adjust to your route
      }, 2000);
    } catch (err) {
      console.error("Delete failed:", err);
    }
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
              Delete account
            </h1>
            <p className="text-lg text-gray-800">
              Deleting this account will permanently delete this hospital's
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
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        title="Successful"
        text="Account was deleted successfully"
      />
    </>
  );
}
