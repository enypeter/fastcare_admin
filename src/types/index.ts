/* eslint-disable @typescript-eslint/no-explicit-any */


export type CreatePasswordT = {
  password: string;
  token: string;
};

export type LoginT = {
  email: string;
  password: string;
  deviceToken? : string;
  role?: string;
};// types/auth.ts
export interface User {
  id: string;
  email: string;
  userRole: string;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  countryCode: string;
  residentialAddress: string;
  hospitalID: string;
  patientId: string;
  hospital: number;
  hospitalName: string;
  hospitalCode: string;
  hospitalLogo: string;
  profileImage: string;
  phoneNumberVerified: boolean;
  emailVerified: boolean;
  websiteUrl: string;
  gender: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}


export interface Hospital {
  id: number;
  hospitalName: string;
  hospitalCode: string;
  userId: string;
  hospitalNumber: string;
  virtualConsultationFee: number;
  registrationFee: number;
  physicalConsultationFee: number;
  consultationFee: number;
  status: string;
  isActive: boolean;
  date: string;
  hospitalAddresses: string;
  isPatient: boolean;
  logoContent: string;
  hospitalLogo: string;
  logoUrl: string;
  address: string;
  website: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  patientId: string;
  accountNumber: string;
  invoiceAccountNumber: string;
  bankCode: string;
  invoiceBankCode: string;
  ipAddress?: string;
}

export interface HospitalState {
  hospitals: Hospital[];
  selectedHospital: Hospital | null; 
  loading: boolean;
  error: string | null;
}




export interface LicenseFile {
  licenseName: string;
  licenseType: string;
  licenseContent: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  dateOfBirth?: string;
  residentialAddress ?: string;
  licenseExpirationDate?: string;
  email: string;
  phoneNumber: string;
  bio: string;
  licenseNumber: string;
  consultancyFee: number;
  agreeToTerms: boolean;
  specialization: string;
  isActive: boolean;
  isDoctorAvailable: boolean;
  feePercentage: number;
  bankCode: string;
  accountNumber: string;
  name: string;
  photo: string;
  password: string;
  yearsOfExperience: number;
  role: string;
  deviceToken: string;
  licenseFile: LicenseFile;
  languages: string[];
  qualifications: string[];
  hospital: string;
  profileImage: string;
  averageRating: number;
  totalPatientsServed: number;
  isApproved: boolean;
  totalReviews: number;
  status: number;
  userId?: string
}
export interface CallsStatistics {
  totalEarned: number;
  todayEarned: number;
  totalCalls: number;
  todayCalls: number;
  completedCalls: number;
  missedCalls: number;
  percentageMissedCalls: number;
  percentageCompletedCalls: number;
}

export interface PerformanceMetric {
  satisfactionPercentage: string;
  rating: string;
  averageCallDuration: string;
  responseTime: string;
}

export interface DoctorRecentCall {
  patientName: string;
  reason: string;
  createdDate: string;
  callDuration: string;
  amount: number;
  status: string;
}

export interface DashboardData {
  callsStatistics: CallsStatistics | null;
  performanceMetric: PerformanceMetric | null;
  doctorRecentCalls: DoctorRecentCall[];
}

export interface DoctorsState {
  doctors: Doctor[];
  pendingDoctors: Doctor[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
  loading: boolean;
  selectedDoctor: Doctor | null;
  error: string | null;

  dashboard: DashboardData | null;
}



export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface FAQState {
  faqs: FAQ[];
  loading: boolean;
  error: string | null;
}

// types/account.ts
export interface MedicalDetail {
  weight: number | null;
  height: number | null;
  bloodGroup: string | null;
  genotype: string | null;
  allergies: string | null;
  knownMedicalConditions: string | null;
}

export interface ProfileType {
  id: string;
  dateRegistered: string | null;
  dateOfBirth: string | null;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  stateCode: string | null;
  countryCode: string | null;
  country: string | null;
  residentialAddress: string | null;
  nextOfKinFirstName: string | null;
  nextOfKinMiddleName: string | null;
  nextOfKinLastName: string | null;
  nextOfKinEmail: string | null;
  nextOfKinPhone: string | null;
  nextOfkinRelationship: string | null;
  nextOfKinAddress: string | null;
  lgaOfOrigin: string | null;
  gender: string | null;
  maritalStatus: string | null;
  phoneNumber: string | null;
  medicalDetail: MedicalDetail;
  deviceToken: string | null;
  profileImageName: string | null;
  profileImagePath: string | null;
}

export interface AccountState {
  profile: ProfileType | null;
  loading: boolean;
  error: string | null;
    roles: any | null;
  rolesLoading: boolean;
  rolesError: string | null;
   createLoading: boolean;
  createError: string | null;
    updateLoading: boolean;
  updateSuccess: boolean;

}



export type CreateAdminPayload = {
  name: string;
  email: string;
  role: string;
};