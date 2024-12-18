
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
    appointments: [],
    loading: false,
    error: null,
    successMessage: '', 
};

export const createAppointment = createAsyncThunk(
    'appointment/create',
    async (appointmentData, { getState, rejectWithValue }) => {
        const token = getState().user.token || localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }

        try {
            const response = await axios.post(`${API_URL}/create`, appointmentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create appointment');
        }
    }
);

export const fetchAppointments = createAsyncThunk(
    'appointment/fetch',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().user.token || localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }

        try {
            const response = await axios.get(`${API_URL}/getsd`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch appointments');
        }
    }
);

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = '';
        },
        clearError: (state) => {
            state.error = null;
        },
        clearAppointments: (state) => {
            state.appointments = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;  
            })
            .addCase(createAppointment.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.appointments.push(payload); 
                state.successMessage = 'Appointment created successfully!'; 
            })
            .addCase(createAppointment.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;  
            })
            .addCase(fetchAppointments.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.appointments = payload;
                state.successMessage = 'Appointments fetched successfully!'; 
            })
            .addCase(fetchAppointments.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { clearSuccessMessage, clearError, clearAppointments } = appointmentSlice.actions;

export default appointmentSlice.reducer;
