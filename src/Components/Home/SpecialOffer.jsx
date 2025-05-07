import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import OfferBanner from "../../assets/images/offer-banner.png";
import ProductImg2 from "../../assets/images/product-img-2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCartCount,
  fetchSpecialOfferProducts,
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

function SpecialOffer() {
  const dispatch = useDispatch();
  const { specialOfferProduct = [], cartProducts } = useSelector(
    (state) => state.orebi
  );

  const cartProductIds = cartProducts.map((p) => p.id || p._id);

  useEffect(() => {
    dispatch(fetchSpecialOfferProducts());
  }, [dispatch]);

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
    <>
      {specialOfferProduct.length > 0 && (
        <div className="special-offers">
          <div className="container">
            <div className="head-title">
              <span>Categories</span>
              <h2>Special Offers</h2>
            </div>
            <div className="container">
              {renderProducts(specialOfferProduct)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SpecialOffer;
