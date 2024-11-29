import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../../redux/Slice/mapSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    map: mapReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
