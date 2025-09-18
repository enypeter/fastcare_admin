import file from "/svg/file.svg";
import ActionDropdown from "./action";
import { useState } from "react";
import saved from "/svg/saved.svg";


export const CardView = ({
  data,
}: {
  data: { name: string; editedAt: string; action: string; saved: boolean }[];
}) => {
  const [activeCard, setActiveCard] = useState<number | null>(null); // Track the active card index

  const handleDropdownOpen = (index: number) => {
    setActiveCard(index); // Set the active card index when the dropdown is opened
  };

  const handleDropdownClose = () => {
    setActiveCard(null); // Reset the active card index when the dropdown is closed
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {data.map((item, index) => (
        <div
          key={index}
          className={`py-6 px-4 border rounded-lg flex flex-col gap-2 ${
            activeCard === index
              ? "bg-blue-100 text-primary border-primary"
              : "bg-[#FAFAF8] text-gray-800 border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <img src={file} alt="" className="w-10 h-10" />

                  {item.saved && (
                    <img src={saved} alt="Saved" className="w-6 h-6" />
                  )}
                 </div>
             
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Edited {item.editedAt}</p>
                </div>
                <div>
                  {/* Reusable Action Dropdown */}
                  <ActionDropdown
                    onOpen={() => handleDropdownOpen(index)} // Trigger when dropdown opens
                    onClose={handleDropdownClose} // Trigger when dropdown closes
                    onShare={() => console.log("Share clicked")}
                    onRename={() => console.log("Rename clicked")}
                    onSaveCase={() => console.log("Save Case clicked")}
                    onAddToLibrary={() => console.log("Add to Library clicked")}
                    onDelete={() => console.log("Delete clicked")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};