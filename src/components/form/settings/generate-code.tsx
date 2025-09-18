import { ChevronRight, ChevronLeft, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function GenerateCode() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTeammates, setShowTeammates] = useState(false);

  const teammates = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Pascal", email: "pascal@example.com" },
    { id: 3, name: "Ogechi", email: "ogechi@example.com" },
  ];

  const handleSubmit = () => {
    setOpenSuccess(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-3 w-36 rounded-md">Generate Code</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b py-2">
            <div>
              <span className="text-gray-800 text-2xl font-normal">
                Generate Code
              </span>
              <p className="text-gray-500 text-md font-normal">
                Send code to teammate as single or a batch
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              type="button"
              className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
          </DialogTitle>
        </DialogHeader>

        {/* If not showing teammates - show selection */}
        {!showTeammates ? (
          <div className="overflow-scroll">
            <div className="grid grid-cols-1 gap-2 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-gray-800">Send to email</label>
                <Select>
                  <SelectTrigger className="border border-gray-300 rounded-lg px-3 py-3 text-gray-800">
                    <SelectValue placeholder="Add email or name" />
                  </SelectTrigger>
                  <SelectContent>
                    {teammates.map((tm) => (
                      <SelectItem key={tm.id} value={tm.email}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {getInitials(tm.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{tm.name}</span>
                          <span className="ml-2">
                            {tm.email}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 mt-6">
              <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
                Send code
              </Button>
            </div>

            <div className="mt-6">
              <h1 className="text-gray-500 text-lg font-normal">
                See all teammates
              </h1>

              <div
                className="flex items-center justify-between text-gray-500 text-lg font-normal cursor-pointer"
                onClick={() => setShowTeammates(true)}
              >
                <h1>
                  {teammates.map((t) => t.name).join(", ")}
                </h1>
                <ChevronRight className="w-6 h-6 ml-2" />
              </div>
            </div>
          </div>
        ) : (
          // If showing teammates
          <div className="mt-1">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowTeammates(false)}
                className="flex items-center text-gray-600"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>

              <Button className="py-2 rounded-md" onClick={handleSubmit}>
                Send All
              </Button>
            </div>

            <div className="mt-2">
              {teammates.map((tm) => (
                <div
                  key={tm.id}
                  className="flex items-center gap-2  p-2 rounded-lg"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(tm.name)}</AvatarFallback>
                  </Avatar>
                  
                    <p className="text-gray-800 text-md">{tm.name}</p>
                    <p className="text-gray-800 text-md ">{tm.email}</p>
                  
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully added a new user."
      />
    </Dialog>
  );
}
