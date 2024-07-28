import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { frontendAxiosInstance } from "../../utils/http-common";

export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await frontendAxiosInstance.post('auth/login', payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await frontendAxiosInstance.post('auth/signup', payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const loginWithToken = createAsyncThunk(
  'auth/login_with_token',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await frontendAxiosInstance.get('auth/login_with_token');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await frontendAxiosInstance.get('auth/logout');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

const initialState = {
  user: null,
  token: "",
  isAuthenticate: false,

  signup_status: "",
  login_status: "",
  login_with_token_status: "",
  logout_status: "",

  errorMessage: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = "";
      localStorage.removeItem("token");
      state.signup_status = "";
      state.login_status = "";
      state.login_with_token_status = "";
      state.logout_status = "";
      state.errorMessage = "";
      state.isAuthenticate = false;
    },
    resetStatus: (state) => {
      state.signup_status = "";
      state.login_status = "";
      state.login_with_token_status = "";
      state.logout_status = "";
      state.errorMessage = "";
    },
    setAuthenticate: (state, action) => {
      state.isAuthenticate = action.payload.isAuthenticate;
    },
    setUserAndAuthenticate: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticate = action.payload.isAuthenticate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.result.user;
        state.token = action.payload.result.token;
        localStorage.setItem("token", action.payload.result.token);
        state.login_with_token_status = "success";
        state.errorMessage = action.payload.message;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.login_with_token_status = "pending";
      })
      .addCase(loginWithToken.rejected, (state, action) => {
        state.login_with_token_status = "failed";
        state.errorMessage = action.payload.message;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.result.user;
        state.token = action.payload.result.token;
        localStorage.setItem("token", action.payload.result.token);
        state.login_status = "success";
        state.errorMessage = action.payload.message;
      })
      .addCase(login.pending, (state) => {
        state.login_status = "pending";
      })
      .addCase(login.rejected, (state, action) => {
        state.login_status = "failed";
        state.errorMessage = action.payload.message;
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.result.user;
        state.token = action.payload.result.token;
        localStorage.setItem("token", action.payload.result.token);
        state.signup_status = "success";
        state.errorMessage = action.payload.message;
      })
      .addCase(signup.pending, (state) => {
        state.signup_status = "pending";
      })
      .addCase(signup.rejected, (state, action) => {
        state.signup_status = "failed";
        state.errorMessage = action.payload.message;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.token = "";
        localStorage.removeItem("token");
        state.logout_status = "success";
        state.errorMessage = action.payload.message;
      })
      .addCase(logout.pending, (state) => {
        state.logout_status = "pending";
      })
      .addCase(logout.rejected, (state, action) => {
        state.login_status = "failed";
        state.errorMessage = action.payload.message;
      })
  }
})

export const { resetAuth, resetStatus, setAuthenticate, setUserAndAuthenticate } = authSlice.actions;
export default authSlice.reducer;
