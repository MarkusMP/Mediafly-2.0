import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import followerReducer from "../features/follower/followerSlice";
import postReducer from "../features/post/postSlice";

export const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  follower: followerReducer,
  post: postReducer,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    follower: followerReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
