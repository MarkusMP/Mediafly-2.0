import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import followerReducer from "../features/follower/followerSlice";
import postReducer from "../features/post/postSlice";
import commentReducer from "../features/comment/commentSlice";

export const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  follower: followerReducer,
  post: postReducer,
  comment: commentReducer,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    follower: followerReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
