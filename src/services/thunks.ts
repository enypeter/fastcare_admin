import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/services/axiosInstance";
import { AmbulanceProvider, CreateAdminPayload, CreateAmbulanceProvider, CreatePasswordT, CreateRolePayload, LoginT } from "@/types";


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
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
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
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Password creation failed");
    }
  }
);


export const createHospital = createAsyncThunk(
  "hospitals/createHospital",
  async (formData: FormData) => {
    const response = await apiClient.post("/Hospitals", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const fetchHospitals = createAsyncThunk(
  "hospitals/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/Hospitals");
      return res.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch hospitals");
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
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const updateHospital = createAsyncThunk(
  "hospitals/updateHospital",
  async (hospital: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/Hospitals/${hospital.id}`, hospital);
      return response.data; // updated hospital
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (
    params?: { page?: number; pageSize?: number } // ✅ optional param
  ) => {
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
  }
);

export const fetchPendingDoctors = createAsyncThunk(
 'doctors/fetchPendingDoctors',
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
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
  }
);



// Fetch doctor by ID
export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/doctors/${id}`);
       return res.data.data; 
    } catch (err: any) {
      return rejectWithValue(err.message);
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
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Approval failed");
    }
  }
);


export const fetchDoctorDashboardById = createAsyncThunk(
  "doctors/fetchDoctotDashboardById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/doctors/${id}/dashboard`);
       return res.data.data; 
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (doctorId: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(`/doctors/${doctorId}`);
      return res.data; // { statusCode, data, metaData }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to delete doctor");
    }
  }
);

export const fetchFAQs = createAsyncThunk(
  "faq/fetchFAQs",
  async () => {
    const res = await apiClient.get("/FAQ");  
    return res.data;
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
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add FAQ");
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
      return rejectWithValue(err);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "account/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/Account/profile");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
)

export const fetchRoles = createAsyncThunk(
  "account/fetchRole",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/Account/get-roles");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch role");
    }
  }
)

export const createAdmin = createAsyncThunk(
  "account/createAdmin",
  async (payload: CreateAdminPayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/Account/create-admin", payload);
      return res.data; // newly created admin data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createRole = createAsyncThunk(
  "account/addRole",
  async (payload: CreateRolePayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/Account/add-role", payload);
      return res.data; // newly created admin data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "account/updateProfile",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/Account/update", payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error updating profile");
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
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch providers");
    }
  }
);


export const createAmbulanceProviders = createAsyncThunk(
  "account/createAmbulanceProviders",
  async (payload: CreateAmbulanceProvider, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/AmbulanceProviders", payload);
      return res.data; // newly created admin data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const activateAmbulanceProvider = createAsyncThunk(
  "providers/activateAmbulanceProvider",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/AmbulanceProviders/${id}/activate`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deactivateAmbulanceProvider = createAsyncThunk(
  "providers/deactivateAmbulanceProvider",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/AmbulanceProviders/${id}/deactivate`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);