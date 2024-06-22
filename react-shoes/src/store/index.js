import {combineReducers, configureStore} from '@reduxjs/toolkit';
import topSales from "./topSlice";
import items from "./itemsSlice";
import categories from "./caregoriesSlice";
import product from "./productSlice";
import order from "./orderSlice";


const rootReducers = combineReducers({
  top: topSales,
  items: items,
  categories: categories,
  product: product,
  order: order
})


export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
