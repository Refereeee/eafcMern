/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface PlayoffState{
  requirementFlag:boolean,
  howWorkFlag:boolean,
  platformValue:string,
  streamCheckboxValue:boolean,
  rangeValue: number,
}

const initialState: PlayoffState = {
  requirementFlag: false,
  howWorkFlag: false,
  platformValue: 'pc',
  streamCheckboxValue: false,
  rangeValue: 1,
};

export const playoffSlice = createSlice({
  name: 'playoff',
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
      if (action.payload >= 1 && action.payload <= 10) state.rangeValue = action.payload;
    },
  },
});

export const {
  changeRequirementFlag,
  changeHowWorkFlag,
  changePlatformValue,
  changeStreamValue,
  changeRangeValue,
} = playoffSlice.actions;

export const selectPlayoff = (state: RootState) => state.playoff;

export default playoffSlice.reducer;
