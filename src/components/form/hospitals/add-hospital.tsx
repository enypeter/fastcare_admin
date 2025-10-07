import { ImageIcon, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Success from '../../../features/modules/dashboard/success';
import { Switch } from '@/components/ui/switch';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { createHospital, fetchHospitals } from '@/services/thunks';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInput } from '@/components/ui/phone-input';
import { BankSelect } from '@/components/ui/bank-select';

// Form value shape
type HospitalFormValues = {
  hospitalName: string;
  hospitalCode: string;
  physicalConsultationFee: string;
  virtualConsultationFee: string;
  registrationFee: string; // conditional required (only when toggle active)
  hospitalAddresses: string;
  address: string; // backend expects Address separately
  hospitalNumber: string; // maps to HospitalNumber (string digits)
  website: string; // the only optional field
  phoneNumber: string;
  countryCode: string; // no validation required, default +234
  email: string;
  accountNumber: string;
  invoiceAccountNumber: string;
  bankCode: string;
  invoiceBankCode: string;
};

// Schema with new stricter requirements
const hospitalSchema = z.object({
  hospitalCode: z
    .string({ required_error: 'Hospital code is required' })
    .trim()
    .min(1, 'Hospital code is required')
    .max(30, 'Max 30 characters')
    .transform(v => v.toUpperCase()),
  hospitalName: z
    .string({ required_error: 'Hospital name is required' })
    .trim()
    .min(2, 'Min 2 characters')
    .max(50, 'Max 50 characters')
    .refine(v => /^[A-Za-z ]+$/.test(v), { message: 'Only alphabets and spaces allowed' }),
  physicalConsultationFee: z
    .string({ required_error: 'Physical consultation fee is required' })
    .trim()
    .min(1, 'Required')
    .max(6, 'Max 6 digits')
    .refine(v => /^\d+$/.test(v), { message: 'Digits only' }),
  virtualConsultationFee: z
    .string({ required_error: 'Virtual consultation fee is required' })
    .trim()
    .min(1, 'Required')
    .max(6, 'Max 6 digits')
    .refine(v => /^\d+$/.test(v), { message: 'Digits only' }),
  registrationFee: z
    .string()
    .trim()
    .max(6, 'Max 6 digits')
    .refine(v => !v || /^\d+$/.test(v), { message: 'Digits only' })
    .optional(), // enforced manually when toggle enabled
  hospitalAddresses: z
    .string({ required_error: 'Hospital address is required' })
    .trim()
    .min(10, 'Min 10 characters')
    .max(100, 'Max 100 characters'),
  address: z
    .string({ required_error: 'Address is required' })
    .trim()
    .min(5, 'Min 5 characters')
    .max(100, 'Max 100 characters'),
  hospitalNumber: z
    .string()
    .trim()
    .max(15, 'Max 15 digits')
    .refine(v => !v || /^\d+$/.test(v), { message: 'Digits only' })
    .optional(),
  website: z
    .string()
    .trim()
    .optional(), // only optional field per requirements
  phoneNumber: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(7, 'Min 7 digits')
    .max(15, 'Max 15 digits')
    .refine(v => /^\d+$/.test(v), { message: 'Digits only' }),
  countryCode: z.string().optional(),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Invalid email')
    .max(50, 'Max 50 characters'),
  accountNumber: z
    .string({ required_error: 'Account number is required' })
    .trim()
    .length(10, 'Must be 10 digits')
    .refine(v => /^\d{10}$/.test(v), { message: 'Must be 10 digits' }),
  invoiceAccountNumber: z
    .string({ required_error: 'Invoice account number is required' })
    .trim()
    .length(10, 'Must be 10 digits')
    .refine(v => /^\d{10}$/.test(v), { message: 'Must be 10 digits' }),
  bankCode: z
    .string({ required_error: 'Bank code is required' })
    .trim()
    .min(1, 'Required'),
  invoiceBankCode: z
    .string({ required_error: 'Invoice bank code is required' })
    .trim()
    .min(1, 'Required'),
});

