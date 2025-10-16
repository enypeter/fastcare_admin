import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';


import { X } from 'lucide-react';
import { useState } from 'react';
import Success from '../dashboard/success';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { disapproveDoctor, fetchPendingDoctors } from '@/services/thunks';
import toast from 'react-hot-toast';

import { Doctor } from '@/types';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: Doctor;
};

export default function Reject({ open, setOpen, data }: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleReject = async () => {
    if (!data?.userId) return;
    setLoading(true);
    try {
  // Backend no longer requires a reason; send only doctorId
  await dispatch(disapproveDoctor({ doctorId: data.userId })).unwrap();
      setOpenSuccess(true);
      setOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Rejection failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
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

            {/* Reason selection removed as backend no longer requires a reason */}
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
              onClick={handleReject}
              disabled={loading}
            >
              {loading ? 'Rejecting...' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="Doctor was rejected successfully"
        onClose={() => dispatch(fetchPendingDoctors({ page: 1, pageSize: 5 }))}
      />
    </>
  );
}
