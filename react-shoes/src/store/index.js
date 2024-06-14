import { configureStore } from '@reduxjs/toolkit';
import topSales from "./topSlice";
import items from "./itemsSlice";
import categories from "./caregoriesSlice";
import product from "./productSlice";

export const store = configureStore({
  reducer: {
    top: topSales,
    items: items,
    categories: categories,
    product: product,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
