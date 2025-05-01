import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import LatestImg from "../../assets/images/product-img-1.jpg";
import LatestImg2 from "../../assets/images/product-img-2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getprodData } from "../../Services/prodApiServices";
import ProductInfo from "../../Components/Common/ProductInfo";
import { postecomData } from "../../Services/ecomapiServices";
import { addToCart, fetchCartCount } from "../../redux/orebiSlice";

function Products() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { cartProducts = [] } = useSelector((state) => state.orebi);
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const cartProductIds = cartProducts.map((p) => p.id);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = categoryName
        ? `/products/categories/${categoryName}`
        : "/products";

      const [productRes, filterRes] = await Promise.all([
        getprodData(endpoint),
        categoryName
          ? getprodData(`/filters/category/${categoryName}`)
          : Promise.resolve({ data: { status: false, data: [] } }),
      ]);

      // Handle products
      if (productRes?.data?.status === true) {
        setProducts(productRes.data.data || []);
      } else {
        throw new Error("Failed to fetch products");
      }

      // Handle filters
      if (
        filterRes?.data?.status === true &&
        Array.isArray(filterRes.data.data)
      ) {
        const filtersData = filterRes.data.data.reduce((acc, filter) => {
          acc[filter.name] = filter.values;
          return acc;
        }, {});
        setFilters(filtersData);
        setSelectedFilters(
          Object.keys(filtersData).reduce((acc, key) => {
            acc[key] = [];
            return acc;
          }, {})
        );
      } else {
        setFilters({});
        setSelectedFilters({});
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally show user-friendly error
    } finally {
      setLoading(false);
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
      const response = await postecomData("cart/add", cartData);
      dispatch(addToCart(product));
      dispatch(fetchCartCount(userDetails.id));
    } else {
      alert("Please login to add items to your cart.");
    }
  };
  
  const handleCheckboxChange = (category, option) => {
    setSelectedFilters((prevSelected) => ({
      ...prevSelected,
      [category]: prevSelected[category]?.includes(option)
        ? prevSelected[category].filter((item) => item !== option)
        : [...prevSelected[category], option],
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters(
      Object.keys(filters).reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  return (
    <section>
      <div className="inner-banner-sec">
        <div className="container">
          <h3>Product Category</h3>
        </div>
      </div>
      <div className="product-category">
        <div className="container">
          <div className="row">
            <div className="col-md-3 product-category-left">
              <h3 className="l-title-head">Filters By</h3>
              <div className="accordian-list">
                <Accordion defaultActiveKey="0">
                  {Object.keys(filters).map((filterKey, index) => (
                    <Accordion.Item eventKey={index.toString()} key={filterKey}>
                      <Accordion.Header>{filterKey}</Accordion.Header>
                      <Accordion.Body>
                        <ul className="check-list">
                          {filters[filterKey]?.map((option, idx) => (
                            <li key={option + idx}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`${filterKey}-${option}`}
                                  checked={
                                    selectedFilters[filterKey]?.includes(
                                      option
                                    ) || false
                                  }
                                  onChange={() =>
                                    handleCheckboxChange(filterKey, option)
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`${filterKey}-${option}`}
                                >
                                  {option}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
              <div className="recent-product">
                <h3>New products</h3>
                <div className="recent-product-inner">
                  <ul className="new-product-list">
                    <li>
                      <figure>
                        <img src={LatestImg} />
                      </figure>
                      <figcaption>
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
                        <h4>Apple Watch Series 1 Rose Gold</h4>
                        <span>€59.00</span>
                      </figcaption>
                    </li>
                    <li>
                      <figure>
                        <img src={LatestImg2} />
                      </figure>
                      <figcaption>
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
                        <h4>Apple Watch Series 1 Rose Gold</h4>
                        <span>€59.00</span>
                      </figcaption>
                    </li>
                    <li>
                      <figure>
                        <img src={LatestImg} />
                      </figure>
                      <figcaption>
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
                        <h4>Apple Watch Series 1 Rose Gold</h4>
                        <span>€59.00</span>
                      </figcaption>
                    </li>
                  </ul>
                  <a className="view-all-btn" href="">
                    View All
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-9 product-category-right">
              <div className="main-filters-top d-flex align-items-center justify-content-between">
                <h4>There are 15 products.</h4>
                <div className="filters-sec">
                  <label>Sort By</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected="">Relevance</option>
                    <option value="1">Best sellers</option>
                    <option value="2">Name, A to Z</option>
                    <option value="3">Name, Z to A</option>
                  </select>
                </div>
              </div>
              <div className="row" >
                  {products.map((product) => (
                    <ProductInfo
                      product={product}
                      handleAddToCart={handleAddToCart}
                      cartProductIds={cartProductIds}
                    />
                  ))}
              </div>
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link " href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
