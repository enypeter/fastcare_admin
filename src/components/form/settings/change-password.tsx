import { X, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Success from "../../../features/modules/dashboard/success";

export default function ChangePassword() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  // Toggle states for password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    setOpenSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-3 w-36 rounded-md border-gray-300 text-gray-800 bg-white">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b">
            <span className="text-gray-800 text-2xl font-normal py-3">
              Change Password
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
            <div className="grid grid-cols-1 gap-4 mt-6">
              <div>
                <label className="text-gray-800">Old password</label>
                <input
                  type="password"
                  className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
                />
              </div>

              <div className="relative">
                <label className="text-gray-800">New password</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-11 text-gray-500"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <label className="text-gray-800">Confirm password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-11 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 mt-8">
          <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
            Save changes
          </Button>
        </div>
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully changed your password."
      />
    </Dialog>
  );
}
