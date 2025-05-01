import React from "react";
import OwlCarousel from "react-owl-carousel";
import ProductImg1 from "../../assets/images/product-img-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

function RecentView() {
  return (
    <section className="recent-products">
      <div className="container">
        <div className="head-title">
          <h2>Recent View</h2>
        </div>

        <div className="Newprdoucts">
          <OwlCarousel
            className="owl-theme"
            margin={25}
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
            <div className="item">
              <div className="product-sec-slider box-border">
                <div className="info-tag">
                  <ul className="info-tag-list">
                    <li>
                      <a>
                        <FontAwesomeIcon icon={faHeart} />
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
                        <FontAwesomeIcon icon={faHeart} />
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
                        <FontAwesomeIcon icon={faHeart} />
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
                  {" "}
                  <img src={ProductImg1} />
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
                        <FontAwesomeIcon icon={faHeart} />
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
                  {" "}
                  <img src={ProductImg1} />
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
                        <FontAwesomeIcon icon={faHeart} />
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
                  {" "}
                  <img src={ProductImg1} />
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
                        <FontAwesomeIcon icon={faHeart} />
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
                  {" "}
                  <img src={ProductImg1} />
                  ,/
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
    </section>
  );
}

export default RecentView;
