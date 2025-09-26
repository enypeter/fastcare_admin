import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Success from "@/features/modules/dashboard/success";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/store";
import { deleteFAQ } from "@/services/thunks";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  faqId: number | null;
};

export default function DeleteFAQ({ open, setOpen, faqId }: Props) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    if (!faqId) return;

    try {
      await dispatch(deleteFAQ(faqId)).unwrap();
      setOpen(false);
      setOpenSuccess(true);

      // Auto-close success modal after 2 seconds
      setTimeout(() => {
        setOpenSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Delete FAQ failed:", err);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-3 py-10">
          <DialogHeader className="flex items-end justify-end gap-4">
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="border border-gray-600 rounded-full"
            >
              <X className="text-neutral-600 hover:text-neutral-600" />
            </button>
          </DialogHeader>

          <div className="flex flex-col gap-8 mt-8">
            <h1 className="text-center text-xl font-semibold text-gray-900">
              Delete FAQ
            </h1>
            <p className="text-lg text-gray-800 text-center">
              Deleting this FAQ will permanently remove it. Do you still wish
              to continue?
            </p>
          </div>

          <DialogFooter className="flex items-center justify-between mt-24">
            <Button
              className="py-3"
              variant="link"
              onClick={() => setOpen(false)}
            >
              No, cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="py-3"
              variant="destructive"
            >
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        title="Successful"
        text="FAQ was deleted successfully"
      />
    </>
  );
}
