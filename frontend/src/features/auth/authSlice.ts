import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginRequest, registerRequest } from "./authApi";

const storedUser = localStorage.getItem("userInfo");

const initialState = {
  userInfo: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const data = await loginRequest(
      credentials.email, 
      credentials.password
    );

    localStorage.setItem("userInfo", JSON.stringify(data));

    return data;
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: { name: string; email: string; password: string }) => {
    const data = await registerRequest(
      userData.name,
      userData.email,
      userData.password,
    );

    localStorage.setItem("userInfo", JSON.stringify(data));

    return data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.userInfo = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = "Registration failed";
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
