import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import appointmentsReducer from './slices/appointmentSlice'; 
import sessionNoteReducer from './slices/sessionNoteSlice';
import paymentReducer from './slices/paymentSlice';
import counselorReducer from './slices/counselorSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        appointment: appointmentsReducer,
        payment: paymentReducer,
        sessionNote: sessionNoteReducer,
        counselors: counselorReducer,
    },
});

export default store;
