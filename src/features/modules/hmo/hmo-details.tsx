
import { X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: any
};

type DetailsRowProps = {
    label: string;
    value: string | number | null;
};

function DetailsRow({ label, value }: DetailsRowProps) {
    return (
        <div className="mb-4 space-y-3">
            <p className="text-xl text-gray-900  ">{label}</p>
            <p className="text-xl text-gray-900 break-words w-32 ">{value || "-"}</p>
        </div>
    );
}


export default function HMODetails({ open, setOpen }: Props) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl">
                <DialogHeader className="flex w-full items-center justify-between">
                    <DialogTitle className="flex w-full items-center justify-between border-b py-2 border-gray-400">
                        <span className="text-gray-800 text-2xl font-normal py-3">
                            HMO Details
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

                <div className="overflow-scroll h-[450px] mt-8 ">
                    <div>
                        <span className="text-primary text-xl   ">Admin Information</span>
                        <div className="border-t border-gray-300 my-2"></div>

                        <div className="mx-4 mt-4 grid grid-cols-1  lg:grid-cols-4 gap-x-6 ">
                            <DetailsRow label="First Name" value={'Thelma '} />
                            <DetailsRow label="Last Name" value={' George'} />
                            <DetailsRow label="Email" value={'themlage@gmail.com'} />
                            <DetailsRow label="Phone Number" value={'1234567890'} />
                        </div>
                    </div>

                    <div className="mt-10">
                        <span className="text-primary text-xl">HMO Information</span>
                        <div className="border-t border-gray-300 my-4"></div>

                        <div className="mx-4 mt-4 grid grid-cols-1  lg:grid-cols-3 gap-x-6 ">
                            <DetailsRow label="HMO Name" value={'01234XYZ '} />
                            <DetailsRow label="HMO Code" value={'82345678901'} />

                        </div>
                    </div>
                    <div className="mt-10">
                        <span className="text-primary text-xl">Address Informtion</span>


                        <div className=" mt-4 grid grid-cols-1 gap-y-1 ">

                            <DetailsRow label="Postal Code" value={'PMB2881'} />
                            <div className="mb-4 space-y-3">
                                <p className="text-xl text-gray-900  ">Address Line 1</p>
                                <p className="text-xl text-gray-900 break-words ">oshorun estate, isheri north GRA</p>
                            </div>
                            <DetailsRow label="Address Line 2" value={'NAN'} />

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
