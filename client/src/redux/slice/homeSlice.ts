import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { objectForBenefitItems, objectForLinks } from '../../data/homeData';
import { ObjBenefitsType, ObjLinksType } from '../../types/homeDataTypes';

interface HomeState {
    showAll: boolean,
    objectLinks: ObjLinksType[],
    objectBenefitItems: ObjBenefitsType[]
}

const initialState: HomeState = {
  showAll: false,
  objectLinks: objectForLinks,
  objectBenefitItems: objectForBenefitItems,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeShowAll: (state, action:PayloadAction<boolean>) => {
      state.showAll = action.payload;
    },
  },
});

export const {
  changeShowAll,
} = homeSlice.actions;

export const homeOptions = (state: RootState) => state.home;

export default homeSlice.reducer;
