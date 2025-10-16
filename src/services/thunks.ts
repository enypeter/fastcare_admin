import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/services/axiosInstance";
import { AmbulanceProvider, CreateAdminPayload, CreateAmbulanceProvider, CreatePasswordT, CreateRolePayload, LoginT, Transaction, Refund } from "@/types";
import type { AxiosError } from 'axios';

// Utility to safely extract API error messages including plain text bodies
const getErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
  const axiosErr = error as AxiosError<unknown>;
  const respData: unknown = axiosErr.response?.data;
    // If backend returns plain text (string) like "Email address already exists"
    if (typeof respData === 'string') return respData;
    // If backend returns structured object
    if (respData && typeof respData === 'object') {
      const possible = respData as { message?: unknown; error?: unknown; data?: unknown };
      const candidate = possible.message || possible.error || possible.data;
      if (typeof candidate === 'string' && candidate.trim()) return candidate;
    }
    if (axiosErr.message) return axiosErr.message;
  }
  return fallback;
};


export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginT, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/Auth/login", payload);
      const data = res.data;

      // Extract token and everything else as "user"
      const { authToken, ...user } = data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", authToken);

      return { user, token: authToken };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Login failed"));
    }
  }
);

export const createPasswordUser = createAsyncThunk(
  "auth/createPassword",
  async (payload: CreatePasswordT, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/auth/create-password", payload);
      const { user, token } = res.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Password creation failed"));
    }
  }
);


export const createHospital = createAsyncThunk(
  "hospitals/createHospital",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/Hospitals", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to create hospital"));
    }
  }
);

export const fetchHospitals = createAsyncThunk(
  "hospitals/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/Hospitals");
      return res.data; 
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch hospitals"));
    }
  }
);

// Export hospitals list (format: csv = 0, excel = 1)
export const exportHospitals = createAsyncThunk(
  "hospitals/export",
  async (
    params: { format: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get("/Hospitals/export", {
        params,
        responseType: 'blob',
      });
      return { blob: res.data, params };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to export hospitals'));
    }
  }
);


// Fetch hospital by ID
export const fetchHospitalById = createAsyncThunk(
  "hospitals/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/Hospitals/${id}`);
       return res.data; 
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch hospital"));
    }
  }
);

// Activate hospital
export const activateHospital = createAsyncThunk(
  'hospitals/activate',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/Hospitals/${id}/activate`);
      return res.data; // expect updated hospital
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to activate hospital'));
    }
  }
);

// Deactivate hospital
export const deactivateHospital = createAsyncThunk(
  'hospitals/deactivate',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/Hospitals/${id}/deactivate`);
      return res.data; // expect updated hospital or status
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to deactivate hospital'));
    }
  }
);


// Using generic record type for hospital update to avoid any
export const updateHospital = createAsyncThunk(
  "hospitals/updateHospital",
  async (
    hospital: Record<string, unknown> & { id: string | number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await apiClient.put(`/Hospitals/${hospital.id}`, hospital);
      // Immediately trigger a refetch of all hospitals to ensure list stays current
      dispatch(fetchHospitals());
      return response.data; // updated hospital
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Update failed"));
    }
  }
);

