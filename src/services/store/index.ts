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
// import ambulanceReducer from "../slice/ambulanceSlice"
import driverReducer from "../slice/driverSlice"
import respondentsReducer from "../slice/respondentsSlice"
import dispatchHistoryReducer from "../slice/dispatchHistorySlice"
import ambulanceReducer from '../slice/ambulanceSlice'
import articlesReducer from '../slice/articleSlice'
import transactionsReducer from '../slice/transactionSlice'
import refundsReducer from '../slice/refundSlice'
import referralsReducer from '../slice/referralSlice'
import adminUsersReducer from '../slice/adminUsersSlice'
import userReportsReducer from '../slice/userReportsSlice'
import appointmentReportsReducer from '../slice/appointmentReportsSlice'


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
    respondents: respondentsReducer,
    dispatchHistory: dispatchHistoryReducer,
    ambulance: ambulanceReducer,
    articles: articlesReducer,
    transactions: transactionsReducer,
    refunds: refundsReducer,
    referrals: referralsReducer,
    adminUsers: adminUsersReducer,
    userReports: userReportsReducer,
    appointmentReports: appointmentReportsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
