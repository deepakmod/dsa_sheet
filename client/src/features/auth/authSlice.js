import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginService, getMe } from '../../services/authService';
import { toggleProblemStatus as toggleService } from '../../services/dsaService';
import Cookies from 'js-cookie';

const token = Cookies.get('token') || null;

const initialState = {
  user: null,
  token: token,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await loginService(email, password);
      Cookies.set('token', data.token, { expires: 1 });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loadUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const data = await getMe();
    return data;
  } catch (error) {
    Cookies.remove('token');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const toggleProblemStatus = createAsyncThunk(
  'auth/toggleProblemStatus',
  async (problemId, thunkAPI) => {
    try {
      const res = await toggleService(problemId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove('token');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.msg || 'Login Failed';
      })
      .addCase(loadUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.msg || 'Failed to load user';
        state.user = null;
        state.token = null;
      })
      .addCase(toggleProblemStatus.fulfilled, (state, action) => {
        if (state.user) {
          state.user.completedProblems = action.payload;
        }
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;