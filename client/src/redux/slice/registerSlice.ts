import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import getLocalStorageItems from './functions/getLocalStorageItems';

interface CounterState {
  regModal: boolean,
  items: any,
  noticeFlag:boolean,
  isAuth:boolean,
}

const getLocalItems = getLocalStorageItems();

const initialState: CounterState = {
  regModal: false,
  items: getLocalItems,
  noticeFlag: false,
  isAuth: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
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
  noticeFlagToOff,
  onRegModal,
  offRegModal,
} = registerSlice.actions;

export const selectReg = (state: RootState) => state.register;

export default registerSlice.reducer;
