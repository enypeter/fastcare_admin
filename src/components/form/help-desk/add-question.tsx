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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/store";
import { addFAQ } from "@/services/thunks";
import Success from "@/features/modules/dashboard/success";

export default function AddNewQuestion() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) return;

    try {
      await dispatch(addFAQ({ question, answer })).unwrap();

      setOpen(false); // close the question dialog
      setQuestion("");
      setAnswer("");

      // ✅ show success modal independently
      setTimeout(() => {
        setOpenSuccess(true);
      }, 100);
    } catch (err) {
      console.error("Failed to add FAQ:", err);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="py-3 w-36 rounded-md">Add question</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader className="flex w-full items-center justify-between">
            <DialogTitle className="flex w-full items-center justify-between border-b py-2">
              <span className="text-gray-800 text-2xl font-normal py-3">
                Add New Question
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
            <div className="mt-4">
              <label className="text-gray-800">Question</label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter text"
                className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
              />
            </div>

            <div className="mt-2">
              <label className="text-gray-800">Answer</label>
              <textarea
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter text"
                className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="py-3 w-full rounded-md mt-5">
            Submit
          </Button>
        </DialogContent>
      </Dialog>

      {/* ✅ Success modal rendered outside the dialog */}
      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully added a new question"
      />
    </>
  );
}
