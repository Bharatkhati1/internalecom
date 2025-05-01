import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postprodData } from "../Services/prodApiServices";
import { getecomData } from "../Services/ecomapiServices";

// Fetch new arrivals
export const fetchNewProducts = createAsyncThunk(
  "orebi/fetchNewProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await postprodData("/products/status-data", { status: "newArrival" });
      return res.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch new arrivals failed");
    }
  }
);

// Fetch trending products
export const fetchTrendingProducts = createAsyncThunk(
  "orebi/fetchTrendingProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await postprodData("/products/status-data", { status: "trending" });
      return res.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch trending failed");
    }
  }
);

export const fetchSpecialOfferProducts = createAsyncThunk(
  "orebi/fetchSpecialOfferproducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await postprodData("/products/status-data", { status: "specialOffers" });
      return res.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch trending failed");
    }
  }
);

export const fetchCartData = createAsyncThunk(
  "orebi/fetchCartData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getecomData(`cart/user/${userId}`);
      if (!response.status) return [];
      return response.data.items || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart data");
    }
  }
);

export const fetchCartCount = createAsyncThunk(
  "orebi/fetchCartCount",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getecomData(`/cart/count/${userId}`);;
      if (!response.status) return [];
      return response.count || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart data");
    }
  }
);

const initialState = {
  userInfo: [],
  products: [],
  discount: 0,
  cartProducts:[],
  specialOfferProduct:[],
  cartCount:0,
  newProducts: [],
  trendingProducts: [],
  loading: false,
  error: null,
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartProducts.find((i) =>  i.id ===  item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartProducts.push(item);
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setCartProduct:(state, action) => {
      state.cartProducts= action.payload
    },
    increaseQuantity: (state, action) => {
      const item = state.cartProducts.find((item) => item._id === action.payload._id);
      if (item) item.quantity++;
    },
    drecreaseQuantity: (state, action) => {
      const item = state.cartProducts.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) item.quantity--;
    },
    deleteItem: (state, action) => {
      state.products = state.cartProducts.filter((item) => item._id !== action.payload);
    },
    resetCart: (state,action) => {
      state.cartProducts = [];
    },
    applyCoupon: (state, action) => {
      state.discount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.newProducts = action.payload;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.loading = false;
        state.cartCount = action.payload;
      })
      .addCase(fetchNewProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(fetchSpecialOfferProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.specialOfferProduct = action.payload;
      })
      .addCase(fetchTrendingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingProducts = action.payload;
      })
      .addCase(fetchTrendingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  applyCoupon,
  setCartProduct,
  logOut,
} = orebiSlice.actions;

export default orebiSlice.reducer;
