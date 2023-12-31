// In your categorySlice.js or reducer file
import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    allData: [data], // Assuming this is your data structure
    toEuro: false,
    isCartOpen: false,
    cartCount: 0,
    cart: [],
  },
  reducers: {
    toggleCurrency: (state, action) => {
      state.toEuro = action.payload;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    incrementCartCount: (state) => {
      state.cartCount += 1;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    reomveFromCart: (state, action) => {
      state.cart = state.cart.filter((e, index) => index !== action.payload);
    },
    // Create a new action to convert prices to Euro
    convertPricesToEuro: (state, action) => {
      const conversionRate = action.payload; // You should pass the rate as payload
      const categories = state.allData.flatMap((e) => e.categories);

      categories.forEach((category) => {
        category.sub_category.forEach((subCategory) => {
          // Update prices for subCategory
          subCategory.price = state.toEuro
            ? subCategory.price * conversionRate
            : subCategory.originalPrice;

          // Update prices for add_options
          subCategory.add_options.forEach((option) => {
            option.price = state.toEuro
              ? option.price * conversionRate
              : option.originalPrice;
          });

          // Update prices for boost_method
          subCategory.boost_method.forEach((method) => {
            method.price = state.toEuro
              ? method.price * conversionRate
              : method.originalPrice;
          });

          // Update prices for exec_options
          subCategory.exec_options.forEach((option) => {
            option.price = state.toEuro
              ? option.price * conversionRate
              : option.originalPrice;
          });
        });
      });
    },
  },
});

export const {
  toggleCurrency,
  convertPricesToEuro,
  toggleCart,
  incrementCartCount,
  addToCart,
  reomveFromCart,
} = categorySlice.actions;

export default categorySlice.reducer;
