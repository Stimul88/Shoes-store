import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server = process.env.REACT_APP_API_URL;


const initialState = {
  categoriesArray: [],
  setCategories: "",
  loadingCategories: false,
  error: ""
};

export const fetchCategories= createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {

    try {
      const response = await fetch(
        `${server}categories`
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

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    chooseCategory: (state, action) => {

      state.setCategories = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCategories = true;
        state.error = "";
        state.items = []
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesArray= action.payload;
        state.loadingCategories = false;
        state.error = "";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.error = action.payload;
      });
  }
});

export const { chooseCategory } = categories.actions;
export default categories.reducer;
