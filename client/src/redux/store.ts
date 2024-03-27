import { configureStore } from '@reduxjs/toolkit';
import register from './slice/registerSlice';
import login from './slice/loginSLice';
import home from './slice/homeSlice';
import playoff from './slice/playoffSlice';
import auth from './slice/authSlice';
import cart from './slice/cartSlice';
import finals from './slice/finalsSlice';
import divisions from './slice/divisionsSlice';

export const store = configureStore({
  reducer: {
    register,
    login,
    home,
    playoff,
    auth,
    cart,
    finals,
    divisions
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
