import { productsData } from 'Data/data';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: JSON.parse(localStorage.getItem('products')) ?? productsData, // [{}, {}, ...]
};

const productsSlice = createSlice({
  // Ім'я слайсу
  name: 'products',
  // Початковий стан редюсера слайсу
  initialState: initialState,
  // Об'єкт редюсерів
  reducers: {
    addProduct(state, { payload }) {
      // state.products = [...state.products, payload];
      state.products.push(payload);
    },
    deleteProduct(state, { payload }) {
      state.products = state.products.filter(product => product.id !== payload);
    },
  },
});

// Генератори екшенів
export const { addProduct, deleteProduct } = productsSlice.actions;
// Редюсер слайсу
export const productsReducer = productsSlice.reducer;
