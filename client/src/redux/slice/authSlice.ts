import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { RootState } from '../store';
import { IUser } from '../../models/IUser';

interface Params{
    email:string,
    password:string
}

let useroid = {} as IUser;
export const createUser = createAsyncThunk('/register', async (params:Params) => {
  const { email, password } = params;
  const { data } = await AuthService.registration(email, password);
  localStorage.setItem('token', data.accessToken);
  console.log(data);
  useroid = data.user;
});

export const loginUser = createAsyncThunk('/login', async (params:Params) => {
  const { email, password } = params;
  const { data } = await AuthService.login(email, password);
  localStorage.setItem('token', data.accessToken);
  useroid = data.user;
});

export const refresh = createAsyncThunk('/refresh', async () => {
  const { data } = await AuthService.checkAuth();
  localStorage.setItem('token', data.accessToken);
  useroid = data.user;
});

export const logout = createAsyncThunk('/logout', async () => {
  await AuthService.logout();
  localStorage.removeItem('token');
});

interface GlobalAuth {
  isAuth: boolean,
  imageFlag: boolean,
  passwordVisible: boolean,
  passwordType: boolean,
  loginError: boolean,
  registerError: boolean,
  user: IUser
}
const initialState:GlobalAuth = {
  isAuth: false,
  imageFlag: false,
  passwordVisible: false,
  passwordType: true,
  loginError: false,
  registerError: false,
  user: {} as IUser,
};

// eslint-disable-next-line import/prefer-default-export
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeEyeValue: (state, action: PayloadAction<boolean>) => {
      state.passwordVisible = action.payload;
      state.passwordType = !state.passwordType;
    },
    deleteLoginError: (state) => {
      state.loginError = false;
    },
    deleteRegisterError: (state) => {
      state.registerError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state) => {
      state.isAuth = true;
      state.imageFlag = true;
      state.user = useroid;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.registerError = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isAuth = true;
      state.imageFlag = true;
      state.user = useroid;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loginError = true;
    });
    builder.addCase(refresh.fulfilled, (state) => {
      state.isAuth = true;
      state.imageFlag = true;
      state.user = useroid;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.imageFlag = false;
      state.user = {} as IUser;
    });
  },
});

export const {
  changeEyeValue,
  deleteLoginError,
  deleteRegisterError,
} = authSlice.actions;

export const authOptions = (state: RootState) => state.auth;

export default authSlice.reducer;
