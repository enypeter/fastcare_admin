import { Input } from '@/components/ui/input';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hospitalEditSchema, HospitalEditForm } from '@/helpers/hospital-schema';
import { Button } from '@/components/ui/button';
import { Hospital } from '@/types';
import { PhoneInput } from '@/components/ui/phone-input';
import { BankSelect } from '@/components/ui/bank-select';

// Inline schema for edit form (camelCase fields). RegistrationFee conditional.
const editSchema = z.object({
  hospitalName: z.string().min(2, 'Required'),
  hospitalCode: z.string().min(2, 'Required'),
  physicalConsultationFee: z.string().regex(/^\d+$/, 'Digits only').min(1, 'Required'),
  virtualConsultationFee: z.string().regex(/^\d+$/, 'Digits only').min(1, 'Required'),
  hospitalAddresses: z.string().min(5, 'Required'),
  address: z.string().min(5, 'Required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  phoneNumber: z.string().min(7, 'Invalid phone'),
  countryCode: z.string().min(1),
  email: z.string().email('Invalid email'),
  accountNumber: z.string().length(10, 'Must be 10 digits'),
  invoiceAccountNumber: z.string().length(10, 'Must be 10 digits'),
  bankCode: z.string().min(1, 'Required'),
  invoiceBankCode: z.string().min(1, 'Required'),
});
type EditFormValues = z.infer<typeof editSchema>;

interface Props {
  data: Hospital | null;
  isEditing: boolean;
  onSubmitEdit: (payload: Partial<Hospital>) => Promise<void> | void; // parent handles API
  onCancel?: () => void;
};

const HospitalDetail = ({ data, isEditing, onSubmitEdit, onCancel }: Props) => {
  const form = useForm<HospitalEditForm>({
    resolver: zodResolver(hospitalEditSchema),
    defaultValues: {
      hospitalName: '', hospitalCode: '', physicalConsultationFee: '', virtualConsultationFee: '', hospitalAddresses: '', address: '', website: '', phoneNumber: '', countryCode: '+234', email: '', accountNumber: '', invoiceAccountNumber: '', bankCode: '', invoiceBankCode: ''
    },
    mode: 'onBlur',
  });

  const { register, formState: { errors }, watch, handleSubmit, reset, setValue } = form;

  // Populate form when data changes
  useEffect(() => {
    if (!data) return;
    reset({
      hospitalName: data.hospitalName || '',
      hospitalCode: data.hospitalCode || '',
      physicalConsultationFee: (data.physicalConsultationCharge ?? '').toString(),
      virtualConsultationFee: (data.virtualConsultationCharge ?? '').toString(),
      hospitalAddresses: data.hospitalAddresses || '',
      address: data.address || '',
      website: data.website || '',
      phoneNumber: data.phoneNumber || '',
      countryCode: data.countryCode || '+234',
      email: data.email || '',
      accountNumber: (data.accountNumber ?? '').toString(),
      invoiceAccountNumber: (data.invoiceAccountNumber ?? '').toString(),
      bankCode: data.bankCode || '',
      invoiceBankCode: data.invoiceBankCode || '',
    });
  }, [data, reset]);

  const watched = watch();
  const isFormComplete = (() => {
    const required: (keyof EditFormValues)[] = ['hospitalName','hospitalCode','physicalConsultationFee','virtualConsultationFee','hospitalAddresses','address','phoneNumber','email','accountNumber','invoiceAccountNumber','bankCode','invoiceBankCode'];
    if (!required.every(k => typeof watched[k] === 'string' && (watched[k] as string).trim().length > 0)) return false;
    const hasErr = required.some(k => (errors as Record<string, unknown>)[k]);
    if (hasErr) return false;
    return true;
  }, [watch, errors]);

  const onSubmit = (values: HospitalEditForm) => {
    if (!data) return;
    try {
      const fd = new FormData();
      const map: Record<keyof EditFormValues, string> = {
        hospitalName: 'HospitalName', hospitalCode: 'HospitalCode', physicalConsultationFee: 'PhysicalConsultationFee', virtualConsultationFee: 'VirtualConsultationFee', hospitalAddresses: 'HospitalAddresses', address: 'Address', website: 'Website', phoneNumber: 'PhoneNumber', countryCode: 'CountryCode', email: 'Email', accountNumber: 'AccountNumber', invoiceAccountNumber: 'InvoiceAccountNumber', bankCode: 'BankCode', invoiceBankCode: 'InvoiceBankCode'
      };
      const numeric: (keyof EditFormValues)[] = ['physicalConsultationFee','virtualConsultationFee'];
      Object.entries(values).forEach(([k, raw]) => {
        const key = k as keyof EditFormValues;
        const val = (raw ?? '').toString().trim();
        if (!val) return;
        const apiKey = map[key];
        if (!apiKey) return;
        fd.append(apiKey, numeric.includes(key) ? String(Number(val)) : val);
      });
      if (logoFile) fd.append('LogoContent', logoFile);
      await dispatch(updateHospitalFormData({ id: data.id, formData: fd })).unwrap();
      toast.success('Hospital updated');
      dispatch(fetchHospitalById(String(data.id)));
      onUpdated?.();
    } catch (e) {
      toast.error(typeof e === 'string' ? e : 'Update failed');
    }
  };

  if (!data) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 mx-6 space-y-8" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mt-6">
        <Input label="Hospital code" disabled={!isEditing} requiredIndicator required {...register('hospitalCode')} error={errors.hospitalCode?.message} />
        <Input label="Hospital name" disabled={!isEditing} requiredIndicator required {...register('hospitalName')} error={errors.hospitalName?.message} />
  <Input label="Physical Consultation fee" type="number" disabled={!isEditing} requiredIndicator required {...register('physicalConsultationFee')} error={errors.physicalConsultationFee?.message} />
  <Input label="Virtual Consultation fee" type="number" disabled={!isEditing} requiredIndicator required {...register('virtualConsultationFee')} error={errors.virtualConsultationFee?.message} />
        <Input label="Registration fee" type="number" disabled={!isEditing} {...register('registrationFee')} error={errors.registrationFee?.message} />
        <Input label="Email address" type="email" disabled={!isEditing} requiredIndicator required {...register('email')} error={errors.email?.message} />
        <PhoneInput
          value={{ countryCode: watch('countryCode') || '+234', phoneNumber: watch('phoneNumber') || '' }}
          onChange={(val) => {
            if (!isEditing) return;
            // direct set via register not available here; using setValue would require destructure; simpler use form.reset with patch, but to avoid complexity switch to manual hidden inputs? For now keep phone input readOnly when !isEditing.
            setValue('countryCode', val.countryCode);
            setValue('phoneNumber', val.phoneNumber, { shouldValidate: true });
          }}
          required
          error={errors.phoneNumber?.message}
        />
        <Input label="Hospital Address" disabled={!isEditing} requiredIndicator required {...register('address')} error={errors.address?.message} />
        <Input label="Website" disabled={!isEditing} {...register('website')} error={errors.website?.message} />
        <Input label="IP Address" disabled={!isEditing} requiredIndicator required {...register('hospitalAddresses')} error={errors.hospitalAddresses?.message} />
        <BankSelect label="Bank" value={watch('bankCode') || ''} onChange={(code) => setValue('bankCode', code, { shouldValidate: true })} error={errors.bankCode?.message} />
        <Input label="Account Number" maxLength={10} disabled={!isEditing} {...register('accountNumber')} error={errors.accountNumber?.message} />
        <BankSelect label="Invoice Bank" value={watch('invoiceBankCode') || ''} onChange={(code) => setValue('invoiceBankCode', code, { shouldValidate: true })} error={errors.invoiceBankCode?.message} />
        <Input label="Invoice Account Number" maxLength={10} disabled={!isEditing} {...register('invoiceAccountNumber')} error={errors.invoiceAccountNumber?.message} />
      </div>
      {isEditing && (
        <div className="flex gap-4">
          <Button type="submit" disabled={!isFormComplete} className="w-40 disabled:opacity-50 disabled:cursor-not-allowed">Update Hospital</Button>
          {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
        </div>
      )}
    </form>
  );
};

export default HospitalDetail;
