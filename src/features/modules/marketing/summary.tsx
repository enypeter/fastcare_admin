import {X} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import UsersWho from './users';

type Props = {
  data?: any;
};

export default function Summary({data}: Props) {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status?: string) => {
    if (!status) return 'text-gray-500';

    const s = status.toLowerCase();
    if (s === 'successful' || s === 'approved' || s === 'active')
      return 'text-green-600 bg-green-100';
    if (s === 'pending') return 'text-yellow-600 bg-yellow-100';
    if (s === 'failed' || s === 'disputed') return 'text-red-600 bg-red-100';

    return 'text-gray-500';
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex text-center justify-center cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]">
            View Details
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex w-full items-center justify-between">
            <DialogTitle className="flex w-full items-center justify-between border-b">
              <span className="text-gray-800 text-2xl font-semibold py-3">
                Summary
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
            <div className="">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <h1 className="text-primary  text-lg">
                    Code No{' '}
                    <span className="text-gray-600 ">
                      {' '}
                      {data?.referral_code}
                    </span>{' '}
                  </h1>

                  <span
                    className={`font-medium py-1 px-2 rounded-md  ${getStatusColor(
                      data?.status,
                    )}`}
                  >
                    {data?.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="py-2.5 w-36 rounded-md">
                    Export
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <h1 className="text-primary border-b text-lg">
                  Referral Code Details
                </h1>
              </div>
              <div className="grid grid-cols-4   mt-4 text-md">
                <div className="flex flex-col gap-2 ">
                  <span className=" text-gray-600">Code</span>
                  <span className="text-gray-900">{data.referral_code}</span>
                </div>
                <div className="flex flex-col gap-2 ">
                  <span className=" text-gray-600">Date Created</span>
                  <span className="text-gray-900">{data.date}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className=" text-gray-600">Expiry Date</span>
                  <span className="text-gray-900">{data.date}</span>
                </div>
                <div className="flex flex-col gap-2 ">
                  <span className=" text-gray-600">Status</span>
                  <span className="text-gray-900">{data.status}</span>
                </div>
              </div>

              <div className="mt-6">
                <h1 className="text-primary text-lg">
                  Users Who Used This Code
                </h1>

                <UsersWho />
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No details available.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
