import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

export const fetchPost = createAsyncThunk(
  'postData',
    async (data, thunkAPI) => {

    const config = {
      method: 'post',
      url: `${server}order`,
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };

    const response = await axios(config)
      .then(function (response) {
        // return response.json()

        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    return response.data
  }
)



const order = createSlice({
  name: "orders",
    initialState: {
      orderResponse: "",
      orderLoading: "",
      orderError: "",
      orderStatus: "",
    }
  ,
  reducers: {
    getStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      // state.products = [];
      state.orderLoading = true;
    });
    builder.addCase(
      fetchPost.fulfilled, (state, action) => {
        console.log(action.payload)
        state.orderResponse = action.payload;
        state.orderLoading = false;
      });
    builder.addCase(
      fetchPost.rejected,(state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
      });
  }
});


export const { getStatus } = order.actions;
export default order.reducer;