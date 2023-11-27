import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPostDetails = createAsyncThunk(
  'postDetails/get',
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

const initialState = {
  postDetails: null,
  isLoading: false,
  error: null,
};

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState: initialState,

  reducers: {},
});

export const postDetailsReducer = postDetailsSlice.reducer;
