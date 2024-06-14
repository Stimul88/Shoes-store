import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server = process.env.REACT_APP_API_URL;


const initialState = {
  topSales: [],

  loading: false,
  error: ""
};

export const fetchTop = createAsyncThunk(
  "topSlice/fetchTopSales",
  async (_, { rejectWithValue }) => {

    try {
      const response = await fetch(
        `${server}top-sales`
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

const topSlice = createSlice({
  name: "top",
  initialState,
  reducers: {
    getTop: (state, action) => {

      state.topSales = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTop.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchTop.fulfilled, (state, action) => {
        state.topSales = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchTop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { getTop } = topSlice.actions;
export default topSlice.reducer;
