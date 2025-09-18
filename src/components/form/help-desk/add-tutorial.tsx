import { Download, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Success from "../../../features/modules/dashboard/success";

export default function AddTutorial() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpenSuccess(true);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="py-3 w-36 rounded-md">Add new tutorial</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-[600px] overflow-y-auto">
        <SheetHeader className="flex w-full items-center justify-between border-b pb-2">
          <SheetTitle className="flex w-full items-center justify-between">
            <span className="text-gray-800 text-2xl font-normal">
              Add New Tutorial
            </span>
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <div>
            <label className="text-gray-800">Video title</label>
            <input className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-2 outline-none" />
          </div>

          <div className="mt-4">
            <label className="text-gray-800">Video</label>
            <label
              htmlFor="video-upload"
              className="mt-2 border-2 border-dashed border-primary rounded-lg w-full py-6 flex flex-col items-center justify-center text-center cursor-pointer transition"
            >
              <Download className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-4 font-medium text-lg text-gray-700">
                Drag and Drop to upload a video
              </p>
              <p className="text-lg text-gray-700">
                or{" "}
                <span className="text-primary font-semibold">browse</span> to
                select a file
              </p>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-4">
            <label className="text-gray-800">Thumbnail (optional)</label>
            <label
              htmlFor="photo-upload"
              className="mt-2 border-2 border-dashed border-primary rounded-lg w-full py-6 flex flex-col items-center justify-center text-center cursor-pointer transition"
            >
              <Download className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-4 font-medium text-lg text-gray-700">
                Drag and Drop to upload photo
              </p>
              <p className="text-lg text-gray-700">
                or{" "}
                <span className="text-primary font-semibold">browse</span> to
                select PNG file
              </p>
              <input
                id="photo-upload"
                type="file"
                accept="image/png"
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-4">
            <label className="text-gray-800">Body</label>
            <textarea
              rows={4}
              className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-2 outline-none"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button onClick={handleSubmit} className="py-3 w-48 rounded-md">
            Submit
          </Button>
        </div>
      </SheetContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully submitted this tutorial"
      />
    </Sheet>
  );
}