// Multipart update allowing LogoContent and other form-data fields
export const updateHospitalFormData = createAsyncThunk(
  "hospitals/updateHospitalFormData",
  async (
    { id, formData }: { id: string | number; formData: FormData },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await apiClient.put(`/Hospitals/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Refetch hospitals list after form-data update (e.g., logo changes)
      dispatch(fetchHospitals());
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to update hospital'));
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (
    params: { page?: number; pageSize?: number } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const { page, pageSize } = params || {};
      const res = await apiClient.get(
        `/doctors?page=${page ?? ''}&pageSize=${pageSize ?? ''}`
      );
      const data = res.data.data.flat();
      return {
        doctors: data,
        totalCount: res.data.metaData?.totalCount ?? data.length,
        totalPages: res.data.metaData?.totalPages ?? 1,
        currentPage: res.data.metaData?.currentPage ?? 1,
        pageSize: res.data.metaData?.pageSize ?? pageSize ?? data.length,
        hasNext: res.data.metaData?.hasNext ?? false,
        hasPrevious: res.data.metaData?.hasPrevious ?? false,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch doctors'));
    }
  }
);

export const fetchPendingDoctors = createAsyncThunk(
 'doctors/fetchPendingDoctors',
  async ({ page, pageSize }: { page: number; pageSize: number }, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/doctors/pending-approval?page=${page}&pageSize=${pageSize}`);
      const data = res.data.data.flat(); 
      return {
        doctors: data,
        totalCount: res.data.metaData?.totalCount ?? data.length,
        totalPages: res.data.metaData?.totalPages ?? 1,
        currentPage: res.data.metaData?.currentPage ?? 1,
        pageSize: res.data.metaData?.pageSize ?? pageSize,
        hasNext: res.data.metaData?.hasNext ?? false,
        hasPrevious: res.data.metaData?.hasPrevious ?? false,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch pending doctors'));
    }
  }
);



// Fetch doctor by ID
export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/doctors/${id}`);
       return res.data.data; 
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch doctor"));
    }
  }
);

// Approve doctor by ID
export const approveDoctor = createAsyncThunk(
  "doctors/approveDoctor",
  async (doctorId: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/doctors/${doctorId}/approve`);
      return res.data; // return updated doctor info if needed
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Approval failed"));
    }
  }
);

// Disapprove (reject) doctor by ID
export const disapproveDoctor = createAsyncThunk(
  "doctors/disapproveDoctor",
  async (
    payload: { doctorId: string; reason?: string },
    { rejectWithValue }
  ) => {
    const { doctorId, reason } = payload;
    try {
      const res = await apiClient.put(`/doctors/${doctorId}/disapprove`, { reason });
      return res.data; // updated doctor object expected
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Disapproval failed"));
    }
  }
);


export const fetchDoctorDashboardById = createAsyncThunk(
  "doctors/fetchDoctotDashboardById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/doctors/${id}/dashboard`);
       return res.data.data; 
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch doctor dashboard"));
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (doctorId: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(`/doctors/${doctorId}`);
      return res.data; // { statusCode, data, metaData }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to delete doctor"));
    }
  }
);

export const fetchFAQs = createAsyncThunk(
  "faq/fetchFAQs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/FAQ");  
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch FAQs'));
    }
  }
);

export const addFAQ = createAsyncThunk(
  "faq/addFAQ",
  async (
    payload: { question: string; answer: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.post("/FAQ", payload);
      return res.data; // return the new FAQ
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to add FAQ"));
    }
  }
);


export const deleteFAQ = createAsyncThunk<number, number>(
  "faq/deleteFAQ",
  async (faqId, { rejectWithValue }) => {
    try {
      await apiClient.put(`/FAQ/delete/${faqId}`);
      return faqId; // returns a number
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Failed to delete FAQ'));
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "account/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/Account/profile");
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch profile"));
    }
  }
)

export const fetchRoles = createAsyncThunk(
  "account/fetchRole",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/Account/get-roles");
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch role"));
    }
  }
)

export const createAdmin = createAsyncThunk(
  "account/createAdmin",
  async (payload: CreateAdminPayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/Account/create-admin", payload);
      return res.data; // newly created admin data
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Failed to create admin"));
    }
  }
);

export const createRole = createAsyncThunk(
  "account/addRole",
  async (payload: CreateRolePayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/Account/add-role", payload);
      return res.data; // newly created admin data
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to create role"));
    }
  }
);

export const updateProfile = createAsyncThunk(
  "account/updateProfile",
  async (payload: Record<string, unknown>, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/Account/update", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Error updating profile"));
    }
  }
);

export const fetchAmbulanceProviders = createAsyncThunk<
  AmbulanceProvider[], // type of returned data
  { page: number; pageSize: number } // argument type
