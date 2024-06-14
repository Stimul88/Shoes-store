import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server = process.env.REACT_APP_API_URL;

const initialState = {
  items: [],
  pageName: "",
  offset: "",
  searchItem: "",
  categoryId: "",
  loading: false,
  categories: "",
  error: ""
};

export const fetchItems= createAsyncThunk(
  "items/fetchItems",
  async (yet, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${server}${yet}`
      );

      console.log(response)

      if (!response.ok) {
        return rejectWithValue("Loading error!");
      }

      return await response.json();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const items = createSlice({
  name: "items",
  initialState,
  reducers: {
    searchEl: (state, action) => {
      state.searchItem = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items= action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { searchEl } = items.actions;
export default items.reducer;
