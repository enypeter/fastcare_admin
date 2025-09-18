import file from "/svg/file.svg";
import ActionDropdown from "./action";
import { useState } from "react";
import saved from "/svg/saved.svg";


export const TableView = ({
  data,
}: {
  data: { name: string; editedAt: string; action: string, saved: boolean }[];
}) => {
  const [activeRow, setActiveRow] = useState<number | null>(null); // Track the active row index

  const handleDropdownOpen = (index: number) => {
    setActiveRow(index); // Set the active row index when the dropdown is opened
  };

  const handleDropdownClose = () => {
    setActiveRow(null); // Reset the active row index when the dropdown is closed
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full">
        <thead>
          <tr>
            <td className="border-gray-200 px-4 py-2 text-left text-sm text-gray-700">
              Name
            </td>
            <td className="border-gray-200 px-10 lg:px-4 py-2 text-left text-sm text-gray-700">
              Last modified
            </td>
            <td className="border-gray-200 px-4 py-2 text-left text-sm text-gray-700">
              Created At
            </td>
            <td className="border-gray-200 px-4 py-2 text-left"></td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${
                activeRow === index
                  ? "bg-blue-100 text-primary w-full border-primary"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            >
              <td className="border-gray-200 px-4 py-3 text-lg font-medium flex items-center gap-2 whitespace-nowrap">
                <img src={file} alt="file icon" className="lg:w-8 lg:h-8" /> {item.name}
              </td>
              <td className="border-gray-200 px-10 lg:px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                Edited {item.editedAt}
              </td>
              <td className="border-gray-200 px-4 py-3 text-sm flex items-center gap-12 text-gray-700 whitespace-nowrap">
                {item.editedAt}

                {item.saved && (
                    <img src={saved} alt="Saved" className="w-5 h-5" />
                  )}
              </td>
              <td className="border-gray-200 px-4 py-3 text-sm text-gray-700">
                <ActionDropdown
                  onOpen={() => handleDropdownOpen(index)} // Trigger when dropdown opens
                  onClose={handleDropdownClose} // Trigger when dropdown closes
                  onShare={() => console.log("Share clicked")}
                  onRename={() => console.log("Rename clicked")}
                  onSaveCase={() => console.log("Save Case clicked")}
                  onAddToLibrary={() => console.log("Add to Library clicked")}
                  onDelete={() => console.log("Delete clicked")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};