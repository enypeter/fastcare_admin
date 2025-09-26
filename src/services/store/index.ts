import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import enrolleesReducer from "../slice/enrolleesSlice";
import hospitalsReducer from "../slice/hospitalSlice"
import doctorsReducer from "../slice/doctorsSlice"
import faqsReducer from '../slice/faqsSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    enrollees: enrolleesReducer,
    hospitals: hospitalsReducer,
    doctors: doctorsReducer,
    faqs: faqsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
