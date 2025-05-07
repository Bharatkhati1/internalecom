import React from "react";
import { useNavigate } from "react-router-dom";
import {
  faStar,
  faHeart,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import ProductImg1 from "../../assets/images/product-img-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addToWishlistProduct,
  removeFromWishlistProduct,
  updateRecentlyViewed,
} from "./helper";
import "../Home/Home.scss"
import { useDispatch } from "react-redux";

const ProductInfo = ({
  product,
  inventory,
  handleAddToCart,
  cartProductIds,
  wishListProductId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const productInventory = product?.inventory ||inventory|| [];

  const updateRecentlyViewProduct = () => {
    try {
      updateRecentlyViewed(user.id, product.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="item"
      style={{ width: "auto" }}
      onClick={() => {
        updateRecentlyViewProduct();
        navigate(`/product-details/${product.id}`);
      }}
    >
      <div className="product-sec-slider">
        <div className="info-tag">
          <ul className="info-tag-list">
            <li
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                wishListProductId?.includes(product.id)
                  ? removeFromWishlistProduct(user.id, product.id, dispatch)
                  : addToWishlistProduct(user.id, product.id, dispatch);
              }}
            >
              <a>
                <FontAwesomeIcon
                  className={`${
                    wishListProductId?.includes(product.id)
                      ? "selected-wishlist"
                      : ""
                  }`}
                  icon={faHeart}
                />
              </a>
            </li>
            <li>
              <a>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </li>
          </ul>
        </div>
        <figure>
          <img src={ProductImg1} />
        </figure>
        <figcaption>
          <span>{product.productType}</span>
          <h3>{product.name}</h3>
          <ul className="rating-star">
            {[1, 2, 3, 4, 5].map(() => (
              <li>
                <FontAwesomeIcon icon={faStar} />
              </li>
            ))}
          </ul>
         {!productInventory || productInventory.length == 0 && <p className="oos">Out of stock {productInventory[0]?.quantity}</p>}
          <div className="price-tag">
            <p>
              ${product.price} <del>${product.price}</del>
            </p>
          </div>
          {cartProductIds.includes(product.id) ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/cart`);
              }}
              className="selected"
            >
              Go to cart
            </a>
          ) : (
            <a
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product, dispatch);
              }}
            >
              Add to cart
            </a>
          )}
        </figcaption>
      </div>
    </div>
  );
};

export default ProductInfo;
