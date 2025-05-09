import React, { useState, useEffect } from "react";
import logoImage from "../../assets/images/company-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import userImg from "../../assets/images/user.png";
import {
  faBell,
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import Topbar from "./Topbar";
import Menu from "../Header/Menu";
import "./Home.scss";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchCartCount,
  fetchCartData,
  fetchNotifications,
  fetchWishlist,
  logOut,
  resetCart,
} from "../../redux/orebiSlice";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../Services/prodApiServices";
import { debounce } from "../CustomeHook/useDebouncedSearch";
import { toast } from "react-toastify";
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { cartCount, wishlist, allNotifications } = useSelector(
    (state) => state.orebi
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUSer] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(resetCart());
    navigate("/");
    toast.success("Logout successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  async function searchProducts(query) {
    if (!query) {
      console.error("Search query is required.");
      return;
    }
    try {
      const response = await searchProduct(
        `/search?query=${encodeURIComponent(query)}`
      );
      const data = response.data;
      return data.products;
    } catch (error) {
      console.error("Search failed:", error);
    }
  }

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const suggestedProduct = await searchProducts(value);
      setSuggestions(suggestedProduct || []);
    } else {
      setSuggestions([]);
    }
  };

  const debouncedHandleSearchChange = debounce(handleSearchChange, 500);

  const handleSelect = (id) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/product-details/${id}`);
  };

  useEffect(() => {
    dispatch(fetchWishlist(user?.id));
    dispatch(fetchNotifications(user?.id));
    dispatch(fetchCartCount(user?.id));
  }, [dispatch]);

  function formatDate(sentAt) {
    const dateObj = new Date(sentAt);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "Pm" : "Am";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const formattedTime = `${hours}.${minutes} ${ampm}`;
    const formattedDate = `${day}/${month}/${year}`;

    return `${formattedDate} | ${formattedTime}`;
  }

  return (
    <header>
      {location?.pathname === "/" && <Topbar />}
      <div className="sec-heade ">
        <div className="container">
          <div className="sec-heade-inner d-flex justify-content-between">
            <a onClick={() => navigate("/")} className="company-logo">
              <img className="logo-img" src={logoImage} />
            </a>
            {location?.pathname === "/" ? (
              <>
                <div
                  className="sec-heade-center"
                  style={{ position: "relative" }}
                >
                  <div className="search-box d-flex">
                    <input
                      type="text"
                      placeholder="Search on product or category"
                      className="form-control"
                      // value={searchTerm}
                      onChange={debouncedHandleSearchChange}
                    />
                    <button className="btn search-btn">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </div>

                  {suggestions.length > 0 && (
                    <ul className="suggestion-dropdown">
                      {suggestions.map((item) => (
                        <li key={item.id} onClick={() => handleSelect(item.id)}>
                          {item.name}{" "}
                          <span className="text-muted">
                            ({item?.category?.name})
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <Menu />
              </>
            )}

            <div className="sec-heade-r d-flex align-items-center">
              <a className="Search-sec">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </a>
              <a className="noti-sec" onClick={() => navigate("/wishlist")}>
                {wishlist?.length > 0 && (
                  <small className="noti-text">{wishlist?.length}</small>
                )}
                <FontAwesomeIcon icon={faHeart} />
              </a>
              <a className="noti-sec" onClick={() => navigate("/cart")}>
                {cartCount > 0 && (
                  <small className="noti-text">{cartCount}</small>
                )}
                <FontAwesomeIcon icon={faCartShopping} />
                {showNotifications && (
                  <div
                    className="NotificationBox"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="NotificationsHead d-flex justify-content-between">
                      <h4>Notifications</h4>
                      <a className="closeBox">
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={() =>
                            setShowNotifications(!showNotifications)
                          }
                        />
                      </a>
                    </div>
                    <ul className="NotificationBoxList">
                      {allNotifications.map((notif) => (
                        <li className="Unread-noti">
                          <figure>
                            <img src={userImg} />
                          </figure>
                          <figcaption>
                            <h4>{notif.message.title}</h4>
                            <span>{notif.message.body}</span>
                            <div className="timedate">
                              {formatDate(notif.sentAt)}
                            </div>
                          </figcaption>
                        </li>
                      ))}
                    </ul>

                    <a className="UnseenBox">Seen All</a>
                  </div>
                )}
              </a>
              <a
                className="noti-sec"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                {/* <small className="noti-text">1</small> */}
                <FontAwesomeIcon icon={faBell} />
              </a>
              <Dropdown className="dropdown user-drop-down ">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="btn  dropdown-toggle mt-0"
                >
                  <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {token ? (
                    <>
                      {" "}
                      <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleLogout()}>
                        Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>{" "}
                      <Dropdown.Item href="/signin">Login</Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      {location?.pathname === "/" && <Menu />}
    </header>
  );
}
export default Header;
