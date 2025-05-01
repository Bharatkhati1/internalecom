import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useSelector, useDispatch } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import {
  addToCart,
  fetchCartCount,
  fetchNewProducts,
  fetchTrendingProducts,
} from "../../redux/orebiSlice.jsx";
import ProductInfo from "../Common/ProductInfo.jsx";
import { postecomData } from "../../Services/ecomapiServices.js";

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

const ProductsSection = () => {
  const dispatch = useDispatch();
  const {
    newProducts = [],
    trendingProducts = [],
    cartProducts = [],
  } = useSelector((state) => state.orebi);

  const cartProductIds = cartProducts.map((p) => p.id || p._id);

  useEffect(() => {
    dispatch(fetchTrendingProducts("trending"));
    dispatch(fetchNewProducts("newArrival"));
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userDetails = JSON.parse(user);
    if (token && user) {
      const cartData = {
        userId: userDetails.id,
        productId: product.id || product._id,
        quantity: 1,
      };
      const response = await postecomData("cart/add", cartData);
      dispatch(addToCart(product));
      dispatch(fetchCartCount(userDetails.id));
    } else {
      alert("Please login to add items to your cart.");
    }
  };

  const renderProducts = (products, type) => (
    <OwlCarousel key={cartProductIds.join(",") + type} {...carouselOptions}>
      {products.map((product) => (
        <ProductInfo
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
          cartProductIds={cartProductIds}
        />
      ))}
    </OwlCarousel>
  );

  return (
    <div className="mix-product-slider section-space">
      <div className="container">
        <div className="product-tabs-sec">
          <Tabs>
            <TabList>
              <Tab>New Product</Tab>
              <Tab>Trending Product</Tab>
            </TabList>
            <TabPanel>
              <div className="Newprdoucts">{renderProducts(newProducts)}</div>
            </TabPanel>
            <TabPanel>
              <div className="Newprdoucts">
                {renderProducts(trendingProducts)}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
