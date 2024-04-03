import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface TasksState{
  requirementFlag:boolean,
  howWorkFlag:boolean,
  platformValue:string,
  streamCheckboxValue:boolean,
  rangeValue: number,
}

const initialState: TasksState = {
  requirementFlag: false,
  howWorkFlag: false,
  platformValue: 'pc',
  streamCheckboxValue: false,
  rangeValue: 1,
};

export const tasksSlice = createSlice({
  name: 'tasks',
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
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
