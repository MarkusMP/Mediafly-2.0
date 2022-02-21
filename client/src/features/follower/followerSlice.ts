import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import profileService from "./followerService";

interface IProfile {
  id: string;
  username: string;
  profile_image: string;
  firstName: string;
  lastName: string;
  bio: string;
  created_at: string;
  updated_at: string;
}

interface IFollowing {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
  updated_at: string;
  following: IProfile;
}

interface IFollowers {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
  updated_at: string;
  followers: IProfile;
}

interface IFollowerState {
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFollowing: string;
  followers: IFollowers[];
  follwing: IFollowing[];
}

export interface IFollower {
  profileId: string;
  token: string;
}

interface IFollowerPayload {
  message: string;
}

const initialState: IFollowerState = {
  message: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  followers: [],
  follwing: [],
  isFollowing: "",
};

export const isFollowing = createAsyncThunk(
  "follower/isFollowing",
  async (data: IFollower, thunkAPI) => {
    try {
      return await profileService.isFollowing({
        token: data.token,
        profileId: data.profileId,
      });
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const follow = createAsyncThunk(
  "follower/follow",
  async (data: IFollower, thunkAPI) => {
    try {
      return await profileService.follow({
        token: data.token,
        profileId: data.profileId,
      });
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unFollow = createAsyncThunk(
  "follower/unfollow",
  async (data: IFollower, thunkAPI) => {
    try {
      return await profileService.unFollow({
        token: data.token,
        profileId: data.profileId,
      });
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  "follower/fetchFollowers",
  async (profileId: string, thunkAPI) => {
    try {
      return await profileService.fetchFollowers(profileId);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  "follower/fetchFollowing",
  async (profileId: string, thunkAPI) => {
    try {
      return await profileService.fetchFollowing(profileId);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const followerSlice = createSlice({
  name: "follower",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isFollowing.pending, (state: IFollowerState) => {
        state.isLoading = true;
      })
      .addCase(
        isFollowing.fulfilled,
        (state, action: PayloadAction<IFollowerPayload>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isFollowing = action.payload.message;
        }
      )
      .addCase(isFollowing.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(follow.pending, (state: IFollowerState) => {
        state.isLoading = true;
      })
      .addCase(
        follow.fulfilled,
        (state, action: PayloadAction<IFollowerPayload>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        }
      )
      .addCase(follow.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(unFollow.pending, (state: IFollowerState) => {
        state.isLoading = true;
      })
      .addCase(
        unFollow.fulfilled,
        (state, action: PayloadAction<IFollowerPayload>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        }
      )
      .addCase(unFollow.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchFollowers.pending, (state: IFollowerState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFollowers.fulfilled,
        (state, action: PayloadAction<IFollowers[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.followers = action.payload;
        }
      )
      .addCase(fetchFollowers.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchFollowing.pending, (state: IFollowerState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFollowing.fulfilled,
        (state, action: PayloadAction<IFollowing[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.follwing = action.payload;
        }
      )
      .addCase(fetchFollowing.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = followerSlice.actions;

export default followerSlice.reducer;
