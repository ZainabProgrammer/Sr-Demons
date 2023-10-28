// store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/CategorySlice"; // Update the import path if needed

const store = configureStore({
  reducer: {
    category: categoryReducer,

    // You can add more reducers here if you have multiple slices
  },
});

export default store;
