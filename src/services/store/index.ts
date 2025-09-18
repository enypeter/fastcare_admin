import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import enrolleesReducer from "../slice/enrolleesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    enrollees: enrolleesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