>(
  "providers/fetchAmbulanceProviders",
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/AmbulanceProviders", {
        params: { Page: page, PageSize: pageSize },
      });
      return res.data.data.flat(); 
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch providers"));
    }
  }
);


export const createAmbulanceProviders = createAsyncThunk(
  "account/createAmbulanceProviders",
  async (payload: CreateAmbulanceProvider, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/AmbulanceProviders", payload);
      return res.data; // newly created admin data
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to create ambulance provider"));
    }
  }
);


export const activateAmbulanceProvider = createAsyncThunk(
  "providers/activateAmbulanceProvider",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/AmbulanceProviders/${id}/activate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to activate provider"));
    }
  }
);

export const deactivateAmbulanceProvider = createAsyncThunk(
  "providers/deactivateAmbulanceProvider",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/AmbulanceProviders/${id}/deactivate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to deactivate provider"));
    }
  }
);

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (
    { page, pageSize }: { page: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get("/Article", {
        params: { Page: page, PageSize: pageSize },
      });

      // return structured payload
      return {
        articles: res.data.data,     // actual article list
        metaData: res.data.metaData, // pagination info
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch articles"));
    }
  }
);


export const createArticles = createAsyncThunk(
  "articles/createArticle",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/Article", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to create article"));
    }
  }
);

// -------------------------------------------------
// Transactions Thunks
// -------------------------------------------------

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (
    params: {
      Page?: number;
      PageSize?: number;
      Status?: string | number; // accept numeric enum or string
      HospitalName?: string;
      PatientName?: string;
      Date?: string; // ISO date (backend seems to accept a single date filter)
      ServiceType?: string;
    } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get("/Payment/get-transactions", {
        params: params,
      });

      const data: Transaction[] = res.data.data || [];
      return {
        transactions: data,
        metaData: res.data.metaData || null,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch transactions"));
    }
  }
);

// Export transactions (format: csv = 0, excel = 1)
export const exportTransactions = createAsyncThunk(
  'transactions/export',
  async (
    params: {
      format: number; // csv = 0, excel = 1
      Status?: string | number; // allow numeric enum
      HospitalName?: string;
      PatientName?: string;
      Date?: string;
      ServiceType?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get('/Payment/export', {
        params,
        responseType: 'blob',
      });
      return { blob: res.data, params };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to export transactions'));
    }
  }
);

// -------------------------------------------------
// Refunds Thunks
// -------------------------------------------------

export const fetchRefunds = createAsyncThunk(
  "refunds/fetchAll",
  async (
    params: {
      Page?: number;
      PageSize?: number;
      Status?: number; // success = 1, failed = 2 (per spec)
      PatientName?: string;
      Date?: string;
    } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get("/Refund", { params });
      const data: Refund[] = res.data.data || [];
      return { refunds: data, metaData: res.data.metaData || null };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch refunds"));
    }
  }
);

export const fetchRefundById = createAsyncThunk(
  "refunds/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/Refund/${id}`);
      return res.data as Refund;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch refund details"));
    }
  }
);

