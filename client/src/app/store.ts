import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import followerReducer from "../features/follower/followerSlice";

export const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  follower: followerReducer,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    follower: followerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
