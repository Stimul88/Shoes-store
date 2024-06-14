import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server = process.env.REACT_APP_API_URL;

const initialState = {
  product: "",
  productId: "",
  count: 1,
  loadingProduct: false,
  error: "",
  highlightSize: ""
};

export const fetchProduct= createAsyncThunk(
  "product/fetchProduct",
  async (productNumber, { rejectWithValue }) => {

    try {
      const response = await fetch(
        `${server}items/${productNumber}`
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

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    highlight: (state, action) => {
      state.highlightSize = action.payload
    },
    handleClickPlus: (state) => {
      state.count ++
    },
    handleClickMinus: (state) => {
      if(state.count === 1) return
      state.count--
    },
    returnOne: (state) => {
      state.count = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loadingProduct = true;
        state.error = "";
        state.items = []
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product= action.payload;
        state.loadingProduct = false;
        state.error = "";
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      });
  }
});

export const { highlight, handleClickPlus, handleClickMinus, returnOne } = product.actions;
export default product.reducer;
