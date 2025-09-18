import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { FiMoreVertical, FiShare2, FiEdit, FiSave, FiFolderPlus, FiTrash2 } from "react-icons/fi";
  
  type ActionDropdownProps = {
    onOpen?: () => void;
    onClose?: () => void;
    onShare?: () => void;
    onRename?: () => void;
    onSaveCase?: () => void;
    onAddToLibrary?: () => void;
    onDelete?: () => void;
  };
  
  const ActionDropdown = ({
    onOpen,
    onClose,
    onShare,
    onRename,
    onSaveCase,
    onAddToLibrary,
    onDelete,
  }: ActionDropdownProps) => {
    return (
      <DropdownMenu
        onOpenChange={(isOpen) => {
          if (isOpen && onOpen) onOpen(); // Trigger onOpen when dropdown opens
          if (!isOpen && onClose) onClose(); // Trigger onClose when dropdown closes
        }}
      >
        <DropdownMenuTrigger className="outline-none">
          <FiMoreVertical size={20} className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem onClick={onShare}>
            <FiShare2 className="mr-2" /> Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRename}>
            <FiEdit className="mr-2" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSaveCase}>
            <FiSave className="mr-2" /> Save Case
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onAddToLibrary}>
            <FiFolderPlus className="mr-2" /> Add to Library
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="text-red-500">
            <FiTrash2 className="mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default ActionDropdown;