import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SquadState{
  requirementFlag:boolean,
  howWorkFlag:boolean,
  platformValue:string,
  streamCheckboxValue:boolean,
  rangeValue: number,
}

const initialState: SquadState = {
  requirementFlag: false,
  howWorkFlag: false,
  platformValue: 'pc',
  streamCheckboxValue: false,
  rangeValue: 1,
};

export const squadSlice = createSlice({
  name: 'squad',
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
} = squadSlice.actions;

export const selectSquad = (state: RootState) => state.squad;

export default squadSlice.reducer;
