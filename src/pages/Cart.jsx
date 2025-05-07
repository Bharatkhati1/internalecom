import React, { useEffect, useState } from "react";
import InnerBanner from "../Components/Header/InnerBanner";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  fetchCartCount,
  setCartProduct,
} from "../redux/orebiSlice";
import { useNavigate } from "react-router-dom";
import { deleteecomData, getecomData } from "../Services/ecomapiServices";
import CartItem from "./CartItem";
import { getprodData } from "../Services/prodApiServices";
import { toast } from "react-toastify";

function Cart() {
  const { cartProducts } = useSelector((state) => state.orebi);
  const [user,  ] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  let totalPrice = cartProducts?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const dispatch = useDispatch();

  const handleDeleteItem = async (productId) => {
    if (!productId) {
      console.error("Error: productId is undefined before API call");
      return;
    }
    toast.loading("Please wait...")
    try {
      const userId = user.id;
      const response = await deleteecomData(
        `/cart/remove?userId=${userId}&productId=${productId}`
      );
      if (response.status) {
        dispatch(deleteItem(productId));
        dispatch(fetchCartCount(userId))
        fetchCartData();
        toast.dismiss()
        toast.success("Item removed from cart")
      } else {
        console.error("Failed to delete item from cart");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const fetchCartData = async () => {
    if (!user) return;
    try {
      const cartResponse = await getecomData(`cart/user/${user.id}`);
      if (!cartResponse.status) {
        dispatch(setCartProduct([]));
        return;
      }
      const cartItems = cartResponse?.data?.items||[];
      const productIds = cartItems.map((item) => item.productId).join(",");

      if (productIds.length > 0) {
        const productResponse = await getprodData(
          `/products/multiple/${productIds}`
        );
        const productData = productResponse.data.data || [];

        // Create a product map for merging cart items with product data
        const productMap = new Map(
          productData.map((product) => [product.id, product])
        );

        const updatedCartItems = cartItems.map((item) => {
          const product = productMap.get(item.productId);
          return {
            _id: item.productId,
            name: product?.name || "",
            quantity: item.quantity,
            image: product?.image || "",
            badge: product?.badge || "",
            price: product?.price || 0,
            colors: product?.colors || [],
          };
        });
        dispatch(setCartProduct(updatedCartItems));
      } else {
        dispatch(setCartProduct([]));
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);
  
  return (
    <div>
      <div className="CartPage">
        <InnerBanner Name={"Cart"} />
        <div className="container">
          <div className="CartPageBox">
            {cartProducts.length > 0 ? (
              <div className="row">
                <div className="col-md-8">
                  <div className="CartPageInner">
                    <ul className="CartList">
                      {cartProducts.map((item) => (
                        <CartItem
                          key={item._id}
                          item={item}
                          userId={user.id}
                          onDelete={() => handleDeleteItem(item._id)}
                          onUpdateQuantity={fetchCartData}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="CartTotals">
                    <h4>Cart Totals</h4>
                    <ul class="total-list">
                      <li>
                        <b>Subtotal</b>
                        <span>${totalPrice}</span>
                      </li>
                      <li>
                        <b>Shipping Charge</b>
                        <span>$5.00</span>
                      </li>
                      <li>
                        <b>Tax </b>
                        <span>-$10.00</span>
                      </li>
                      <li class="total-amount">
                        <b>Total</b>
                        <span>${totalPrice - 5}</span>
                      </li>
                    </ul>
                    <a className="btn btn-primary w-100 mt-0 btn-h">
                      Continue Shopping
                    </a>
                    <a
                      className="btn btn-secondry w-100 mt-3 btn-h"
                      onClick={() => navigate("/checkout")}
                    >
                      Process
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <p>No item in the cart</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
