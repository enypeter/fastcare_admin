import ChangePassword from "@/components/form/settings/change-password";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="mt-10 mx-6">
      {/* 2-column form */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10 mt-6  ">
        <div>
          <label className="text-gray-800">First name</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Last name</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Email address</label>
          <input
            type="email"
            className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none"
          />
        </div>

        <div className="flex flex-col">
             <label className="text-gray-800">Phone number</label>
          <div className="flex mt-1">
            <span className="bg-gray-100 px-3 py-3 rounded-l-lg border border-r-0 border-gray-300">
              +234
            </span>
            <input
              type="text"
    
              className="w-full placeholder:text-gray-900 border border-gray-300 rounded-r-lg px-3 py-3"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <label className="text-lg ">Password</label>
        <ChangePassword />
      </div>


      <Button className="mt-16 w-44">Update Profile</Button>
    </div>
  );
};

export default Profile;
