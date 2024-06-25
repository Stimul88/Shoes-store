import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server = process.env.REACT_APP_API_URL;

const initialState = {
  items: [],
  pageName: "",
  offset: "",
  searchItem: "",
  orders: [],
  categoryId: "",
  loading: false,
  categories: "",
  selectId: "",
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
    getOrder: (state, action) => {
      state.orders = action.payload;
    },
    select: (state, action) => {
      state.selectId = action.payload;
    },
    cleanSelect: (state, action) => {
      state.selectId = action.payload;
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

export const { searchEl, getOrder, select, cleanSelect } = items.actions;
export default items.reducer;
