import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import {X} from 'lucide-react';
import {useState} from 'react';
import Success from '../../dashboard/success';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/services/store';
import {activateAmbulanceProvider} from '@/services/thunks';
import {AmbulanceProvider} from '@/types';
import toast from 'react-hot-toast';
import {createPortal} from 'react-dom';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: AmbulanceProvider;
};

export default function ActivateProvider({open, setOpen, data}: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleApprove = async () => {
    if (!data?.id) return;

    setLoading(true);

    try {
      await dispatch(activateAmbulanceProvider(data.id)).unwrap();

      setOpenSuccess(true);
      
      setTimeout(() => setOpen(false), 200);
    } catch (err: any) {
     toast.error(err || 'Approve failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {createPortal(
          <DialogContent className="flex flex-col gap-6">
            <DialogHeader className="flex items-end justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="border border-gray-600 rounded-full"
              >
                <X className="text-neutral-600 hover:text-neutral-600" />
              </button>
            </DialogHeader>

            <div className="flex flex-col gap-8 mt-8">
              <h1 className="text-center text-lg font-semibold text-gray-700">
                Activate {data?.registrationNumber || ''}
              </h1>
              <p className="text-ms text-center text-[#15322d]">
                Are you sure you want to activate this ambulance provider? 
              </p>
            </div>

            <DialogFooter className="mt-10 flex items-center justify-between">
              <Button
                className="py-3"
                variant="link"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                No, cancel
              </Button>
              <Button
                className="py-3"
                onClick={handleApprove}
                disabled={loading}
              >
                {loading ? 'Activate...' : 'Yes, Activate'}
              </Button>
            </DialogFooter>
          </DialogContent>,
          document.body,
        )}
      </Dialog>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="Ambulance provider activated successfully "
      />
    </>
  );
}
