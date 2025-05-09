import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import LatestImg from "../../assets/images/product-img-1.jpg";
import LatestImg2 from "../../assets/images/product-img-2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterProducts, getprodData } from "../../Services/prodApiServices";
import ProductInfo from "../../Components/Common/ProductInfo";
import { getecomData, postecomData } from "../../Services/ecomapiServices";
import { addToCart, fetchCartCount } from "../../redux/orebiSlice";
import { toast } from "react-toastify";

function Products() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { cartProducts = [], wishlist = [] } = useSelector(
    (state) => state.orebi
  );
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState(""); // 'price', 'name', etc.
  const [sortDirection, setSortDirection] = useState(""); // 'asc', 'desc'
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const [pageSize, setPageSize] = useState(10); // Set page size to limit number of products per page
  const dispatch = useDispatch();

  const handleCheckboxChange = (filterKey, option) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
  
      const currentOptions = newFilters[filterKey] ? [...newFilters[filterKey]] : [];
  
      if (currentOptions.includes(option)) {
        newFilters[filterKey] = currentOptions.filter((item) => item !== option);
      } else {
        newFilters[filterKey] = [...currentOptions, option];
      }
  
      return newFilters;
    });
  };
  
  const cartProductIds = cartProducts.map((p) => p.id || p._id);

  const fetchData = async () => {
    setLoading(true);
    try {
      const filterPayload = {};

      if (categoryName) filterPayload.categoryName = categoryName;
      if (searchQuery?.trim()) filterPayload.search = searchQuery.trim();

      // Pass sort options
      if (sortOption) filterPayload.sortBy = sortOption;
      if (sortDirection) filterPayload.order = sortDirection;

      const attributeFilters = Object.entries(selectedFilters || {}).flatMap(
        ([name, values]) => values.map((value) => ({ name, value }))
      );

      if (attributeFilters.length) {
        filterPayload.attributeFilters = attributeFilters;
      }

      filterPayload.page = currentPage;
      filterPayload.limit = pageSize;

      const [productRes, filterRes] = await Promise.all([
        filterProducts("/filters/filter", filterPayload),
        categoryName
          ? getprodData(`/filters/category/${categoryName}`)
          : Promise.resolve({ data: { status: false, data: [] } }),
      ]);

      setProducts(productRes.data.data || []);

      // // Handle filters
      if (
        filterRes?.data?.status === true &&
        Array.isArray(filterRes.data.data)
      ) {
        const filtersData = filterRes.data.data.reduce((acc, filter) => {
          acc[filter.name] = filter.values;
          return acc;
        }, {});
        setFilters(filtersData);
      } else {
        setFilters({});
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      toast.success("Successfully added to cart.");
    } else {
      toast.error("Please login to add items to your cart.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getTopDeals = async()=>{
    try {
      await getecomData("/discounts/top/deals")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
    getTopDeals()
  }, [categoryName, currentPage, sortOption, sortDirection, selectedFilters]);

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
                <h4>showing {products?.length} products.</h4>
                <div className="filters-sec">
                  <label>Sort By</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "price-asc") {
                        setSortOption("price");
                        setSortDirection("asc");
                      } else if (value === "price-desc") {
                        setSortOption("price");
                        setSortDirection("desc");
                      } else if (value === "name-asc") {
                        setSortOption("name");
                        setSortDirection("asc");
                      } else if (value === "name-desc") {
                        setSortOption("name");
                        setSortDirection("desc");
                      }
                    }}
                  >
                    <option value="">Select Filter</option>
                    <option value="name-asc">Name, A to Z</option>
                    <option value="name-desc">Name, Z to A</option>
                    <option value="price-asc">Price, low to high</option>
                    <option value="price-desc">Price, high to low</option>
                  </select>
                </div>
              </div>
              <div className="row">
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
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                <li
                  className={`page-item ${currentPage === 1 ? "active" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </a>
                </li>
                <li
                  className={`page-item ${currentPage === 2 ? "active" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(2)}
                  >
                    2
                  </a>
                </li>
                <li
                  className={`page-item ${currentPage === 3 ? "active" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(3)}
                  >
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
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
