import { Input } from '@/components/ui/input';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hospitalEditSchema, HospitalEditForm } from '@/helpers/hospital-schema';
import { Button } from '@/components/ui/button';
import { Hospital } from '@/types';
import { PhoneInput } from '@/components/ui/phone-input';
import { BankSelect } from '@/components/ui/bank-select';

type Props = {
  data: Hospital | null;
  isEditing: boolean;
  onSubmitEdit: (payload: Partial<Hospital>) => Promise<void> | void; // parent handles API
  onCancel?: () => void;
};

const HospitalDetail = ({ data, isEditing, onSubmitEdit, onCancel }: Props) => {
  const form = useForm<HospitalEditForm>({
    resolver: zodResolver(hospitalEditSchema),
    defaultValues: {
      hospitalCode: '',
      hospitalName: '',
      physicalConsultationFee: '',
      virtualConsultationFee: '',
      registrationFee: '',
      hospitalAddresses: '',
      address: '',
      hospitalNumber: '',
      website: '',
      phoneNumber: '',
      email: '',
      accountNumber: '',
      invoiceAccountNumber: '',
      bankCode: '',
      invoiceBankCode: '',
      countryCode: '+234',
    },
    mode: 'onBlur',
  });

  const { register, formState: { errors }, watch, handleSubmit, reset, setValue } = form;

  // Populate form when data changes
  useEffect(() => {
    if (data) {
      reset({
        hospitalCode: data.hospitalCode || '',
        hospitalName: data.hospitalName || '',
  physicalConsultationFee: (data.physicalConsultationCharge ?? '').toString(),
  virtualConsultationFee: (data.virtualConsultationCharge ?? '').toString(),
        registrationFee: (data.registrationFee ?? '').toString(),
        hospitalAddresses: data.hospitalAddresses || '',
        address: data.address || '',
        hospitalNumber: (data.hospitalNumber ?? '').toString(),
        website: data.website || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        accountNumber: (data.accountNumber ?? '').toString(),
        invoiceAccountNumber: (data.invoiceAccountNumber ?? '').toString(),
        bankCode: data.bankCode || '',
        invoiceBankCode: data.invoiceBankCode || '',
        countryCode: data.countryCode || '+234',
      });
    }
  }, [data, reset]);

  // Mirror AddHospital enable logic subset for edit (no bank/account here)
  const isFormComplete = useMemo(() => {
    const v = watch();
    const required: (keyof HospitalEditForm)[] = [
      'hospitalCode',
      'hospitalName',
  'physicalConsultationFee',
  'virtualConsultationFee',
      'hospitalAddresses',
      'address',
      'phoneNumber',
      'email',
      // Bank/account fields optional if API allows null; only enforce if partially filled? We'll not include here.
    ];
    const filled = required.every(k => typeof v[k] === 'string' && v[k].trim().length > 0);
    if (!filled) return false;
    const hasErr = required.some(k => (errors as Record<string, unknown>)[k]);
    if (hasErr) return false;
    return true;
  }, [watch, errors]);

  const onSubmit = (values: HospitalEditForm) => {
    if (!data) return;
    // Convert string fields back to expected numeric fields where needed
    const payload: Partial<Hospital> = {
      id: data.id,
      hospitalCode: values.hospitalCode.toUpperCase(),
      hospitalName: values.hospitalName,
  physicalConsultationCharge: Number(values.physicalConsultationFee),
  virtualConsultationCharge: Number(values.virtualConsultationFee),
      registrationFee: values.registrationFee ? Number(values.registrationFee) : 0,
      hospitalAddresses: values.hospitalAddresses,
      address: values.address,
      hospitalNumber: values.hospitalNumber || '',
      website: values.website,
      phoneNumber: values.phoneNumber,
      email: values.email,
      accountNumber: values.accountNumber || undefined,
      invoiceAccountNumber: values.invoiceAccountNumber || undefined,
      bankCode: values.bankCode || undefined,
      invoiceBankCode: values.invoiceBankCode || undefined,
      countryCode: values.countryCode || '+234',
    };
    onSubmitEdit(payload);
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
        <Input label="Hospital Number" type="text" disabled={!isEditing} {...register('hospitalNumber')} error={errors.hospitalNumber?.message} />
        <Input label="Hospital address" disabled={!isEditing} requiredIndicator required {...register('address')} error={errors.address?.message} />
        <Input label="Website Url" disabled={!isEditing} {...register('website')} error={errors.website?.message} />
        <Input label="Hospital Ip address" disabled={!isEditing} requiredIndicator required {...register('hospitalAddresses')} error={errors.hospitalAddresses?.message} />
        <BankSelect
          label="Bank"
          value={watch('bankCode') || ''}
          onChange={(code) => setValue('bankCode', code, { shouldValidate: true })}
          error={errors.bankCode?.message}
        />
        <Input
          label="Account Number"
          maxLength={10}
          disabled={!isEditing}
          {...register('accountNumber')}
          error={errors.accountNumber?.message}
        />
        <BankSelect
          label="Invoice Bank"
          value={watch('invoiceBankCode') || ''}
          onChange={(code) => setValue('invoiceBankCode', code, { shouldValidate: true })}
          error={errors.invoiceBankCode?.message}
        />
        <Input
          label="Invoice Account Number"
          maxLength={10}
          disabled={!isEditing}
          {...register('invoiceAccountNumber')}
          error={errors.invoiceAccountNumber?.message}
        />
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
