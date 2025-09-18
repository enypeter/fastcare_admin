import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { ChevronDown } from "lucide-react";
  
  type SortAndOrderDropdownProps = {
    selectedOption: string;
    selectedOrder: string;
    onSelectOption: (option: string) => void;
    onSelectOrder: (order: string) => void;
  };
  
  const SortAndOrderDropdown = ({
    selectedOption,
    selectedOrder,
    onSelectOption,
    onSelectOrder,
  }: SortAndOrderDropdownProps) => {
    return (
      <div className="space-x-6">
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <span className="cursor-pointer flex items-center gap-2">
              {selectedOption} <ChevronDown />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 ml-16 p-4">
            <span className="text-md text-gray-300">Sort by</span>
            <DropdownMenuItem
              onClick={() => onSelectOption("Alphabetical")}
              className={`text-gray-400 ${
                selectedOption === "Alphabetical" ? "text-black font-bold" : ""
              }`}
            >
              Alphabetically
              {selectedOption === "Alphabetical" && (
                <span className="mr-2">✔</span>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSelectOption("Date Created")}
              className={`text-gray-400 ${
                selectedOption === "Date Created" ? "text-black font-bold" : ""
              }`}
            >
              Date Created
              {selectedOption === "Date Created" && (
                <span className="mr-2">✔</span>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSelectOption("Last Viewed")}
              className={`text-gray-400 ${
                selectedOption === "Last Viewed" ? "text-black font-bold" : ""
              }`}
            >
              Last Viewed
              {selectedOption === "Last Viewed" && (
                <span className="mr-2">✔</span>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  
        {/* Order Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <span className="cursor-pointer flex items-center gap-2">
              {selectedOrder} <ChevronDown />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 ml-16 p-4">
            <span className="text-md text-gray-300">Order</span>
            <DropdownMenuItem
              onClick={() => onSelectOrder("Oldest first")}
              className={`text-gray-400 ${
                selectedOrder === "Oldest first" ? "text-black font-bold" : ""
              }`}
            >
              Oldest first
              {selectedOrder === "Oldest first" && <span className="mr-2">✔</span>}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSelectOrder("Newest first")}
              className={`text-gray-400 ${
                selectedOrder === "Newest first" ? "text-black font-bold" : ""
              }`}
            >
              Newest first
              {selectedOrder === "Newest first" && <span className="mr-2">✔</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };
  
  export default SortAndOrderDropdown;