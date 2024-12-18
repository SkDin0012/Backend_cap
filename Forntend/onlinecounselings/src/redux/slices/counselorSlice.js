import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
    counselors: [], 
    loading: false,
    error: null,
    selectedCounselor: null, 
    successMessage: '', 
};

export const fetchCounselors = createAsyncThunk('counselor/fetch', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const fetchCounselorById = createAsyncThunk('counselor/fetchById', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

export const createCounselor = createAsyncThunk('counselor/create', async (counselorData) => {
    const response = await axios.post(`${API_URL}/create`, counselorData); 
    return response.data;
});

export const updateCounselor = createAsyncThunk('counselor/update', async ({ id, updatedData }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
});

export const deleteCounselor = createAsyncThunk('counselor/delete', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const counselorSlice = createSlice({
    name: 'counselor',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = ''; 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCounselors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounselors.fulfilled, (state, action) => {
                state.loading = false;
                state.counselors = action.payload;
            })
            .addCase(fetchCounselors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCounselorById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounselorById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCounselor = action.payload; 
            })
            .addCase(fetchCounselorById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCounselor.fulfilled, (state, action) => {
                state.successMessage = 'Counselor created successfully!';
                state.counselors.push(action.payload);
            })
            .addCase(createCounselor.rejected, (state, action) => {
                state.error = action.payload; 
            })
            .addCase(updateCounselor.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateCounselor.fulfilled, (state, action) => {
                state.successMessage = 'Counselor updated successfully!';
                const index = state.counselors.findIndex(counselor => counselor._id === action.payload._id);
                if (index !== -1) {
                    state.counselors[index] = action.payload;
                }
            })
            .addCase(deleteCounselor.fulfilled, (state, action) => {
                state.successMessage = 'Counselor deleted successfully!';
                state.counselors = state.counselors.filter(counselor => counselor._id !== action.payload);
            })
            .addCase(deleteCounselor.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage } = counselorSlice.actions;

export default counselorSlice.reducer;
