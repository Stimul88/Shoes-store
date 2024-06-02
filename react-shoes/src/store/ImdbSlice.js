import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  searchName: '',
  allCards: [],
  favorites: [],
  loading: false,
  error: ""
};

export const fetchCards = createAsyncThunk(
  "allCards/fetchCards",
  async (search, { rejectWithValue }) => {
    // console.log(search)
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?${search}&apikey=ef448894`
      );

      if (!response.ok) {
        return rejectWithValue("Loading error!");
      }

      return await response.json();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const imdbSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    search: (state, action) => {

      state.searchName = action.payload
    },
    searchId: (state, action) => {

      state.searchName = action.payload
    },
    addFavorite: (state, action) => {
      console.log(action.payload)
      state.favorites.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.allCards = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { search, addFavorite, searchId } = imdbSlice.actions;
export default imdbSlice.reducer;
