import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AuthSlice from './features/AuthSlice';
const rootReducer = combineReducers({
  login: AuthSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
