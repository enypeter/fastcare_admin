import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Success from "../../../features/modules/dashboard/success";
import { useDispatch, useSelector } from "react-redux";
import { generateReferralCodes, fetchReferralCodes, fetchReferralSummary } from "@/services/thunks";
import type { AppDispatch, RootState } from "@/services/store";

export default function GenerateCode() {
  const dispatch = useDispatch<AppDispatch>();
  const { generating, generateError } = useSelector((s: RootState) => s.referrals);

  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  const resetForm = () => {
    setEmailInput("");
    setEmails([]);
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const addEmail = () => {
    const value = emailInput.trim();
    if (!value) return;
    // simple email pattern check
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(value)) return;
    if (!emails.includes(value)) {
      setEmails(prev => [...prev, value]);
    }
    setEmailInput("");
  };

  const removeEmail = (e: string) => {
    setEmails(prev => prev.filter(x => x !== e));
  };

  const handleSubmit = () => {
    if (emails.length === 0 || generating) return;
    dispatch(generateReferralCodes({ UserEmails: emails }))
      .unwrap()
      .then(() => {
        setOpenSuccess(true);
        // refresh summary & list so new codes appear
        dispatch(fetchReferralSummary());
  dispatch(fetchReferralCodes({ Page: 1, PageSize: 20 }));
        resetForm();
      })
      .catch(() => {/* error handled via generateError */});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-3 w-40 rounded-md">Generate Code</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b py-2">
            <div>
              <span className="text-gray-800 text-2xl font-normal">Generate Code</span>
              <p className="text-gray-500 text-sm font-normal">Send referral codes to one or multiple staff emails</p>
            </div>
            <button onClick={() => setOpen(false)} type="button" className="p-1 border border-gray-300 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-primary" />
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 text-sm font-medium">Add Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addEmail(); } }}
                placeholder="staff@example.com"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none"
              />
              <Button type="button" variant="ghost" onClick={addEmail} disabled={!emailInput.trim()}>Add</Button>
            </div>
            <p className="text-xs text-gray-500">Press Enter or click Add to include email. You can add multiple.</p>
          </div>
          {emails.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {emails.map(e => (
                <span key={e} className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 border border-blue-200">
                  {e}
                  <button type="button" onClick={() => removeEmail(e)} className="text-blue-500 hover:text-blue-800">&times;</button>
                </span>
              ))}
            </div>
          )}
          {generateError && <p className="text-xs text-red-600">{generateError}</p>}
          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => { resetForm(); setOpen(false); }}>Cancel</Button>
            <Button type="button" onClick={handleSubmit} disabled={emails.length === 0 || generating} className="min-w-32">
              {generating ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </div>
      </DialogContent>
      <Success open={openSuccess} setOpen={setOpenSuccess} text="Referral codes generated successfully." />
    </Dialog>
  );
}
