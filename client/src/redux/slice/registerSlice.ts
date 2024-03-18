/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import getLocalStorageItems from './functions/getLocalStorageItems';
// import isValidLog from './functions/isValidLog';

interface CounterState {
  // loginFlag: boolean,
  // passwordFlag: boolean,
  // repeatPasswordFlag: boolean,
  regModal: boolean,
  buttonValue: boolean,
  items: any,
  registerFlag: boolean,
  noticeFlag:boolean,
  isAuth:boolean,
  headerImageFlagReg: boolean
}

const getLocalItems = getLocalStorageItems();

const initialState: CounterState = {
  // loginFlag: false,
  // passwordFlag: false,
  // repeatPasswordFlag: false,
  regModal: false,
  buttonValue: true,
  items: getLocalItems,
  registerFlag: false,
  noticeFlag: false,
  isAuth: false,
  headerImageFlagReg: false,
};

export const registerSlice = createSlice({
  name: 'register',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeButtonValue: (state, action: PayloadAction<boolean>) => {
      state.buttonValue = action.payload;
    },
    registerFlagToOff: (state) => {
      state.registerFlag = false;
    },
    noticeFlagToOff: (state) => {
      state.noticeFlag = false;
    },
    onRegModal: (state) => {
      state.regModal = true;
    },
    offRegModal: (state) => {
      state.regModal = false;
    },
  },
});

export const {
  // changeLoginFlagValue,
  // changePasswordFlagValue,
  // changeRepeatPasswordFlagValue,
  changeButtonValue,
  // setLocalStorageItem,
  registerFlagToOff,
  noticeFlagToOff,
  onRegModal,
  offRegModal,
} = registerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReg = (state: RootState) => state.register;

export default registerSlice.reducer;