export default function AddHospital() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRegInput, setShowRegInput] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const {
  register,
  handleSubmit,
  setValue,
  setError,
  reset,
  watch,
  formState: { errors },
  } = useForm<HospitalFormValues>({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      hospitalName: '',
      hospitalCode: '',
      physicalConsultationFee: '',
      virtualConsultationFee: '',
      registrationFee: '',
      hospitalAddresses: '',
      address: '',
      hospitalNumber: '',
      website: '',
      phoneNumber: '',
      countryCode: '+234',
      email: '',
      accountNumber: '',
      invoiceAccountNumber: '',
      bankCode: '',
      invoiceBankCode: '',
    },
    mode: 'onBlur',
  });

  // Ensure fees & numeric fields respect max length constraints on change
  const clampDigits = (val: string, maxLen: number) => val.replace(/\D/g, '').slice(0, maxLen);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: HospitalFormValues) => {
    // Conditional validation for registration fee
    if (showRegInput && !values.registrationFee) {
      setError('registrationFee', { type: 'manual', message: 'Registration fee is required' });
      return;
    }
    setIsLoading(true);
    try {
      const payload = new FormData();

      // Ensure defaults for optional/back-end required fields
      const registrationFeeValue = showRegInput && values.registrationFee ? values.registrationFee : '0';
      const hospitalNumberValue = values.hospitalNumber || '0';
      const addressValue = values.address || values.hospitalAddresses; // fallback duplicate

      // Map form keys to backend PascalCase keys
      const map: Record<string, string> = {
        hospitalName: 'HospitalName',
        hospitalCode: 'HospitalCode',
        hospitalNumber: 'HospitalNumber',
        physicalConsultationFee: 'PhysicalConsultationFee',
        virtualConsultationFee: 'VirtualConsultationFee',
        registrationFee: 'RegistrationFee',
        hospitalAddresses: 'HospitalAddresses',
        address: 'Address',
        website: 'Website',
        phoneNumber: 'PhoneNumber',
        countryCode: 'CountryCode',
        email: 'Email',
        accountNumber: 'AccountNumber',
        invoiceAccountNumber: 'InvoiceAccountNumber',
        bankCode: 'BankCode',
        invoiceBankCode: 'InvoiceBankCode',
      };

      const withDefaults = {
        ...values,
        registrationFee: registrationFeeValue,
        hospitalNumber: hospitalNumberValue,
        address: addressValue,
      };

      Object.entries(withDefaults).forEach(([k, v]) => {
        const apiKey = map[k];
        if (apiKey && v !== undefined && v !== null && v !== '') {
          payload.append(apiKey, v as string);
        }
      });

      if (logoFile) payload.append('LogoContent', logoFile);

  await dispatch(createHospital(payload)).unwrap();
  // Refetch hospitals list to ensure UI reflects newly added hospital
  dispatch(fetchHospitals());

      setOpenSuccess(true);
      setTimeout(() => setOpen(false), 200);

      reset();
      setShowRegInput(false);
      setLogoFile(null);
      setPreviewUrl(null);
    } catch (error: unknown) {
      console.error('Error adding hospital:', error);
      interface WithMessage { message: string }
      const message = ((): string => {
        if (typeof error === 'string') {
          return error;
        }
        if (typeof error === 'object' && error && 'message' in error) {
          const maybe = error as Partial<WithMessage>;
            if (maybe.message) return maybe.message;
        }
        return 'Failed to add hospital';
      })();
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

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
        <form
          className="overflow-scroll h-[300px] lg:h-[300px]"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Input
              label="Hospital Code"
              required
              requiredIndicator
              maxLength={30}
              {...register('hospitalCode')}
              error={errors.hospitalCode?.message}
            />
            <Input
              label="Hospital Name"
              required
              requiredIndicator
              minLength={2}
              maxLength={50}
              {...register('hospitalName')}
              error={errors.hospitalName?.message}
            />
            <Input
              label="Hospital Number"
              placeholder="e.g. 12"
              maxLength={15}
              {...register('hospitalNumber', {
                onChange: e => {
                  const v = clampDigits(e.target.value, 15);
                  setValue('hospitalNumber', v, { shouldValidate: true });
                },
              })}
              error={errors.hospitalNumber?.message}
            />
            <Input
              label="Virtual Consultation Fee"
              type="number"
              min={0}
              max={999999}
              inputMode="numeric"
              placeholder="e.g. 5000"
              {...register('virtualConsultationFee', {
                onChange: e => {
                  const v = clampDigits(e.target.value, 6);
                  setValue('virtualConsultationFee', v, { shouldValidate: true });
                },
              })}
              error={errors.virtualConsultationFee?.message}
            />
            <Input
              label="Physical Consultation Fee"
              type="number"
              min={0}
              max={999999}
              inputMode="numeric"
              placeholder="e.g. 7000"
              {...register('physicalConsultationFee', {
                onChange: e => {
                  const v = clampDigits(e.target.value, 6);
                  setValue('physicalConsultationFee', v, { shouldValidate: true });
                },
              })}
              error={errors.physicalConsultationFee?.message}
            />
            <PhoneInput
              value={{ countryCode: watch('countryCode') || '+234', phoneNumber: watch('phoneNumber') || '' }}
              onChange={(val) => {
                setValue('countryCode', val.countryCode); // no validation needed
                setValue('phoneNumber', val.phoneNumber, { shouldValidate: true });
              }}
              required // only phone number is effectively required
              error={errors.phoneNumber?.message || undefined}
            />
            <Input
              label="Email"
              type="email"
              required
              maxLength={50}
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Ip Address"
              required
              minLength={10}
              maxLength={100}
              {...register('hospitalAddresses')}
              error={errors.hospitalAddresses?.message}
            />
            <Input
              label="Hospital Address"
              required
              minLength={5}
              maxLength={100}
              placeholder="Primary address"
              {...register('address')}
              error={errors.address?.message}
            />
            <Input
              label="Website"
              placeholder="https://example.com"
              {...register('website')}
              error={errors.website?.message}
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold text-lg text-gray-800">
                Registration service fee
              </h1>
              <Switch
                checked={showRegInput}
                onCheckedChange={checked => {
                  setShowRegInput(!!checked);
                  if (!checked) setValue('registrationFee', '');
                }}
              />
            </div>
            {showRegInput && (
              <div className="mt-3">
                <Input
                  label="Registration Fee"
                  placeholder="e.g. 3000"
                  type="number"
                  min={0}
                  max={999999}
                  inputMode="numeric"
                  {...register('registrationFee', {
                    onChange: e => {
                      const v = clampDigits(e.target.value, 6);
                      setValue('registrationFee', v, { shouldValidate: true });
                    },
                  })}
                  error={errors.registrationFee?.message}
                />
              </div>
            )}
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <BankSelect
                label="Bank"
                required
                value={watch('bankCode')}
                onChange={code => setValue('bankCode', code, { shouldValidate: true })}
                error={errors.bankCode?.message}
              />
              <Input
                label="Account Number"
                placeholder="0123456789"
                required
                maxLength={10}
                {...register('accountNumber', {
                  onChange: e => {
                    const v = clampDigits(e.target.value, 10);
                    setValue('accountNumber', v, { shouldValidate: true });
                  },
                })}
                error={errors.accountNumber?.message}
              />
              <BankSelect
                label="Invoice Bank"
                required
                value={watch('invoiceBankCode')}
                onChange={code => setValue('invoiceBankCode', code, { shouldValidate: true })}
                error={errors.invoiceBankCode?.message}
              />
              <Input
                label="Invoice Account Number"
                placeholder="0123456789"
                required
                maxLength={10}
                {...register('invoiceAccountNumber', {
                  onChange: e => {
                    const v = clampDigits(e.target.value, 10);
                    setValue('invoiceAccountNumber', v, { shouldValidate: true });
                  },
                })}
                error={errors.invoiceAccountNumber?.message}
              />
            </div>

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

          <div className="flex justify-between items-center gap-4 mt-8">
            <Button
              type="submit"
              disabled={isLoading}
              className="py-2 w-48 rounded-md flex items-center justify-center gap-2"
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {isLoading ? 'Adding...' : 'Add hospital'}
            </Button>
          </div>
        </form>
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
