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
// ------ Amenities ------------

// ------ AmbulanceProvider ------------
export interface AmbulanceProvider {
  id: string;
  registrationNumber: string;
  address: string;
  email: string;
  adminName: string;
  phoneNumber: string;
  serviceCharge: number;
}

export interface AmbulanceProviderState {
  providers: AmbulanceProvider[];
  selectedProvider: AmbulanceProvider | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}
// ------ AmbulanceProvider ------------
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
// ------ AmbulanceRequests ------------
// ------ Ambulance ------------
export interface Location {
  latitude: number;
  longitude: number;
}

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
// ------ Ambulance ------------
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
// -------- Driver ------------
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
// -------- Respondents ------------

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