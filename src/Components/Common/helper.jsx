import { toast } from "react-toastify";
import {
  addToCart,
  fetchCartCount,
  fetchWishlist,
} from "../../redux/orebiSlice";
import {
  addToWishlist,
  postecomData,
  removceFromWishList,
  updateRecentlyView,
} from "../../Services/ecomapiServices";

export const addToWishlistProduct = async (userId, productId, dispatch) => {
  try {
    await addToWishlist(`/wishlist/add`, { userId, productId });
    dispatch(fetchWishlist(userId));
    toast.success("Added to wishlist");
  } catch (error) {
    console.log(error);
  }
};

export const removeFromWishlistProduct = async (
  userId,
  productId,
  dispatch
) => {
  try {
    await removceFromWishList(`/wishlist/remove`, { userId, productId });
    dispatch(fetchWishlist(userId));
    toast.success("Removed from wishlist");
  } catch (error) {
    console.log(error);
  }
};

export const handleAddToCart = async (product, dispatch) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userDetails = JSON.parse(user);
  if (token && user) {
    const cartData = {
      userId: userDetails.id,
      productId: product.id,
      quantity: 1,
    };
    const response = await postecomData("cart/add", cartData);
    dispatch(addToCart(product));
    dispatch(fetchCartCount(userDetails.id));
    toast.success("Successfully added to cart.");
  } else {
    toast.error("Please login to add items to your cart.");
  }
};

export const updateRecentlyViewed = async (userId, productId, dispatch) => {
  try {
    await updateRecentlyView(`/recently-viewed/track-view`, { userId, productId });
  } catch (error) {
    console.log(error);
  }
};