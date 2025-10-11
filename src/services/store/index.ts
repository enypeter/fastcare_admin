import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import enrolleesReducer from "../slice/enrolleesSlice";
import hospitalsReducer from "../slice/hospitalSlice"
import doctorsReducer from "../slice/doctorsSlice"
import faqsReducer from '../slice/faqsSlice'
import accountReducer from '../slice/accountSlice'
import amenitiesReducer from "../slice/amenitiesSlice"
import ambulanceProviderReducer from "../slice/ambulanceProviderSlice"
import ambulanceRequestsReducer from "../slice/ambulanceRequestSlice"
import ambulanceReducer from "../slice/ambulanceSlice"
import driverReducer from "../slice/driverSlice"
import respondentsReducer from "../slice/respondentsSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    enrollees: enrolleesReducer,
    hospitals: hospitalsReducer,
    doctors: doctorsReducer,
    faqs: faqsReducer,
    account: accountReducer,
    amenities: amenitiesReducer,
    ambulanceProviders: ambulanceProviderReducer,
    ambulanceRequests: ambulanceRequestsReducer,
    allAmbulances: ambulanceReducer,
    drivers: driverReducer,
    respondents: respondentsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
