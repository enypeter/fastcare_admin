import { useRef, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useOnClickOutside } from '@/helpers/helper';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


import { ChevronDown, Settings, UserCircle } from 'lucide-react';
import LogOut from '../features/modules/dashboard/logout';


export const User = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);


  const logoutRef = useRef(null);
  useOnClickOutside(logoutRef, () => setShowLogout(false));

  return (
    <div ref={logoutRef}>
      <div className='flex items-center gap-4 '>
        <div className='flex items-center gap-2'>
          <Avatar className="rounded-lg">
            <AvatarFallback className="uppercase w-10 h-10 bg-primary text-white font-bold">
              A
            </AvatarFallback>
          </Avatar>
          <h1>Admin</h1>

        </div>

        <button onClick={() => setShowLogout(!showLogout)}>
          <ChevronDown />

        </button>

      </div>


      {showLogout && (
        <>
          {/* Overlay background with blur */}
          {/* <div className="fixed inset-0 bg-white opacity-50 backdrop-blur-sm z-10">
            
          </div> */}

          <div className="absolute right-5 top-18 shadow-lg w-64  bg-white rounded-xl grid p-2 gap-y-3 z-20">
            <div className=" capitalize font-medium w-full flex flex-col p-2 gap-x-2 items-start rounded-lg">

              <div className="space-y-1">

                <button
                  className="flex items-center text-gray-700 py-[7px] gap-x-4 text-md  rounded-lg"
                >
                  <UserCircle className="size-[24px]" />
                  Profile
                </button>

                <button
                  className="flex items-center text-gray-700 py-[7px] gap-x-4 text-md  rounded-lg"
                >
                  <Settings className="size-[24px]" />
                  Account Settings
                </button>


                <button
                 onClick={() => setOpenLogout(true)}
                  className="flex items-center text-gray-700 py-[7px] gap-x-4 text-md  rounded-lg"
                >
                  <FiLogOut className="size-[24px]" />
                  Log out
                </button>




              </div>
            </div>

          </div>
        </>
      )}

      <LogOut 
       open={openLogout} 
       setOpen={setOpenLogout}
      />


    </div>
  );
};
