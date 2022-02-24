import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import commentService from "./commentService";

export interface ICreateComment {
  postId: string;
  text: string;
  token: string;
}

export interface IDeleteComment {
  token: string;
  commentId: string;
}

export interface ILikeComment {
  commentId: string;
  token: string;
}
export interface IUnlikeComment {
  commentId: string;
  token: string;
}

interface IDeleteCommentPayload {
  message: string;
  commentId: string;
}

interface ICommentState {
  message: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  likeMessage: string;
  comments: IComment[];
}

interface IComment {
  id: string;
  post_id: string;
  text: string;
  created_at: string;
  likesCount: number;
  profile: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    profile_image: string;
  };
}

const initialState: ICommentState = {
  message: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  likeMessage: "",
  comments: [],
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data: ICreateComment, thunkAPI) => {
    try {
      return await commentService.createComment({
        postId: data.postId,
        text: data.text,
        token: data.token,
      });
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchCommentsByPostId = createAsyncThunk(
  "comment/fetchCommentsByPostId",
  async (postId: string, thunkAPI) => {
    try {
      return await commentService.fetchCommentsByPostId(postId);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (data: IDeleteComment, thunkAPI) => {
    try {
      return await commentService.deleteComment(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentLike = createAsyncThunk(
  "comment/commentLike",
  async (data: ILikeComment, thunkAPI) => {
    try {
      return await commentService.commentLike(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentUnlike = createAsyncThunk(
  "comment/commentUnlike",
  async (data: IUnlikeComment, thunkAPI) => {
    try {
      return await commentService.commentUnlike(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<string>) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.comments = state.comments.filter(
        (comment) => comment.post_id !== action.payload
      );
    },
    likeSuccess: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload) {
          comment.likesCount += 1;
        }
        return comment;
      });
    },
    unlikeSuccess: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload) {
          comment.likesCount -= 1;
        }
        return comment;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state: ICommentState) => {
        state.isLoading = true;
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "";
          state.comments = [...state.comments, action.payload];
        }
      )
      .addCase(createComment.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchCommentsByPostId.pending, (state: ICommentState) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(
        fetchCommentsByPostId.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "";
          state.comments = [...state.comments, ...action.payload];
        }
      )
      .addCase(fetchCommentsByPostId.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(deleteComment.pending, (state: ICommentState) => {
        state.isLoading = true;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<IDeleteCommentPayload>) => {
          console.log(action.payload);
          state.isLoading = false;
          state.isSuccess = true;
          state.comments = state.comments.filter(
            (comment) => comment.id !== action.payload.commentId
          );
          state.message = action.payload.message;
        }
      )
      .addCase(deleteComment.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(commentLike.pending, (state: ICommentState) => {
        state.isLoading = true;
      })
      .addCase(commentLike.fulfilled, (state, action: any) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.likeMessage = action.payload.message;
      })
      .addCase(commentLike.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.likeMessage = payload.message;
      })
      .addCase(commentUnlike.pending, (state: ICommentState) => {
        state.isLoading = true;
      })
      .addCase(commentUnlike.fulfilled, (state, action: any) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.likeMessage = action.payload.message;
      })
      .addCase(commentUnlike.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.likeMessage = payload.message;
      });
  },
});

export const { reset, likeSuccess, unlikeSuccess } = commentSlice.actions;

export default commentSlice.reducer;
