import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import OwlCarousel from "react-owl-carousel";
import ProductImg2 from "../../assets/images/product-img-2.jpg";
import SwiperSlider from "./SwiperSlider";
import InnerBanner from "../../Components/Header/InnerBanner";
import { getprodData } from "../../Services/prodApiServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReviewSection from "./ReviewSection";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartCount } from "../../redux/orebiSlice";
import { postecomData } from "../../Services/ecomapiServices";
function ProductDetails() {
const navigate = useNavigate();
const dispatch = useDispatch();
const { id } = useParams();
const { cartProducts = [] } = useSelector((state) => state.orebi);
const cartProductIds = cartProducts.map((p) => p.id || p._id);
const [productInfo, setProductInfo] = useState({});
const [selectedImage, setSelectedImage] = useState("");
const [colorSizeInfo, setColorSizeInfo] = useState({
color: null,
size: null,
});
const fetchProductDetails = async (productId) => {
try {
const response = await getprodData(`/products/${productId}`);
if (response.data.status) {
const productData = response.data.data;
setProductInfo(productData);
setSelectedImage(productData.imageUrls?.[0] || "");
const extracted = { color: null, size: null };
productData.attributes?.forEach((attr) => {
const name = attr.categoryAttribute?.name?.toLowerCase();
if (name === "color" || name === "size") {
extracted[name] = attr.value;
}
});
setColorSizeInfo(extracted);
}
} catch (error) {
console.error("Error fetching product details:", error);
}
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
await postecomData("cart/add", cartData);
dispatch(addToCart(product));
dispatch(fetchCartCount(userDetails.id));
} else {
alert("Please login to add items to your cart.");
}
};
console.log(colorSizeInfo);
useEffect(() => {
if (id) {
fetchProductDetails(id);
}
}, [id]);
return (
<section className="main-product-detail">
   <InnerBanner Name={"Product Detail"} />
   <div className="product-detail">
      <div className="container">
         <div className="row">
            <div className="col-md-6 product-detail-left">
               <SwiperSlider />
            </div>
            <div className="col-md-6 product-detail-right">
               <h2>{productInfo?.name}</h2>
               <ul className="rating-star">
                  <li>
                     <FontAwesomeIcon icon={faStar} />
                  </li>
                  <li>
                     <FontAwesomeIcon icon={faStar} />
                  </li>
                  <li>
                     <FontAwesomeIcon icon={faStar} />
                  </li>
                  <li>
                     <FontAwesomeIcon icon={faStar} />
                  </li>
                  <li>
                     <FontAwesomeIcon icon={faStar} />
                  </li>
               </ul>
               <div class="price-tag mb-4 mt-4">
                  <p>
                     ${productInfo?.price} <del>${productInfo?.price}</del>
                  </p>
               </div>
               <p class="in-stock-text">In stock </p>

               <div className="DescriptionBox">{productInfo?.description}</div>
               <div className="mt-3">
               <div className="selectItemsBox">
                     <strong>Color:</strong>

                     <ul className="radioCoutomBox d-flex">
                     <li>
                        <label class="RadioCoustom ColorRadioCoustom">
                           <input type="radio" checked="checked" name="radio"/>
                           <span class="checkmark"></span>
                           <div className="RadiolabelBox ColorBox greyColor"></div>
                        </label>
                     </li>
                     <li>
                        <label class="RadioCoustom ColorRadioCoustom">
                           <input type="radio" checked="checked" name="radio"/>
                           <span class="checkmark"></span>
                           <div className="RadiolabelBox ColorBox blackColor"></div>
                        </label>
                     </li>

                     <li>
                        <label class="RadioCoustom ColorRadioCoustom">
                           <input type="radio" checked="checked" name="radio"/>
                           <span class="checkmark"></span>
                           <div className="RadiolabelBox ColorBox whiteColor"></div>
                        </label>
                     </li>
                  </ul>
                 </div>
                  <div className="selectItemsBox">
                     <strong>Screen size:</strong>
                  <ul className="radioCoutomBox d-flex">
                     <li>
                        <label class="RadioCoustom">
                           <input type="radio" checked="checked" name="radio"/>
                           <span class="checkmark"></span>
                           <div className="RadiolabelBox">15.5</div>
                        </label>
                     </li>
                     <li>
                        <label class="RadioCoustom">
                           <input type="radio" checked="checked" name="radio"/>
                           <span class="checkmark"></span>
                           <div className="RadiolabelBox">15.6</div>
                        </label>
                     </li>
                  </ul>
                  </div>

                  <div className="selectItemsBox">
                     <strong>System Memory:</strong>
                  <ul className="radioCoutomBox d-flex">
                     <li>
                        <label class="RadioCoustom">
                           <input type="radio" checked="checked" name="radio"/>
                           <span class="checkmark"></span>
                           <div className="RadiolabelBox">8 GB</div>
                        </label>
                     </li>
                     <li>
                        <label class="RadioCoustom">
                           <input type="radio" checked="checked" name="radio"/>
                           <span class="checkmark"></span>
                           <div className="RadiolabelBox">16 GB</div>
                        </label>
                     </li>
                  </ul>
                  </div>

                  <div className="selectItemsBox">
                  <strong>Highlights:</strong>
                  
                  <ul className="Highlights-list">

                    <li>Stylish & Portable Thin and Light Laptop
                    </li>
                    <li>15.6 Inch Full HD, micro-edge, anti-glare, 250 nits, 45% NTSC
                    </li>
                    <li>Light Laptop without Optical Disk Drive
                    </li>
                  </ul>

                  </div>
               </div>
             
               <div class="btn-box-detail mt-4">
                  <a class="btn btn-primary mt-0 big-btn">Buy Now</a>
                  {cartProductIds.includes(productInfo?.id) ? (
                  <a
                     onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/cart`);
                  }}
                  class="btn btn-secondry mt-0 big-btn ms-3"
                  >
                  Go to cart
                  </a>
                  ) : (
                  <a
                     class="btn btn-secondry mt-0 big-btn ms-3"
                     onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(productInfo);
                  }}
                  >
                  Add to cart
                  </a>
                  )}
                  <div class="wishlist-icon ms-3">
                     <FontAwesomeIcon icon={faHeart} />
                  </div>
               </div>
            </div>
            <ReviewSection productId={id} />
            <div className="col-md-12 similar-product">
               <div class="head-title ">
                  <h2>Recent Product</h2>
               </div>
               <OwlCarousel
               className="owl-theme"
               margin={20}
               nav
               autoplay
               items={5}
               autoplayTimeout={3000}
               responsive={{
               0: { items: 1 },
               600: { items: 2 },
               1000: { items: 5 },
               }}
               >
               <div className="item">
                  <div className="product-sec-slider box-border">
                     <div className="info-tag">
                        <ul className="info-tag-list">
                           <li>
                              <a>
                              <i className="fa-regular fa-heart"></i>
                              </a>
                           </li>
                           <li>
                              <a>
                              <i className="fa-solid fa-up-right-from-square"></i>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <figure>
                        <img src={ProductImg2} />
                     </figure>
                     <figcaption>
                        <span>Headphones</span>
                        <h3>Pioneer DJ HDJ-X5-S Professional </h3>
                        <ul className="rating-star">
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                        </ul>
                        <div className="price-tag">
                           <p>
                              $602.00 <del>$602.00</del>
                           </p>
                        </div>
                        <a className="btn btn-primary">Add to cart</a>
                     </figcaption>
                  </div>
               </div>
               <div className="item">
                  <div className="product-sec-slider box-border">
                     <div className="info-tag">
                        <ul className="info-tag-list">
                           <li>
                              <a>
                              <i className="fa-regular fa-heart"></i>
                              </a>
                           </li>
                           <li>
                              <a>
                              <i className="fa-solid fa-up-right-from-square"></i>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <figure>
                        {" "}
                        <img src={ProductImg2} />
                     </figure>
                     <figcaption>
                        <span>Headphones</span>
                        <h3>Pioneer DJ HDJ-X5-S Professional </h3>
                        <ul className="rating-star">
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                        </ul>
                        <div className="price-tag">
                           <p>
                              $602.00 <del>$602.00</del>
                           </p>
                        </div>
                        <a className="btn btn-primary">Add to cart</a>
                     </figcaption>
                  </div>
               </div>
               <div className="item">
                  <div className="product-sec-slider box-border">
                     <div className="info-tag">
                        <ul className="info-tag-list">
                           <li>
                              <a>
                              <i className="fa-regular fa-heart"></i>
                              </a>
                           </li>
                           <li>
                              <a>
                              <i className="fa-solid fa-up-right-from-square"></i>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <figure>
                        {" "}
                        <img src={ProductImg2} />
                     </figure>
                     <figcaption>
                        <span>Headphones</span>
                        <h3>Pioneer DJ HDJ-X5-S Professional </h3>
                        <ul className="rating-star">
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                        </ul>
                        <div className="price-tag">
                           <p>
                              $602.00 <del>$602.00</del>
                           </p>
                        </div>
                        <a className="btn btn-primary">Add to cart</a>
                     </figcaption>
                  </div>
               </div>
               <div className="item">
                  <div className="product-sec-slider box-border">
                     <div className="info-tag">
                        <ul className="info-tag-list">
                           <li>
                              <a>
                              <i className="fa-regular fa-heart"></i>
                              </a>
                           </li>
                           <li>
                              <a>
                              <i className="fa-solid fa-up-right-from-square"></i>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <figure>
                        {" "}
                        <img src={ProductImg2} />
                     </figure>
                     <figcaption>
                        <span>Headphones</span>
                        <h3>Pioneer DJ HDJ-X5-S Professional </h3>
                        <ul className="rating-star">
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                        </ul>
                        <div className="price-tag">
                           <p>
                              $602.00 <del>$602.00</del>
                           </p>
                        </div>
                        <a className="btn btn-primary">Add to cart</a>
                     </figcaption>
                  </div>
               </div>
               <div className="item">
                  <div className="product-sec-slider box-border">
                     <div className="info-tag">
                        <ul className="info-tag-list">
                           <li>
                              <a>
                              <i className="fa-regular fa-heart"></i>
                              </a>
                           </li>
                           <li>
                              <a>
                              <i className="fa-solid fa-up-right-from-square"></i>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <figure>
                        {" "}
                        <img src={ProductImg2} />
                     </figure>
                     <figcaption>
                        <span>Headphones</span>
                        <h3>Pioneer DJ HDJ-X5-S Professional </h3>
                        <ul className="rating-star">
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                           <li>
                              <FontAwesomeIcon icon={faStar} />
                           </li>
                        </ul>
                        <div className="price-tag">
                           <p>
                              $602.00 <del>$602.00</del>
                           </p>
                        </div>
                        <a className="btn btn-primary">Add to cart</a>
                     </figcaption>
                  </div>
               </div>
               </OwlCarousel>
            </div>
         </div>
      </div>
   </div>
</section>
);
}
export default ProductDetails;