import { z } from 'zod';

// Base schema for adding a hospital (string-based for form inputs)
export const hospitalSchema = z.object({
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
    .optional(),
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
    .optional(),
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

// Edit schema uses charge field names that differ from add form and omits bank fields (if not editable here)
export const hospitalEditSchema = z.object({
  hospitalCode: hospitalSchema.shape.hospitalCode,
  hospitalName: hospitalSchema.shape.hospitalName,
  physicalConsultationFee: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(6, 'Max 6 digits')
    .refine(v => /^\d+$/.test(v), { message: 'Digits only' }),
  virtualConsultationFee: z
    .string()
    .trim()
    .min(1, 'Required')
    .max(6, 'Max 6 digits')
    .refine(v => /^\d+$/.test(v), { message: 'Digits only' }),
  registrationFee: z
    .string()
    .trim()
    .max(6, 'Max 6 digits')
    .refine(v => !v || /^\d+$/.test(v), { message: 'Digits only' })
    .optional(),
  hospitalAddresses: hospitalSchema.shape.hospitalAddresses,
  address: hospitalSchema.shape.address,
  hospitalNumber: hospitalSchema.shape.hospitalNumber,
  website: hospitalSchema.shape.website,
  phoneNumber: hospitalSchema.shape.phoneNumber,
  email: hospitalSchema.shape.email,
  accountNumber: z
    .string()
    .trim()
    .optional(), // validation removed per request (backend allows empty)
  invoiceAccountNumber: z
    .string()
    .trim()
    .optional(), // validation removed per request
  bankCode: z.string().optional(),
  invoiceBankCode: z.string().optional(),
  countryCode: hospitalSchema.shape.countryCode.optional(),
});

export type HospitalAddForm = z.infer<typeof hospitalSchema>;
export type HospitalEditForm = z.infer<typeof hospitalEditSchema>;
