import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postprodData } from "../Services/prodApiServices";
import {
  getecomData,
  getRecentlyViewed,
  getWishlistProducts,
} from "../Services/ecomapiServices";
import { getDataEmail } from "../Services/emailApiServices";

// Fetch new arrivals
export const fetchNewProducts = createAsyncThunk(
  "orebi/fetchNewProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await postprodData("/products/status-data", {
        status: "newArrival",
      });
      return res.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetch new arrivals failed"
      );
    }
  }
);

// Fetch trending products
export const fetchTrendingProducts = createAsyncThunk(
  "orebi/fetchTrendingProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await postprodData("/products/status-data", {
        status: "trending",
      });
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
      const res = await postprodData("/products/status-data", {
        status: "specialOffers",
      });
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
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart data"
      );
    }
  }
);

export const fetchCartCount = createAsyncThunk(
  "orebi/fetchCartCount",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getecomData(`/cart/count/${userId}`);
      if (!response.status) return [];
      return response.count || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart data"
      );
    }
  }
);

export const fetchRecentlyViewed = createAsyncThunk(
  "orebi/fetchRecentlyViewed",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getRecentlyViewed(
        `recently-viewed/list/?userId=${userId}`
      );
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart data"
      );
    }
  }
);

export const fetchTopDeals = createAsyncThunk(
  "orebi/fetchTopDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getecomData("/discounts/top/deals");
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart data"
      );
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  "orebi/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getWishlistProducts(`/wishlist/${userId}`);
      if (!response.status) return [];
      return response.wishlistItems || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart data"
      );
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  "orebi/fetchNotifications",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getDataEmail(`/message/all/${userId}`);
      if (!response.status) return [];
      return response.data.data|| [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart data"
      );
    }
  }
);

const initialState = {
  userInfo: [],
  products: [],
  wishlist: [],
  topDeals: [],
  allNotifications: [],
  recentlyViewed: [],
  discount: 0,
  cartProducts: [],
  specialOfferProduct: [],
  cartCount: 0,
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
      const existingItem = state.cartProducts.find((i) => i.id === item.id);
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
    setCartProduct: (state, action) => {
      state.cartProducts = action.payload;
    },
    increaseQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item._id === action.payload._id
      );
      if (item) item.quantity++;
    },
    drecreaseQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) item.quantity--;
    },
    deleteItem: (state, action) => {
      state.products = state.cartProducts.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state, action) => {
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
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.allNotifications = action.payload;
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
      .addCase(fetchTopDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.topDeals = action.payload;
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
      .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyViewed = action.payload;
      })
      .addCase(fetchTrendingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
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
