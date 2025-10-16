import { FileIcon, X, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/services/store';
import { exportRefundDetail } from '@/services/thunks';
import { useCallback, useState } from 'react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: {
    id: number;
    transaction_id: string;
    name: string;
    reason: string;
    amount: string;
    status: string;
    date: string;
    patient_id?: string;
    account?: string;
  };
};

export default function RefundDetails({open, setOpen, data}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { exportingDetail } = useSelector((s: RootState) => s.refunds);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // ✅ function to get status color
  const getStatusColor = (status?: string) => {
    if (!status) return 'text-gray-500';

    const s = status.toLowerCase();
    if (s === 'successful' || s === 'approved')
      return 'text-green-600 bg-green-100';
    if (s === 'pending') return 'text-yellow-600 bg-yellow-100';
    if (s === 'failed' || s === 'disputed') return 'text-red-600 bg-red-100';

    return 'text-gray-500';
  };

  const statusMap: Record<string, number | undefined> = { approved: 1, successful: 1, failed: 2, pending: undefined, disputed: 2 };

  const sanitize = (v?: string) => (v || '')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9-_\s]/g, '')
    .trim()
    .replace(/\s+/g, '_') || 'refund';

  const triggerDownload = useCallback((blob: Blob, baseParts: string[], ext: string) => {
    const base = baseParts.map(sanitize).filter(Boolean).join('-');
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${base}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }, []);

  const handleExport = async (format: 0 | 1) => {
    if(!data || exportingDetail) return;
    setErrorMsg(null);
    const Status = statusMap[data.status.toLowerCase()] || undefined;
    const PatientName = data.name;
    const Date = data.date;
    try {
      const res = await dispatch(exportRefundDetail({ Status, PatientName, Date, format })).unwrap();
      if(res?.blob){
        triggerDownload(res.blob, ['refund', PatientName, Date], format === 0 ? 'csv' : 'xlsx');
      } else {
        setErrorMsg('No file returned');
      }
    } catch {
      setErrorMsg('Export failed');
    }
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
            <p className="text-gray-500 text-sm">Refund Amount</p>
            <p className="text-2xl font-bold text-gray-900">{data?.amount}</p>
          </div>

          {/* Other details */}
          <div className="divide-y">
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Transaction status</span>
              <span
                className={`font-medium py-1 px-2 rounded-md  ${getStatusColor(
                  data?.status,
                )}`}
              >
                {data?.status}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Transaction Id</span>
              <span className="font-medium">{data?.transaction_id}</span>
            </div>

            <div className="flex justify-between py-4">
              <span className="text-gray-600">Patient Name</span>
              <span className="font-medium">{data?.name}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Patient Id</span>
              <span className="font-medium">
                {data?.patient_id || 'PT023'}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Wallet account</span>
              <span className="font-medium">{data?.account + ' 2345677899'}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Refund reason</span>
              <span className="font-medium">{data?.reason || "No show"}</span>
            </div>

            <div className="flex justify-between py-4">
              <span className="text-gray-600">Requested by </span>
              <span className="font-medium">{data?.name}</span>
            </div>

            <div className="flex justify-between py-4">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{data?.date}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Extra document</span>
              <span className=" text-red-500 text-md flex items-center gap-2 text-normal">
                 <FileIcon className='w-4 h-4'/> file.pdf
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center items-center mt-4 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={exportingDetail || !data} className="py-3 w-44 flex items-center gap-2">
                <Download size={18}/> {exportingDetail ? 'Exporting...' : 'Export'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleExport(0)}>CSV</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleExport(1)}>Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="py-3 w-44" variant="ghost" onClick={() => window.print()}>Print</Button>
        </div>
        {errorMsg && <p className="text-center text-sm text-red-600 mt-2">{errorMsg}</p>}
      </DialogContent>
    </Dialog>
  );
}
