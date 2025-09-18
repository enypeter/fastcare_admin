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
import Success from '../../../features/modules/dashboard/success';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AddUser() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const role = [
    {key: 'virtual', label: 'Virtual Consultation'},
    {key: 'physical', label: 'Physical Consultation'},
    {key: 'registration', label: 'Registration'},
  ];

  const handleSubmit = () => {
    setOpenSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-3 w-36 rounded-md">Add user</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b">
            <span className="text-gray-800 text-2xl font-normal py-3">
              New user
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

        <div className="overflow-scroll">
          <div>
            <div className="grid grid-cols-1 gap-2 mt-6">
              <div>
                <label className="text-gray-800">Name</label>
                <input className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div>
                <label className="text-gray-800">Email</label>
                <input className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-800">Role</label>
                <Select>
                  <SelectTrigger className="border border-gray-300 rounded-lg px-3 py-3 text-gray-800">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {role.map(opt => (
                      <SelectItem key={opt.key} value={opt.key}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 mt-8">
          <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
            Add user
          </Button>
        </div>
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully added a new user."
      />
    </Dialog>
  );
}
