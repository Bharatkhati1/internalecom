import React from "react";
import OwlCarousel from "react-owl-carousel";
import ProductInfo from "../Common/ProductInfo";

function FeaturesProduct({ products, handleAddToCart, cartProductIds }) {
  return (
    <div className="Newprdoucts">
      <OwlCarousel
        className="owl-theme"
        margin={20}
        nav
        //   autoplay
        items={5}
        dots={false}
        autoplayTimeout={3000}
        responsive={{
          0: { items: 1 },
          600: { items: 3 },
          1000: { items: 5 },
        }}
      >
        {products.map((product) => (
             <ProductInfo product={product} handleAddToCart={handleAddToCart} cartProductIds={cartProductIds} />
        ))}
      </OwlCarousel>
    </div>
  );
}

export default FeaturesProduct;
