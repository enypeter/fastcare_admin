import { Hospital } from "@/types";

type Props = {
  data: Hospital | null;
  isEditing: boolean;
  onChange: (updated: Hospital) => void;
};

const HospitalDetail = ({ data, isEditing, onChange }: Props) => {
  if (!data) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const inputClass = (editable: boolean) =>
    `w-full border-gray-300 border rounded-lg text-sm px-3 py-2 mt-1 outline-none ${
      editable ? "bg-white" : "bg-gray-50"
    }`;

  return (
    <div className="mt-10 mx-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mt-6">
        <div>
          <label className="text-gray-800">Hospital code</label>
          <input
            name="hospitalCode"
            value={data.hospitalCode || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Hospital name</label>
          <input
            name="hospitalName"
            value={data.hospitalName || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Consultation fee</label>
          <input
            name="consultationFee"
            value={data.consultationFee || 0}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="#0.00"
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Registration fee</label>
          <input
            name="registrationFee"
            value={data.registrationFee || 0}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="#0.00"
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Email address</label>
          <input
            name="email"
            value={data.email || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Phone number</label>
          <input
            name="phoneNumber"
            value={data.phoneNumber || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Number of clinic</label>
          <input
            name="hospitalNumber"
            value={data.hospitalNumber || 0}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Hospital address</label>
          <input
            name="address"
            value={data.address || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Website Url</label>
          <input
            name="website"
            value={data.website || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass(isEditing)}
          />
        </div>

        <div>
          <label className="text-gray-800">Hospital Ip address</label>
          <input
            name="ipAddress"
            value={data.hospitalAddresses|| ""}
            onChange={handleChange}
            readOnly={!isEditing}
            className={inputClass(isEditing)}
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
