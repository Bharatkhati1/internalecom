import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import categoryImg1 from "../../assets/images/img-1.svg";
import categoryImg2 from "../../assets/images/img-2.svg";
import categoryImg3 from "../../assets/images/img-3.svg";
import categoryImg4 from "../../assets/images/img-4.svg";
import categoryImg5 from "../../assets/images/img-5.svg";
import categoryImg6 from "../../assets/images/img-6.svg";
import categoryImg7 from "../../assets/images/img-7.svg";
import categoryImg8 from "../../assets/images/img-8.svg";
import "./Home.scss"
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../Services/prodApiServices";

const carouselOptions = {
  className: "owl-theme",
  margin: 10,
  nav: true,
  dots: false,
  autoplayTimeout: 3000,
  items: 6,
  responsive: {
    0: { items: 1 },
    600: { items: 3 },
    1000: { items: 6 },
  },
};

function Category() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories(`/categories`);
      setAllCategories(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <section className="sec-category section-space">
      <div className="container">
        <div className="head-title">
          <span>Categories</span>
          <h2>Browse By Category</h2>
        </div>
        <ul className="Categories-list">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className="skeleton-category">
                <figure style={{ backgroundColor: "#eee", height: "80px" }} />
                <h3
                  style={{
                    backgroundColor: "#ddd",
                    height: "20px",
                    width: "60%",
                    margin: "10px auto",
                  }}
                />
              </li>
            ))
          ) : (
            <OwlCarousel {...carouselOptions}>
              {allCategories.map((category) => (
                <li
                  key={category._id}
                  onClick={() => navigate(`/product/${category.name}`)}
                >
                  <figure>
                    <img src={categoryImg1} alt={category.name} />
                  </figure>
                  <h3>{category.name}</h3>
                </li>
              ))}
            </OwlCarousel>
          )}
        </ul>
      </div>
    </section>
  );
}
export default Category;
