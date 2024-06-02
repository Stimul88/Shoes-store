import { configureStore } from '@reduxjs/toolkit';
import imdbSlice from "./ImdbSlice";

export const store = configureStore({
  reducer: {
    imdb: imdbSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
