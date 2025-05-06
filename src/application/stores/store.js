import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import subjectReducer from './subjectSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    subjects: subjectReducer,
  },
});
