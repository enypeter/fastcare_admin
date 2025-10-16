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
  virtualConsultationCharge: number;
  registrationFee: number;
  physicalConsultationCharge: number;
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
   createLoading: boolean;
  createError: string | null;
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

export interface AmbulanceProvider {
  id: string;
  registrationNumber: string;
  address: string;
  adminName: string;
  email: string;
  phoneNumber: string;
  serviceCharge: number;
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
  createroleLoading: boolean;
  createroleError: string | null;

}


export type CreateAdminPayload = {
  name: string;
  email: string;
  role: string;
};

export type CreateRolePayload = {
  role: string;
};

export type CreateAmbulanceProvider = {
  registrationNumber: string;
  address: string;
  email: string;
  adminName: string;
  phoneNumber: string;
  serviceCharge: number;
};


export type Article = {
  id: number;
  title: string;
  body: string;
  tag: string;
  image: string;
  creationDate: string;
  creatorName: string;
};

export interface MetaData {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ArticleState {
  articles: Article[];
  metaData: MetaData | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}

export type CreateArticle = {
  Title: string;
  Body: string;
  Tag: string;
  Image?: string;
};

// -----------------------------
// Transactions & Refunds Types
// -----------------------------

export interface Transaction {
  hospitalName: string | null;
  patientName: string;
  amount: number;
  date: string; // ISO date string
  serviceType: string; // e.g. Consultation, Registration, Emergency
  paymentStatus: string; // COMPLETED, PENDING, FAILED etc.
  transactionId: string;
}

export interface TransactionsState {
  transactions: Transaction[];
  metaData: MetaData | null;
  loading: boolean;
  error: string | null;
  filters: {
    Page?: number;
    PageSize?: number;
    Status?: string;
    HospitalName?: string;
    PatientName?: string;
    Date?: string; // single date filter (API appears to accept one date parameter)
    ServiceType?: string;
  };
}

export interface Refund {
  id: number;
  refundReason: string;
  refundAmount: number;
  requestDate: string; // ISO date
  disputeDate: string | null; // may be null
  refundReference: string;
  status: string; // PENDING | APPROVED | FAILED ...
  transactionId: string;
  walletNumber: string | null;
  patientName: string;
  patientId: string | null;
  approver: string | null;
  createdBy: string | null;
  document: string | null; // URL or file name
}

export interface RefundsState {
  refunds: Refund[];
  metaData: MetaData | null;
  loading: boolean;
  error: string | null;
  creating: boolean;
  createError: string | null;
  selectedRefund: Refund | null;
  exporting: boolean;
  exportError: string | null;
  filters: {
    Page?: number;
    PageSize?: number;
    Status?: number; // success = 1, failed = 2
    PatientName?: string;
    Date?: string;
  };
}

// -----------------------------
// Referral Codes / Marketing Types
// -----------------------------

export interface ReferralCodeSummary {
  code: string;
  totalReferralCodeUsed: number;
  staffName: string;
}

export interface ReferralCodeItem {
  id: string;
  code: string;
  totalUsersRegistered: number;
  staffName: string;
}

export interface ReferralCodeUser {
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: string; // ISO date
}

export interface ReferralCodeDetail {
  id: string;
  code: string;
  dateCreated: string; // ISO date
  referralCodeUsers: ReferralCodeUser[];
}

export interface ReferralCodesState {
  summary: ReferralCodeSummary | null;
  codes: ReferralCodeItem[];
  selected: ReferralCodeDetail | null;
  metaData: MetaData | null;
  loadingSummary: boolean;
  loadingList: boolean;
  loadingDetail: boolean;
  generating: boolean;
  exportingList: boolean;
  exportingUsers: boolean;
  errorSummary: string | null;
  errorList: string | null;
  errorDetail: string | null;
  generateError: string | null;
  exportListError: string | null;
  exportUsersError: string | null;
  filters: {
    Page?: number;
    PageSize?: number;
    Code?: string;
    StaffName?: string;
  };
}

// -----------------------------
// Admin Users (Teammates) Types
// -----------------------------

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  roleAssigned: string[]; // list of roles assigned
  lastLogin: string | null; // ISO date or null
  isActive: boolean;
}

export interface AdminUsersState {
  users: AdminUser[];
  metaData: MetaData | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateError: string | null;
  toggling: boolean;
  toggleError: string | null;
  filters: {
    Page?: number;
    PageSize?: number;
  };
}

// -----------------------------
// User Reports Types
// -----------------------------

export interface UserReportItem {
  date: string; // ISO date string (e.g. 2020-05-08T00:00:00 or 2020-05-08)
  userCount: number;
}

export interface UserReportDetailItem {
  date: string; // date without time per detail response
  email: string;
  fullName: string;
  phoneNumber: string;
}

export interface UserReportsState {
  list: UserReportItem[];
  detail: UserReportDetailItem[];
  metaData: MetaData | null; // for list
  detailMeta: MetaData | null; // for detail pagination
  loadingList: boolean;
  loadingDetail: boolean;
  errorList: string | null;
  errorDetail: string | null;
  filters: {
    Page?: number;
    PageSize?: number;
  };
  detailFilters: {
    Page?: number;
    PageSize?: number;
    Date?: string; // selected date
  };
}

// -----------------------------
// Appointment Reports Types
// -----------------------------

export interface AppointmentReportItem {
  patientName: string;
  doctorName: string | null;
  date: string | null; // ISO or yyyy-mm-dd
  duration: string | null; // e.g. "1 hour(s)"
}

export interface AppointmentReportsState {
  list: AppointmentReportItem[];
  metaData: MetaData | null;
  loading: boolean;
  error: string | null;
  exporting: boolean;
  exportError: string | null;
  filters: {
    StartDate?: string; // ISO date-time
    EndDate?: string;   // ISO date-time
    MinDuration?: { ticks: number }; // object shape per spec
    DoctorName?: string;
    HospitalId?: string;
    ClinicId?: string;
    Page?: number;
    PageSize?: number;
  };
}

//  ---- Dispatch History --------
export interface Location {
  latitude: number;
  longitude: number;
}

export interface DispatchHistory {
  id: string;
  assignedByUser: string | null;
  driverName: string | null;
  respondantName: string | null;
  ambulanceNumber: string;
  amountPaid: number;
  ambulanceType: string;
  distance: number;
  pickupLocation: Location;
  destinationLocation: Location;
  dateAssigned: string | null;
  amenities: string;
  creationDate: string;
}

export interface DispatchHistoryState {
  dispatchHistory: DispatchHistory[];
  loading: boolean;
  error: string | null;
}
//  ---- Dispatch History --------

