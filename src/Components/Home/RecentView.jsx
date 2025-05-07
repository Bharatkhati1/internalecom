import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCartCount,
  fetchRecentlyViewed,
} from "../../redux/orebiSlice";
import ProductInfo from "../Common/ProductInfo";
import { postecomData } from "../../Services/ecomapiServices";
import { toast } from "react-toastify";

const carouselOptions = {
  className: "owl-theme",
  margin: 20,
  nav: true,
  dots: false,
  autoplayTimeout: 3000,
  items: 5,
  responsive: {
    0: { items: 1 },
    600: { items: 3 },
    1000: { items: 5 },
  },
};

function RecentView({ wishListProductId }) {
  const dispatch = useDispatch();
  const { recentlyViewed, cartProducts = [] } = useSelector(
    (state) => state.orebi
  );

  const cartProductIds = cartProducts.map((p) => p.id || p._id);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = async (product) => {
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
  
  useEffect(() => {
    dispatch(fetchRecentlyViewed(user?.id));
  }, []);

  const renderProducts = (products, type) => (
    <OwlCarousel
      key={cartProductIds.join(",") + wishListProductId.join(",") + type}
      {...carouselOptions}
    >
      {products.map((product) => (
        <ProductInfo
          wishListProductId={wishListProductId}
          key={product?.product?.id}
          product={product?.product}
          inventory={product?.inventory}
          handleAddToCart={handleAddToCart}
          cartProductIds={cartProductIds}
        />
      ))}
    </OwlCarousel>
  );
  return (
    <>
      {recentlyViewed.length > 0 && (
        <section className="recent-products">
          <div className="container">
            <div className="head-title">
              <h2>Recent View</h2>
            </div>

            <div className="Newprdoucts">{renderProducts(recentlyViewed)}</div>
          </div>
        </section>
      )}
    </>
  );
}

export default RecentView;
