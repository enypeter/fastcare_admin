import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Success from "../../../features/modules/dashboard/success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/services/store";
import { fetchRoles, createAdmin } from "@/services/thunks"; // make sure you have this thunk
// removed duplicate useEffect import consolidated above

export default function AddUser() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { roles, rolesLoading, rolesError, createLoading, createError } = useSelector(
    (state: RootState) => state.account
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!name || !email || !role || createLoading) return;
    try {
      await dispatch(createAdmin({ name, email, role })).unwrap();
      toast.success('User created successfully');
      setOpenSuccess(true);
      setOpen(false);
      setName('');
      setEmail('');
      setRole('');
    } catch (error) {
      // error already in slice, toast below effect; still log
      console.error('Failed to create admin:', error);
    }
  };

  useEffect(() => {
    if (createError) {
      // specific duplicate email message mapping
      if (createError.toLowerCase().includes('already exists')) {
        toast.error('Email address already exists');
      } else {
        toast.error(createError);
      }
    }
  }, [createError]);

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
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-800">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-800">Role</label>
                {rolesLoading ? (
                  <p>Loading roles...</p>
                ) : rolesError ? (
                  <p className="text-red-500">Failed to load roles</p>
                ) : (
                  <Select value={role} onValueChange={(val) => setRole(val)}>
                    <SelectTrigger className="border border-gray-300 rounded-lg px-3 py-3 text-gray-800">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles?.map((r: string) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 mt-8">
          <Button
            disabled={!name || !email || !role || createLoading}
            onClick={handleSubmit}
            className="py-3 w-48 rounded-md disabled:opacity-60"
          >
            {createLoading ? 'Adding...' : 'Add user'}
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