export const createRefund = createAsyncThunk(
  "refunds/create",
  async (
    payload: {
      TransactionId: string;
      RefundAmount: number;
      RefundReason: string;
      PatientName: string;
      Document?: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("TransactionId", payload.TransactionId);
      formData.append("RefundAmount", String(payload.RefundAmount));
      formData.append("RefundReason", payload.RefundReason);
      formData.append("PatientName", payload.PatientName);
      if (payload.Document) formData.append("Document", payload.Document);

      const res = await apiClient.post("/Refund", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // Assume API returns the created refund or status
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to create refund"));
    }
  }
);

export const exportRefunds = createAsyncThunk(
  "refunds/export",
  async (
    params: {
      format: number; // excel = 0, csv = 1
      status?: number; // success = 1, failed = 2
      PatientName?: string;
      Date?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get("/Refund/export", {
        params,
        responseType: "blob", // to handle file download
      });
      return { blob: res.data, params };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to export refunds"));
    }
  }
);

// Export a single refund detail (filtered by its own data) using the general export endpoint
export const exportRefundDetail = createAsyncThunk(
  'refunds/exportDetail',
  async (
    params: { Status?: number; PatientName?: string; Date?: string; format: 0 | 1 },
    { rejectWithValue }
  ) => {
    try {
      const { format, ...rest } = params;
      const res = await apiClient.get('/Refund/export', {
        params: { ...rest, format },
        responseType: 'blob',
      });
      const blob = new Blob([res.data], {
        type: format === 0 ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      return { blob, format, query: rest };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to export refund detail'));
    }
  }
);

// Update refund status (Pending=1, Approved=2, Rejected=3)
export const updateRefundStatus = createAsyncThunk(
  'refunds/updateStatus',
  async (
    payload: { id: number; status: 1 | 2 | 3 },
    { rejectWithValue }
  ) => {
    try {
      const { id, status } = payload;
      const res = await apiClient.put(`/Refund/${id}/status/${status}`);
      return res.data; // assume API returns updated refund or status meta
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to update refund status'));
    }
  }
);

// -------------------------------------------------
// Referral Codes (Marketing) Thunks
// -------------------------------------------------

export const fetchReferralSummary = createAsyncThunk(
  "referrals/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/ReferralCode/get-summary");
      return res.data; // { code, totalReferralCodeUsed, staffName }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch referral summary"));
    }
  }
);

export const fetchReferralCodes = createAsyncThunk(
  "referrals/fetchCodes",
  async (
    params: { Page?: number; PageSize?: number; Code?: string; StaffName?: string } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get("/ReferralCode", { params });
      return { codes: res.data.data || [], metaData: res.data.metaData || null };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch referral codes"));
    }
  }
);

export const fetchReferralCodeById = createAsyncThunk(
  "referrals/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/ReferralCode/${id}`);
      return res.data; // { id, code, dateCreated, referralCodeUsers: [] }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch referral code detail"));
    }
  }
);

export const exportReferralCodes = createAsyncThunk(
  "referrals/exportCodes",
  async (
    params: { format: number; Code?: string; StaffName?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get("/ReferralCode/export", {
        params,
        responseType: "blob",
      });
      return { blob: res.data, params };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to export referral codes"));
    }
  }
);

export const exportReferralCodeUsers = createAsyncThunk(
  "referrals/exportUsers",
  async (
    payload: { id: string; format: number },
    { rejectWithValue }
  ) => {
    const { id, format } = payload;
    try {
      const res = await apiClient.get(`/ReferralCode/${id}/export-users-referred`, {
        params: { format },
        responseType: "blob",
      });
      return { blob: res.data, id, format };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to export referral users"));
    }
  }
);

export const generateReferralCodes = createAsyncThunk(
  "referrals/generateCodes",
  async (payload: { UserEmails: string[] }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      payload.UserEmails.forEach(e => formData.append("UserEmails", e));
      const res = await apiClient.post("/ReferralCode", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // assume returns generated codes or status
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to generate referral codes"));
    }
  }
);

// -------------------------------------------------
// Admin Users (Teammates) Thunks
// -------------------------------------------------

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAll",
  async (
    params: { Page?: number; PageSize?: number } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get("/Account/get-admin-users", { params });
      return { users: res.data.data || [], metaData: res.data.metaData || null };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch admin users"));
    }
  }
);

export const updateAdminUser = createAsyncThunk(
  "adminUsers/update",
  async (
    payload: { id: string; name: string; email: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const { id, ...body } = payload;
      const res = await apiClient.put(`/Account/update-admin-user/${id}`, body);
      return res.data; // assume returns updated user
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update admin user"));
    }
  }
);

