/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserStatusT = string;
export type SubscriptionT = string;
export type PaymentStatusT = string;
export type ApplicationStatusT = string;
export type JobStatusT = string;
export type CourseStatusT = string;

export type CreatePasswordT = {
  password: string;
  token: string;
};

export type LoginT = {
  email: string;
  password: string;
  deviceToken? : string;
  role?: string;
};

// types/auth.ts
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
  /** Optional legacy id */
  oldId?: string | null;
  firstName: string;
  lastName: string;
  otherNames: string | null;
  dateOfBirth?: string;
  residentialAddress ?: string | null;
  licenseExpirationDate?: string;
  email: string;
  phoneNumber: string;
  bio: string | null;
  licenseNumber: string;
  consultancyFee: number;
  agreeToTerms: boolean;
  specialization: string;
  isActive: boolean | null;
  isDoctorAvailable: boolean;
  feePercentage: number;
  bankCode: string;
  accountNumber: string;
  name: string;
  photo: string | null;
  password: string | null;
  yearsOfExperience: number;
  role: string;
  deviceToken: string | null;
  /** Raw license file object or null when not uploaded */
  licenseFile: LicenseFile | null;
  licenseName?: string | null;
  licenseType?: string | null;
  licenseContent?: string | null;
  languages: string[];
  qualifications: string[];
  hospital: string | null;
  profileImage: string | null;
  averageRating: number;
  totalPatientsServed: number;
  /**
   * Approval status: true = approved, false = rejected, null = pending.
   * Backend returns null for pending requests, so we model that explicitly.
   */
  isApproved: boolean | null;
  totalReviews: number;
  /** Online status e.g. 'Available' | 'Offline' */
  status: string;
  userId?: string;
  /** Optional creation date returned for pending approval listings */
  createdAt?: string;
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

// ------ Amenities ------------
export interface Amenity {
  equipmentName: string;
  description: string;
  action: boolean;
}

export interface AmenitiesState {
  amenities: Amenity[];
  selectedAmenity: Amenity | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
  updateLoading: boolean;
  updateError: string | null;
}

export type CreateAmbulanceProvider = {
  registrationNumber: string;
  address: string;
  email: string;
  adminName: string;
  phoneNumber: string;
  serviceCharge: number;
};

export interface AmbulanceProviderState {
  providers: AmbulanceProvider[];
  selectedProvider: AmbulanceProvider | null;
}

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

// ------ AmbulanceRequests ------------
export interface Location {
  latitude: number;
  longitude: number;
}

export interface AmbulanceRequest {
  id: string;
  ambulanceProviderId: string;
  userId: string;
  clientName: string;
  clientAge: string;
  clientGender: string | null;
  ambulanceId: string;
  ambulanceNumber: string;
  ambulanceType: string;
  distance: number;
  pickupLocation: Location;
  destinationLocation: Location;
  creationDate: string;
  emergencyType: string;
  amenities: string;
  pickupAddress: string | null;
  destinationAddress: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface AmbulanceRequestState {
  requests: AmbulanceRequest[];
  currentRequest: AmbulanceRequest | null;
  loading: boolean;
  error: string | null;
  selectedRequestId: string | null;
}

export type AmbulanceType = 'Emergency' | 'Transport' | 'ICU' | 'BLS' | 'ALS';
export type RequestFilters = Partial<Pick<AmbulanceRequest, 'ambulanceType' | 'emergencyType'>>;

// ------ Ambulance ------------
export interface Ambulance {
  id: string;
  status: string;
  ambulanceProviderId: string;
  pricePerKm: number | null;
  baseRateFee: number;
  plateNumber: string;
  amenities: string;
  address: string | null;
  location: Location;
  creationDate: string;
}

export interface AmbulanceState {
  ambulances: Ambulance[];
  selectedAmbulance: Ambulance | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
  updateLoading: boolean;
  updateError: string | null;
}

export type CreateAmbulanceData = Omit<Ambulance, 'id' | 'creationDate'>;
export type UpdateAmbulanceData = Partial<Omit<Ambulance, 'id' | 'creationDate'>>;

// ------ Driver ------------
export interface Driver {
  id: string;
  name: string;
  certificationStatus: string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  ambulanceProviderId: string;
}

export interface DriverState {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  currentDriver: Driver | null;
}

export interface AddDriverData {
  name: string;
  certificationStatus: string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  ambulanceProviderId: string;
}

// -------- Respondents ------------
export interface Respondent {
  id: string;
  name: string;
  certificationStatus: string;
  professionalLicense: string;
  phoneNumber: string;
  email: string;
  address: string;
  ambulanceProviderId: string;
}

export interface RespondentsState {
  respondents: Respondent[];
  selectedRespondents: Respondent | null;
  loading: boolean;
  error: string | null;
}

//  ---- Dispatch History --------
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
  exporting?: boolean;
  exportError?: string | null;
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
  // Flags for exporting a single refund detail
  exportingDetail?: boolean;
  exportDetailError?: string | null;
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
  exportingDetail?: boolean;
  exportDetailError?: string | null;
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