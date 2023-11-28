import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPostDetails = createAsyncThunk(
  'postDetails/fetchDetails',
  async (postId, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      // ЦЕ БУДЕ ЗАПИСАНО В ACTION.PAYLOAD РЕДЬЮСЕРУ
      console.log('data: ', data);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const fetchPostDetails2 = createAsyncThunk(
  'postDetails/fetchDetails2',
  async (postId, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      // ЦЕ БУДЕ ЗАПИСАНО В ACTION.PAYLOAD РЕДЬЮСЕРУ
      console.log('data: ', data);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

// https://6566681064fcff8d730ec5ba.mockapi.io/contacts

export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://6566681064fcff8d730ec5ba.mockapi.io/contacts`
      );
      // ЦЕ БУДЕ ЗАПИСАНО В ACTION.PAYLOAD РЕДЬЮСЕРУ
      console.log('data: ', data);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  postDetails: null,
  contacts: [],
  isLoading: false,
  error: null,
};

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState: initialState,

  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchPostDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.postDetails = payload;
      })
      .addCase(fetchPostDetails2.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.postDetails = payload;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
        // TODO: handle add logic here
      })

      .addMatcher(
        isAnyOf(
          fetchPostDetails2.pending,
          fetchPostDetails.pending,
          fetchContacts.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchPostDetails2.rejected,
          fetchPostDetails.rejected,
          fetchContacts.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const postDetailsReducer = postDetailsSlice.reducer;