export const toggleAdminUserActive = createAsyncThunk(
  "adminUsers/toggleActive",
  async (
    payload: { userId: string; activate: boolean },
    { rejectWithValue }
  ) => {
    try {
      // Use distinct endpoints per latest spec: activate => /Account/activate-account, deactivate => /Account/eaactivate-account
      const endpoint = payload.activate
        ? "/Account/activate-account"
        : "/Account/deactivate-account"; // (Note: 'eaactivate' spelling per provided endpoint)
      const res = await apiClient.put(endpoint, null, { params: { userId: payload.userId } });
      return { userId: payload.userId, activate: payload.activate, raw: res.data };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to toggle user active state"));
    }
  }
);

// -------------------------------------------------
// User Reports Thunks
// -------------------------------------------------

export const fetchUserReports = createAsyncThunk(
  'userReports/fetchAll',
  async (
    params: { Page?: number; PageSize?: number } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get('/Account/get-users-report', { params });
      const rawList: unknown = res.data.data || [];
      const list = Array.isArray(rawList) ? rawList.map(item => {
        const d = item as { date?: string; userCount?: number };
        return {
          date: d.date || '',
          userCount: typeof d.userCount === 'number' ? d.userCount : 0,
        };
      }) : [];
      return { list, metaData: res.data.metaData || null };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch user reports'));
    }
  }
);

export const fetchUserReportDetail = createAsyncThunk(
  'userReports/fetchDetail',
  async (
    params: { Date: string; Page?: number; PageSize?: number },
    { rejectWithValue }
  ) => {
    try {
      const { Date, ...rest } = params;
      const res = await apiClient.get(`/Account/get-users-report-detail/${Date}`, { params: rest });
      const rawDetail: unknown = res.data.data || [];
      const detail = Array.isArray(rawDetail) ? rawDetail.map(item => {
        const d = item as { date?: string; email?: string; fullName?: string; phoneNumber?: string };
        return {
          date: d.date || '',
            email: d.email || '',
            fullName: d.fullName || '',
            phoneNumber: d.phoneNumber || '',
        };
      }) : [];
      return { detail, detailMeta: res.data.metaData || null, selectedDate: Date };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch user report detail'));
    }
  }
);

// Export user report detail for a specific date
export const exportUserReportDetail = createAsyncThunk(
  'userReports/exportDetail',
  async (
    params: { Date: string; format: 0 | 1 },
    { rejectWithValue }
  ) => {
    try {
      const { Date, format } = params;
      const res = await apiClient.get(`/Account/export/${Date}`, {
        params: { format },
        responseType: 'blob',
      });
      const blob = new Blob([res.data], {
        type: format === 0 ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      return { blob, format };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to export user report detail'));
    }
  }
);

// -------------------------------------------------
// Appointment Reports Thunks
// -------------------------------------------------

export const fetchAppointmentReports = createAsyncThunk(
  'appointmentReports/fetchAll',
  async (
    params: {
      StartDate?: string;
      EndDate?: string;
      MinDuration?: { ticks: number };
      DoctorName?: string;
      HospitalId?: string;
      ClinicId?: string;
      Page?: number;
      PageSize?: number;
    } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get('/Appointment/filtered', { params });
      const rawList: unknown = res.data.data || [];
      const list = Array.isArray(rawList) ? rawList.map(item => {
        const d = item as { patientName?: string; doctorName?: string | null; date?: string | null; duration?: string | null };
        return {
          patientName: d.patientName || '',
          doctorName: d.doctorName ?? null,
          date: d.date ?? null,
          duration: d.duration ?? null,
        };
      }) : [];
      return { list, metaData: res.data.metaData || null };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to fetch appointment reports'));
    }
  }
);

export const exportAppointmentReports = createAsyncThunk(
  'appointmentReports/export',
  async (
    params: {
      format: number; // csv = 0, excel = 1
      StartDate?: string;
      EndDate?: string;
      MinDuration?: { ticks: number };
      DoctorName?: string;
      HospitalId?: string;
      ClinicId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiClient.get('/Appointment/export', {
        params,
        responseType: 'blob',
      });
      return { blob: res.data, params };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to export appointment reports'));
    }
  }
);
