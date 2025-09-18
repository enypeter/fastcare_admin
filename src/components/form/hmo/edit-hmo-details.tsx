
import { X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import Success from "@/features/modules/dashboard/success";


type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: any
};


export default function EditHMO({ open, setOpen }: Props) {
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleSubmit = () => {
        setOpenSuccess(true);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl">
                <DialogHeader className="flex w-full items-center justify-between">
                    <DialogTitle className="flex w-full items-center justify-between">
                        <span className="text-gray-800 text-2xl font-normal py-3">
                             Edit HMO Details
                        </span>

                        <button
                            onClick={() => setOpen(false)}
                            type="button"
                            className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-5 h-5 text-neutral-600" />
                        </button>

                    </DialogTitle>

                </DialogHeader>

                <div className="overflow-scroll h-[450px] ">

                    <div>
                        <span className="text-primary text-xl font-normal  ">
                            Admin Information
                        </span>

                        {/* 2-column form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10  gap-x-6 mt-6  ">
                            <Input
                                id="adminFirstName"
                                label="Admin First Name"
                                placeholder="Admin First Name"
                                className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                            />

                            <Input
                                id="adminLastName"
                                label="Admin Last Name"
                                placeholder="Admin Last Name"
                                className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                            />


                            <Input
                                id="adminEmail"
                                label="Admin Email"
                                type="email"
                                placeholder="Admin Email"
                                className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                            />


                            <div className="flex flex-col">
                                <div className="flex">
                                    <span className="bg-gray-200 px-3 py-2.5 rounded-l-lg border border-r-0 border-gray-300">
                                        +234
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="w-full placeholder:text-gray-900 border border-gray-300 rounded-r-lg px-3 py-2.5"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>



                    <div className="border-t my-6"></div>

                    <div>
                        <span className="text-primary text-xl font-normal  ">
                            HMO Information
                        </span>

                        {/* 2-column form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10  gap-x-6 mt-6  ">
                            <Input
                                id="hmoName"
                                label="HMO Name"
                                placeholder="HMO Name"
                                className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                            />

                            <Input
                                id="adminLastName"
                                label="Admin Last Name"
                                placeholder="Admin Last Name"
                                className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                            />




                        </div>

                    </div>

                    <div className="border-t my-6"></div>

                    <div className="mb-6">
                        <span className="text-primary text-xl font-normal  ">
                           Address Information
                        </span>

                        {/* 2-column form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10  gap-x-6 mt-6  ">
                            <Input
                                id="postalAddress"
                                label="Postal Address"
                                placeholder="Postal Address"
                                className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                            />

                            <Input
                                id="line1"
                                label="Address Line 1"
                                placeholder="Address Line 1"
                                className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                            />

                            <div className="col-span-2">
                            <Input
                                id="line2"
                                label="Address Line 2"
                                placeholder="Address Line 2"
                                className="w-full border-[#b6c2cc] bg-gray-50 rounded-lg px-3 py-4"
                            />

                            </div>




                        </div>

                    </div>


                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center gap-4 mt-8">
                  
                    <Button onClick={handleSubmit} className="py-3 w-32">
                        Edit
                    </Button>
                </div>
            </DialogContent>

            <Success
                open={openSuccess}
                setOpen={setOpenSuccess}
                text="You've successfully added a new HMO"
            />
        </Dialog>
    );
}
