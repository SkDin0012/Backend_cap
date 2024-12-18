import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  loading: false,
  error: null,
  paymentIntent: null,
};

export const createPaymentIntent = createAsyncThunk(
    'payment/create-payment-intent',
    async (paymentData, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.user.token;

      try {
        console.log('Request payload:', paymentData); 
        const response = await axios.post(`${API_URL}/create-payment-intent`, paymentData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Server response:', response.data); 
        return response.data;
      } catch (error) {
        console.error('Error creating payment intent:', error);
        console.error('Error response:', error.response?.data);
        console.error('Full error object:', error);
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState(state) {
      state.loading = false;
      state.error = null;
      state.paymentIntent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentIntent = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
