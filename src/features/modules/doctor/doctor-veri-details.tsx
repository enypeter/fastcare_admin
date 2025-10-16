import {X} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import Confirm from './confirm';
import Reject from './reject';
import {Doctor} from '@/types';

type Props = {
  data?: Doctor;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

};

export default function DoctorVerificationDetails({data, open, setOpen}: Props) {
 
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const handleReject = () => {
    setOpen(false);
    setOpenReject(true);
  };
  
  const handleApprove = () => {
    setOpen(false);
    setOpenConfirm(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
       
        <DialogContent className="max-w-xl">
          <DialogHeader className="flex w-full items-center justify-between">
            <DialogTitle className="flex w-full items-center justify-between border-b">
              <span className="text-gray-800 text-xl font-normal py-3">
                Doctor Verification Detail Panel
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

          {/* Doctor Details Section */}
          {data ? (
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-primary  text-xl">{data.name}</h1>

                <div className="flex items-center gap-3">
                  {data.isApproved === null && (
                    <>
                      <Button
                        onClick={handleApprove}
                        className="py-2 bg-green-500 w-28 border-none"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={handleReject}
                        className="py-2 w-28 bg-red-100 text-red-500 border border-red-500"
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {data.isApproved === true && (
                    <span className="py-1 px-3 text-green-700 font-semibold rounded bg-green-100">
                      Approved
                    </span>
                  )}

                  {data.isApproved === false && (
                    <span className="py-1 px-3 text-red-700 font-semibold rounded bg-red-100">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <h1 className="text-primary border-b text-lg">
                  Doctor Information
                </h1>
              </div>
              <div className="space-y-4 mt-4 text-md">
                <div className="flex gap-2 ">
                  <span className=" text-gray-600">Full Name:</span>
                  <span className="text-gray-900">
                    {data.firstName} {data.lastName}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <span className=" text-gray-600">Speciality:</span>
                  <span className="text-gray-900">{data.specialization}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className=" text-gray-600">License No:</span>
                  <span className="text-gray-900">{data.licenseNumber}</span>
                </div>
                <div className="flex gap-2">
                  <span className=" text-gray-600">Expiry Date:</span>
                  <span className="text-gray-900">
                    {data.licenseExpirationDate || '--'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No details available.</p>
          )}
        </DialogContent>
      </Dialog>

      <Confirm open={openConfirm} setOpen={setOpenConfirm} data={data} />

      <Reject open={openReject} setOpen={setOpenReject} data={data} />
    </>
  );
}
