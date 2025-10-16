import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Success from "../../../../features/modules/dashboard/success";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/services/store";
import { createAmbulanceProviders } from "@/services/thunks";
import { CreateAmbulanceProvider } from "@/types";

export default function AddProviders() {
  const dispatch = useDispatch<AppDispatch>();
  const { createLoading } = useSelector((state: RootState) => state.ambulance);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  // Controlled form state
  const [formData, setFormData] = useState<CreateAmbulanceProvider>({
    registrationNumber: "",
    address: "",
    email: "",
    adminName: "",
    phoneNumber: "",
    serviceCharge: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "serviceCharge" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await dispatch(
        createAmbulanceProviders(formData)
      ).unwrap();

      if (res) {
        setOpen(false);
        setOpenSuccess(true);
        // Reset form
        setFormData({
          registrationNumber: "",
          address: "",
          email: "",
          adminName: "",
          phoneNumber: "",
          serviceCharge: 0,
        });
      }
    } catch (err) {
      console.error("Create provider failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-3 w-36 rounded-md">Add Provider</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b py-2">
            <span className="text-gray-800 text-xl font-normal py-3">
              New Ambulance Provider
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

        <div className="overflow-scroll h-[400px] ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-gray-800">Company Registration Number</label>
              <input
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-800">Company Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-800">Office Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-800">Service Charge</label>
              <input
                name="serviceCharge"
                type="number"
                value={formData.serviceCharge}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-gray-800 text-2xl border-b py-4">Contact Person</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="text-gray-800">Name</label>
                <input
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-800">Phone number</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center gap-4 mt-8">
          <Button
            onClick={handleSubmit}
            disabled={createLoading}
            className="py-3 w-48 rounded-md"
          >
            {createLoading ? "Adding..." : "Add Provider"}
          </Button>
        </div>
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully added a new Provider"
      />
    </Dialog>
  );
}
