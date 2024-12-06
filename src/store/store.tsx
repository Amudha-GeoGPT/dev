import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../redux/Slice/mapSlice'; // Import your slice reducer
import { useDispatch } from 'react-redux';

// Configure the store
const store = configureStore({
  reducer: {
    map: mapReducer, // Add your reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable check middleware
    }),
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a typed version of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;