import {X} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
};

export default function TransactionDetails({open, setOpen, data}: Props) {

      // ✅ function to get status color
  const getStatusColor = (status?: string) => {
    if (!status) return "text-gray-500";

    const s = status.toLowerCase();
    if (s === "successful" || s === "approved") return "text-green-600 bg-green-100";
    if (s === "pending") return "text-yellow-600 bg-yellow-100";
    if (s === "failed" || s === "disputed") return "text-red-600 bg-red-100";

    return "text-gray-500";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b">
            <span className="text-gray-800 text-xl font-normal py-3">
              Transaction Details
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

        <div className="overflow-scroll max-h-[450px] py-4">
          {/* Amount in middle */}
          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm">Amount</p>
            <p className="text-2xl font-bold text-gray-900">{data?.amount}</p>
          </div>

          {/* Other details */}
          <div className="divide-y">
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Transation status</span>
             <span className={`font-medium py-1 px-2 rounded-md  ${getStatusColor(data?.status)}`}>
                {data?.status}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Transaction Id</span>
              <span className="font-medium">{data?.transaction_id}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Payment method</span>
              <span className="font-medium">
                {data?.method || 'Bank transfer'}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Transaction Type</span>
              <span className="font-medium">{data?.type + " fee"}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Recipient hospital</span>
              <span className="font-medium">{data?.hospital}</span>
            </div>
            {/* 
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Patient Name</span>
              <span className="font-medium">{data?.name}</span>
            </div> */}

            <div className="flex justify-between py-4">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{data?.date}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Time</span>
              <span className="font-medium">{data?.time || "10:00:00 AM"} </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center items-center mt-4">
          <Button className="py-3 w-32">Print</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
