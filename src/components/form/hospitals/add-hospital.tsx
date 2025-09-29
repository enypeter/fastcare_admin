import {ImageIcon, X} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import Success from '../../../features/modules/dashboard/success';
import {Switch} from '@/components/ui/switch';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/services/store';
import {createHospital} from '@/services/thunks';
import toast from 'react-hot-toast';

export default function AddHospital() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRegInput, setShowRegInput] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalCode: '',
    hospitalNumber: '',
    physicalConsultationFee: '',
    virtualConsultationFee: '',
    registrationFee: '',
    hospitalAddresses: '',
    address: '',
    website: '',
    phoneNumber: '',
    countryCode: '+234', // default Nigeria code
    email: '',
    accountNumber: '',
    invoiceAccountNumber: '',
    bankCode: '',
    invoiceBankCode: '',
    logoContent: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;

    // fees stay as flexible input, format on blur
    if (
      name === 'physicalConsultationFee' ||
      name === 'virtualConsultationFee' ||
      name === 'registrationFee'
    ) {
      setFormData(prev => ({...prev, [name]: value}));
    }
    // ensure countryCode always starts with +
    else if (name === 'countryCode') {
      setFormData(prev => ({
        ...prev,
        countryCode: value.startsWith('+') ? value : `+${value}`,
      }));
    }
    // phoneNumber only allows digits
    else if (name === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({...prev, phoneNumber: digitsOnly}));
    } else {
      setFormData(prev => ({...prev, [name]: value}));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (
      name === 'physicalConsultationFee' ||
      name === 'virtualConsultationFee' ||
      name === 'registrationFee'
    ) {
      const num = parseFloat(value);
      setFormData(prev => ({
        ...prev,
        [name]: isNaN(num) ? '' : num.toFixed(1),
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({...prev, logoContent: file}));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          payload.append(key, value as any);
        }
      });

      await dispatch(createHospital(payload)).unwrap();

    // Open success modal first
      setOpenSuccess(true);

      // Then close the form dialog after a short delay (optional)
      setTimeout(() => setOpen(false), 200);

      // reset
      setFormData({
        hospitalName: '',
        hospitalCode: '',
        hospitalNumber: '',
        physicalConsultationFee: '',
        virtualConsultationFee: '',
        registrationFee: '',
        hospitalAddresses: '',
        address: '',
        website: '',
        phoneNumber: '',
        countryCode: '+234',
        email: '',
        accountNumber: '',
        invoiceAccountNumber: '',
        bankCode: '',
        invoiceBankCode: '',
        logoContent: null,
      });
      setPreviewUrl(null);

    } catch (error: any) {
      console.error('Error adding hospital:', error.message);
      toast.error(error.message)
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  const inputClass =
    'w-full border-gray-300 border rounded-lg px-3 py-2 mt-1 outline-none';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-2 w-36 rounded-md">Add Hospital</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle className="flex w-full items-center justify-between border-b py-2">
            <span className="text-gray-800 text-xl font-normal py-2">
              Add Hospital
            </span>
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-scroll h-[300px] lg:h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-gray-800">Hospital Code</label>
              <input
                name="hospitalCode"
                value={formData.hospitalCode}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-gray-800">Hospital Name</label>
              <input
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-gray-800">Virtual Consultation Fee</label>
              <input
                name="virtualConsultationFee"
                value={formData.virtualConsultationFee}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="#0.0"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-gray-800">Physical Consultation Fee</label>
              <input
                name="physicalConsultationFee"
                value={formData.physicalConsultationFee}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="#0.0"
                className={inputClass}
              />
            </div>

            {/* Country code + phone number in one row */}
            <div className="flex gap-2">
              <div className="w-1/3">
                <label className="text-gray-800">Code</label>
                <input
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  placeholder="+234"
                  className={inputClass}
                />
              </div>
              <div className="w-2/3">
                <label className="text-gray-800">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="8012345678"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="text-gray-800">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-gray-800">Hospital Address</label>
              <input
                name="hospitalAddresses"
                value={formData.hospitalAddresses}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-gray-800">Website</label>
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Registration Fee toggle */}
          <div className="mt-6">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold text-lg text-gray-800">
                Registration service fee
              </h1>
              <Switch
                checked={showRegInput}
                onCheckedChange={setShowRegInput}
              />
            </div>
            {showRegInput && (
              <div className="mt-3">
                <input
                  name="registrationFee"
                  value={formData.registrationFee}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="#0.0"
                  className={inputClass}
                />
              </div>
            )}
          </div>

          {/* Banking fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <label className="text-gray-800">Account Number</label>
              <input
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-gray-800">Invoice Account Number</label>
              <input
                name="invoiceAccountNumber"
                value={formData.invoiceAccountNumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-gray-800">Bank Code</label>
              <input
                name="bankCode"
                value={formData.bankCode}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-gray-800">Invoice Bank Code</label>
              <input
                name="invoiceBankCode"
                value={formData.invoiceBankCode}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="mt-8">
            <label className="text-gray-800">Logo Content</label>
            <div className="flex">
              <label
                htmlFor="logo-upload"
                className="border-2 border-gray-300 rounded-lg w-full lg:w-[500px] h-64 flex flex-col items-center justify-center text-center cursor-pointer transition"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Logo Preview"
                    className="h-full object-contain p-4"
                  />
                ) : (
                  <>
                    <ImageIcon className="w-14 h-14 mb-4 text-gray-500" />
                    <p className="mb-4 font-medium text-lg text-gray-700">
                      Drag and Drop to upload logo
                    </p>
                  </>
                )}
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center gap-4 mt-8">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="py-2 w-48 rounded-md flex items-center justify-center gap-2"
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isLoading ? 'Adding...' : 'Add hospital'}
          </Button>
        </div>
      </DialogContent>

      <Success
        open={openSuccess}
        setOpen={setOpenSuccess}
        text="You've successfully added a new Hospital"
         //onClose={() => dispatch(fetchHospitals())}
      />
    </Dialog>
  );
}
