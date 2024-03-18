/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FinalsState{
  requirementFlag:boolean,
  howWorkFlag:boolean,
  platformValue:string,
  streamCheckboxValue:boolean,
  rangeValue: number,
}

const initialState: FinalsState = {
  requirementFlag: false,
  howWorkFlag: false,
  platformValue: 'xbox',
  streamCheckboxValue: false,
  rangeValue: 1,
};

export const finalsSlice = createSlice({
  name: 'finals',
  initialState,
  reducers: {
    changeRequirementFlag: (state) => {
      state.requirementFlag = !state.requirementFlag;
    },
    changeHowWorkFlag: (state) => {
      state.howWorkFlag = !state.howWorkFlag;
    },
    changePlatformValue: (state, action: PayloadAction<string>) => {
      state.platformValue = action.payload;
    },
    changeStreamValue: (state) => {
      state.streamCheckboxValue = !state.streamCheckboxValue;
    },
    changeRangeValue: (state, action:PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= 20) state.rangeValue = action.payload;
    },
  },
});

export const {
  changeRequirementFlag,
  changeHowWorkFlag,
  changePlatformValue,
  changeStreamValue,
  changeRangeValue,
} = finalsSlice.actions;

export const selectFinals = (state: RootState) => state.finals;

export default finalsSlice.reducer;
