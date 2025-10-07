import { Hospital } from "@/types";
import { Input } from "@/components/ui/input";

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

  // readOnly styling handled by passing readOnly prop; our custom Input already manages width & base styles

  return (
    <div className="mt-10 mx-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mt-6">
        <div>
          <Input
            label="Hospital code"
            name="hospitalCode"
            value={data.hospitalCode || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Hospital name"
            name="hospitalName"
            value={data.hospitalName || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Physical Consultation fee"
            name="physicalConsultationCharge"
            value={data.physicalConsultationCharge || 0}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="#0.00"
            type="number"
          />
        </div>

        <div>
          <Input
            label="Virtual Consultation fee"
            name="virtualConsultationCharge"
            value={data.virtualConsultationCharge || 0}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="#0.00"
            type="number"
          />
        </div>

        <div>
          <Input
            label="Registration fee"
            name="registrationFee"
            value={data.registrationFee || 0}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="#0.00"
            type="number"
          />
        </div>

        <div>
          <Input
            label="Email address"
            name="email"
            type="email"
            value={data.email || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Phone number"
            name="phoneNumber"
            value={data.phoneNumber || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Hospital Number"
            name="hospitalNumber"
            value={data.hospitalNumber || 0}
            onChange={handleChange}
            readOnly={!isEditing}
            type="number"
          />
        </div>

        <div>
          <Input
            label="Hospital address"
            name="address"
            value={data.address || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Website Url"
            name="website"
            value={data.website || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Hospital Ip address"
            name="ipAddress"
            value={data.hospitalAddresses|| ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
