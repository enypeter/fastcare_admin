const DoctorInformation = () => {
  return (
    <div className="mt-10 mx-6 space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-gray-700">Personal Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-10 mt-6  ">
          <div>
            <label className="text-gray-800">First Name</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>

          <div>
            <label className="text-gray-800">Last Name</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3  gap-10 mt-4  ">
          <div>
            <label className="text-gray-800">Date of Birth</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>

          <div>
            <label className="text-gray-800">Email Address</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>
          <div>
            <label className="text-gray-800">Phone Number</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-800">Residential Address</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-medium text-gray-700">Education/ Qualification</h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-10 mt-6  ">
          <div>
            <label className="text-gray-800">Speciality</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>

          <div>
            <label className="text-gray-800">Yrs. of Experience</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>

           <div>
            <label className="text-gray-800">Medical License Number</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>

          <div>
            <label className="text-gray-800">License Exp. Date</label>
            <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default DoctorInformation;
