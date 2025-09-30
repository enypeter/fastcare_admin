import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import enrolleesReducer from "../slice/enrolleesSlice";
import hospitalsReducer from "../slice/hospitalSlice"
import doctorsReducer from "../slice/doctorsSlice"
import faqsReducer from '../slice/faqsSlice'
import accountReducer from '../slice/accountSlice'
import ambulanceReducer from '../slice/ambulanceSlice'
import articlesReducer from '../slice/articleSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    enrollees: enrolleesReducer,
    hospitals: hospitalsReducer,
    doctors: doctorsReducer,
    faqs: faqsReducer,
    account: accountReducer,
    ambulance: ambulanceReducer,
    articles: articlesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
