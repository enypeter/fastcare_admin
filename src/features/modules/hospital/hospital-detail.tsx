const HospitalDetail = () => {
  return (
    <div className="mt-10 mx-6">
      {/* 2-column form */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10 mt-6  ">
        <div>
          <label className="text-gray-800">Hospital code</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Hospital name</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Consultation fee</label>
          <input
            placeholder="#0.00"
            className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none"
          />
        </div>

        <div>
          <label className="text-gray-800">Registration fee</label>
          <input
            placeholder="#0.00"
            className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none"
          />
        </div>

        <div>
          <label className="text-gray-800">Email address</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Phone number</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Number of clinic</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Hospital address</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Website Url</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>

        <div>
          <label className="text-gray-800">Hospital Ip address</label>
          <input className="w-full border-gray-300 border  rounded-lg px-3 py-3 mt-1 outline-none" />
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
