import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const stateStr = localStorage.getItem("state");
      return stateStr ? JSON.parse(stateStr) : undefined;
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const initialState = {
  items: loadFromLocalStorage() || [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
      saveToLocalStorage(state.items);
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((bi) => bi.id === action.payload.id);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Cannot remove product with this id");
      }

      state.items = newBasket;
      saveToLocalStorage(state.items);
    },
    addProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    updateFilters: (state, action) => {
      state.filteredProducts = action.payload;
    },
    clearFilters: (state) => {
      state.filteredProducts = state.products;
    },
    clearState: (state, action) => {
      state.items = [];
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  clearState,
  addProducts,
  updateFilters,
  clearFilters,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);
export const selectProducts = (state) => state.basket.products;
export const selectFilteredProducts = (state) => state.basket.filteredProducts;

export default basketSlice.reducer;
