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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Label} from '@/components/ui/label';

type Props = {
  data?: any;
};

export default function RequestDetails({data}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex text-center justify-center cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]">
            {data?.action}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex w-full items-center justify-between">
            <DialogTitle className="flex w-full items-center justify-between border-b">
              <span className="text-gray-800 text-2xl font-semibold py-3">
                Ambulance Request
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
                    Request ID{' '}
                    <span className="text-gray-600 "> {data?.request_id}</span>{' '}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <Button className="py-2.5 w-36 rounded-md">
                    Accept & Dispatch
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <h1 className="text-primary border-b text-lg py-2">
                  Request Details
                </h1>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-6 w-full text-lg">
                <div className="space-y-3 ">
                  <div className="grid grid-cols-2  ">
                    <span className=" text-gray-600">Client Name: </span>
                    <span className="text-gray-900">Ada John</span>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <span className=" text-gray-600">Age: </span>
                    <span className="text-gray-900">28</span>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <span className=" text-gray-600">Sex: </span>
                    <span className="text-gray-900">Male</span>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <span className=" text-gray-600">Request Type: </span>
                    <span className="text-gray-900">{data?.type}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2  ">
                    <span className=" text-gray-600">Amenities: </span>
                    <span className="text-gray-900">Oxygen, Personnel</span>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <span className=" text-gray-600">Pickup Location: </span>
                    <span className="text-gray-900">Ikeja, Lagos</span>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <span className=" text-gray-600">Timestamp: </span>
                    <span className="text-gray-900">{data?.time}</span>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <span className=" text-gray-600">Distance: </span>
                    <span className="text-gray-900">~12km</span>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h1 className="text-primary border-b text-lg py-2">
                  Assign Driver & Responder
                </h1>

                <div className="mt-6 flex items-center gap-4 ">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>Driver</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select available driver..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="driver">Driver</SelectItem>
                        
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <Label>Responder</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select available responder..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Responder</SelectItem>
                       
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
