import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCartCount,
  fetchWishlist,
} from "../../redux/orebiSlice";
import ProductInfo from "../../Components/Common/ProductInfo";
import { postecomData } from "../../Services/ecomapiServices";
import { toast } from "react-toastify";
const Wishlist = () => {
  const { wishlist, cartProducts } = useSelector((state) => state.orebi);
  const userData = JSON.parse(localStorage.getItem("user"));
  const cartProductIds = cartProducts.map((p) => p.id);
  const wishListProductId = wishlist.map((item)=> item.product.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  console.log(wishlist);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    if (userData.id) {
      dispatch(fetchWishlist(userData.id));
    }
  }, []);
  return (
    <section>
      <div className="inner-banner-sec">
        <div className="container">
          <h3>Wishlist</h3>
        </div>
      </div>
      <div className="product-category">
        <div className="container">
          <div className="row">
            <div className="col-md-3 product-category-left">
            </div>
            <div className="col-md-9 product-category-right">
              <div className="main-filters-top d-flex align-items-center justify-content-between">
                <h4>There are {wishlist.length} products.</h4>
        
              </div>
              <div className="row">
                {wishlist.map((product) => (
                  <ProductInfo
                  wishListProductId={wishListProductId}
                    product={product.product}
                    handleAddToCart={handleAddToCart}
                    cartProductIds={cartProductIds}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
