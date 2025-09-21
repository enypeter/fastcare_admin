import { EditIcon, X} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import Success from '../../../../features/modules/dashboard/success';


type Props = {
  data?: any;
};

export default function EditAmenities({ data}: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(data)

  const handleSubmit = () => {
    setOpen(false)
    setOpenSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditIcon className='w-4 h-4 cursor-pointer' />
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b py-2">
            <span className="text-gray-800 text-2xl font-normal py-3">
              Edit Amenities
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

        <div className="overflow-scroll  ">
          <div>
            <div className="mt-4">
              <div>
                <label className="text-gray-800">Equipment Name</label>
                <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>   
            </div>  
          </div>
        </div>

       
          <Button onClick={handleSubmit} className="py-3 w-full rounded-md mt-5">
            Add 
          </Button>
      
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully edit an equipment"
      />
    </Dialog>
  );
}
