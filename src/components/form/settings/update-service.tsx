import { X, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Success from "../../../features/modules/dashboard/success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  data?: {
    id: string;
    name: string;
    fee: string | number;
  };
};

const SERVICE_OPTIONS = [
  { key: "virtual", label: "Virtual Consultation" },
  { key: "physical", label: "Physical Consultation" },
  { key: "registration", label: "Registration" },
];

export default function UpdateService({ data }: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  // Prefill state from data
  const [serviceName, setServiceName] = useState<string>("");
  const [serviceFee, setServiceFee] = useState<string>("");

  useEffect(() => {
    if (data) {
      // find matching option key from service label
      const option = SERVICE_OPTIONS.find(
        (opt) => opt.label === data.name
      );
      setServiceName(option?.key || "");
      setServiceFee(data.fee?.toString() || "");
    }
  }, [data]);

  const handleSubmit = () => {
    // Find label from key
    const selectedLabel =
      SERVICE_OPTIONS.find((opt) => opt.key === serviceName)?.label || "";

    console.log({
      id: data?.id,
      serviceName: selectedLabel,
      serviceFee,
    });

    setOpenSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex text-center w-24 justify-center cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]">
          <Edit2 className="w-4 h-4" />
          Edit
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b">
            <span className="text-gray-800 text-xl font-normal py-3">
              Update service
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
          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Service Name */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800">Service name</label>
              <Select value={serviceName} onValueChange={setServiceName}>
                <SelectTrigger className="border border-gray-300 rounded-lg px-3 py-3 text-gray-800">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.key} value={opt.key}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Fee */}
            <div>
              <label className="text-gray-800">Service fee</label>
              <input
                type="text"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                placeholder="#0.00"
                className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center gap-4 mt-8">
          <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
            Save changes
          </Button>
        </div>
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully updated the service."
      />
    </Dialog>
  );
}
