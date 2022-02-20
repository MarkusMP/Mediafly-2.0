import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import profileService from "./profileService";

interface IProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
  followersCount: number;
  followingCount: number;
}

interface IProfileState {
  profile: IProfile | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: IProfileState = {
  profile: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export interface IUpdatedProfile {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  profile_image: string;
  token: string;
}

export const profileById = createAsyncThunk(
  "profile/getById",
  async (profileId: string, thunkAPI) => {
    try {
      return await profileService.getProfileById(profileId);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profileByusername = createAsyncThunk(
  "profile/getByUsername",
  async (username: string, thunkAPI) => {
    try {
      return await profileService.getProfileByUsername(username);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "profile/delete",
  async (token: string, thunkAPI) => {
    try {
      return await profileService.deleteProfile(token);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (updatedProfile: IUpdatedProfile, thunkAPI) => {
    try {
      return await profileService.updateProfile(updatedProfile);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state: IProfileState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileById.pending, (state: IProfileState) => {
        state.isLoading = true;
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        profileById.fulfilled,
        (state: IProfileState, action: PayloadAction<IProfile>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.profile = action.payload;
          state.isError = false;
          state.message = "";
        }
      )
      .addCase(
        profileById.rejected,
        (state: IProfileState, { payload }: any) => {
          state.isLoading = false;
          state.isError = true;
          state.message = payload;
          state.profile = null;
          state.isSuccess = false;
        }
      )
      .addCase(profileByusername.pending, (state: IProfileState) => {
        state.isLoading = true;
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        profileByusername.fulfilled,
        (state: IProfileState, action: PayloadAction<IProfile>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.profile = action.payload;
          state.message = "";
        }
      )
      .addCase(
        profileByusername.rejected,
        (state: IProfileState, { payload }: any) => {
          state.isLoading = false;
          state.isError = true;
          state.message = payload;
          state.profile = null;
          state.isSuccess = false;
        }
      )
      .addCase(deleteProfile.pending, (state: IProfileState) => {
        state.isLoading = true;
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteProfile.fulfilled, (state: IProfileState) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = null;
        state.isError = false;
        state.message = "";
      })
      .addCase(
        deleteProfile.rejected,
        (state: IProfileState, { payload }: any) => {
          state.isLoading = false;
          state.isError = true;
          state.message = payload;
          state.profile = null;
          state.isSuccess = false;
        }
      )
      .addCase(updateProfile.pending, (state: IProfileState) => {
        state.isLoading = true;
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        updateProfile.fulfilled,
        (state: IProfileState, action: PayloadAction<IUpdatedProfile>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profile = state.profile
            ? {
                ...state.profile,
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                bio: action.payload.bio,
                profile_image: action.payload.profile_image,
              }
            : null;
          state.isError = false;
          state.message = "";
        }
      )
      .addCase(
        updateProfile.rejected,
        (state: IProfileState, { payload }: any) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = payload;
        }
      );
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
