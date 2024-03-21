/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import getCurrentUserFind, { getLoginImage } from './functions/currentUser';

// export const fetchUserByImage = createAsyncThunk(
//   'users/fetchByIdStatus',
//   async () => {
//     const { data } = await axios.get('https://randomuser.me/api');
//     console.log(data);
//     return data.results[0].picture.thumbnail;
//   },
// );

interface CounterState {
    currentUserFind: any,
    image: any,
    headerImageFlagLogin: boolean,
    loadingImgFlag: boolean,
    loginSuccess: boolean,
    burgerOpen: boolean,
    logModal: boolean,
    profileModal: boolean
}

const getLocalUser = getCurrentUserFind();
const getImageLocalStorage = getLoginImage();

const initialState: CounterState = {
  currentUserFind: getLocalUser,
  image: getImageLocalStorage,
  headerImageFlagLogin: false,
  loadingImgFlag: false,
  loginSuccess: false,
  burgerOpen: false,
  logModal: false,
  profileModal: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeImageFlagTrue: (state) => {
      state.headerImageFlagLogin = true;
    },
    changeImageFlagFalse: (state) => {
      state.headerImageFlagLogin = false;
      localStorage.removeItem('loginImage');
      localStorage.removeItem('currentUser');
      state.image = '';
    },
    setLoginSuccessToFalse: (state) => {
      state.loginSuccess = false;
    },
    changeBurgerOpenFlag: (state, action) => {
      state.burgerOpen = action.payload;
    },
    onLogModal: (state) => {
      state.logModal = true;
    },
    offLogModal: (state) => {
      state.logModal = false;
    },
    setProfileModal: (state) => {
      state.profileModal = !state.profileModal;
    }
  },
});

export const {
  changeImageFlagTrue,
  setLoginSuccessToFalse,
  changeBurgerOpenFlag,
  onLogModal,
  offLogModal,
  setProfileModal,
} = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLog = (state: RootState) => state.login;

export default loginSlice.reducer;
