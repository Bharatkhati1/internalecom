import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import sliderImage from "../../assets/images/main-banner.jpg";
import TopBannerImg1 from "../../assets/images/TopBanner-01.jpg";
import TopBannerImg2 from "../../assets/images/TopBanner-02.jpg";
import TopBannerImg3 from "../../assets/images/TopBanner-03.jpg";
import TopBannerImg4 from "../../assets/images/TopBanner-04.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopDeals } from "../../redux/orebiSlice";

const Slider = () => {
  const dispatch = useDispatch();
  const { topDeals = [], newProducts = [], trendingProducts = [] } = useSelector((state) => state.orebi);

  useEffect(() => {
    dispatch(fetchTopDeals());
  }, [dispatch]);

  const carouselDeals = topDeals.slice(0, 3);
  const remainingTopDeals = topDeals.slice(3);

  // Fill up to 4 banner deals with priority: topDeals -> newProducts -> trendingProducts
  const bannerDeals = [
    ...remainingTopDeals,
    ...newProducts,
    ...trendingProducts
  ].slice(0, 4);

  const bannerImages = [TopBannerImg1, TopBannerImg2, TopBannerImg3, TopBannerImg4];

  return (
    <section className="banner-sec">
      <div className="container">
        <div className="row">
          {/* Left: Carousel */}
          <div className="col-md-6 banner-sec-left">
            <Carousel>
              {carouselDeals.map((deal, index) => (
                <Carousel.Item key={index}>
                  <img src={sliderImage} alt="Deal banner" />
                  <figcaption className="main-slider-content">
                    <span>Top Deals</span>
                    <h3>{deal.name}</h3>
                    <p>
                      For ₹{deal.discountedPrice}{" "}
                      <del>₹{deal.originalPrice}</del>
                      <br />
                      Save {deal.discountValue}
                    </p>
                    <a className="slider-btn">Add to cart</a>
                  </figcaption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Right: 4 Banner Boxes */}
          <div className="col-md-6 banner-sec-right">
            <div className="row">
              {bannerDeals.map((deal, index) => (
                <div className="col-md-6" key={index}>
                  <div className="banner-content">
                    <figure>
                      <img src={bannerImages[index] || TopBannerImg1} alt="Top Deal" />
                    </figure>
                    <figcaption className="br-sub-content">
                      <span>Top Pick</span>
                      <h3>{deal.name}</h3>
                      <p>For ₹{deal.discountedPrice || deal.price}</p>
                    </figcaption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
