import React, { useState, useEffect } from "react";
import InnerBanner from "../Components/Header/InnerBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faPlus,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import ProductImg2 from "../assets/images/product-img-2.jpg";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getloginData, postloginData } from "../Services/loginApiServices";
import { getecomData } from "../Services/ecomapiServices";
import { getprodData } from "../Services/prodApiServices";

const fields = [
  { name: "receiverName", placeholder: "Enter your name", label: "Full name" },
  { name: "receiverNumber", placeholder: "Mobile No.", label: "Mobile No." },
  { name: "buildingName", placeholder: "Address", label: "Address" },
  { name: "landmark", placeholder: "Landmark", label: "Landmark (Optional)" },
  { name: "district", placeholder: "city", label: "city" },
  { name: "zipCode", placeholder: "Zip Code", label: "Zip Code" },
  { name: "state", placeholder: "State", label: "State" },
  { name: "country", placeholder: "country", label: "country" },
];

function Checkout() {
  const { cartProducts } = useSelector((state) => state.orebi);
  const navigate = useNavigate();
  let totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [products, setProducts] = useState();
  const [shippingCharge, setShippingCharge] = useState(0)
  const [loading, setLoading] = useState(true);
  const cartState = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cartState || []);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState( 0);
  const [error, setError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [addresses, setAddresses] = useState([]);
  const [tax, setTax] = useState(10)
  const userId = user?.id;
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    receiverName: "",
    receiverNumber: "",
    buildingName: "",
    district: "",
    state: "",
    zipcode: "",
    country: "",
    landmark: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState();

  const validateFields = () => {
    let newErrors = {};
    if (!newAddress.receiverName.trim())
      newErrors.receiverName = "Receiver's Name is required.";
    if (!newAddress.receiverNumber.trim())
      newErrors.receiverNumber = "Mobile No. is required.";
    if (!newAddress.buildingName.trim())
      newErrors.address = "Building Name is required.";
    if (!newAddress.district.trim()) newErrors.district = "City is required.";
    if (!newAddress.state.trim()) newErrors.state = "State is required.";
    if (!newAddress.zipCode.trim()) newErrors.zipCode = "Zip Code is required.";
    if (!newAddress.country.trim()) newErrors.country = "country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = (products) => {
    if (!selectedAddress) {
      setAddressError("Address is required");
      return;
    }
    setAddressError("");

    // Calculate discount amount from percentage
    const discountAmount = (totalPrice * appliedDiscount) / 100;

    navigate("/OrderSummary", {
      state: {
        products: products,
        total: (
          totalPrice +
          shippingCharge +
          parseFloat(tax) -
          discountAmount
        ).toFixed(2),
        tax: parseFloat(tax),
        shippingCharge: shippingCharge,
        appliedDiscount: appliedDiscount,
        discountCode: discountCode,
      },
    });
  };

  // Fetch Addresses on Component Mount
  useEffect(() => {
    if (!user) return;
    fetchAddresses();
    fetchCartData();
  }, [user.id]);

  const fetchAddresses = async () => {
    try {
      const response = await getloginData(`address/user/${userId}`);

      if (response.status == 200) {
        setAddresses(response.data);
        setSelectedAddress(response.data[0]?.id || "");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const fetchCartData = async () => {
    try {
      const cartResponse = await getecomData(`cart/user/${userId}`);
      if (cartResponse.status=="error") {
        setCartItems([]);
        return;
      }
      const cartItems = cartResponse.data.items;
      const productIds = cartItems.map((item) => item.productId).join(",");

      if (productIds.length > 0) {
        const productResponse = await getprodData(
          `/products/multiple/${productIds}`
        );

        const productData = productResponse.data.data || [];

        // Create a product map for merging cart items with product data
        const productMap = new Map(
          productData.map((product) => [product.id, product])
        );
        const updatedCartItems = cartItems.map((item) => {
          const product = productMap.get(item.productId);
          const cartItem = {
            _id: item.productId,
            name: product?.name || "",
            quantity: item.quantity,
            image: product?.imageUrls || "",
            price: product?.price || 0,
          };

          return cartItem;
        });
        setProducts(updatedCartItems);
        setCartItems(updatedCartItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle New Address Form Input
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async (e) => {
    if (!validateFields()) return;

    try {
      const response = await postloginData(`address/create`, {
        userId,
        ...newAddress,
      });

      if (response.status == 201) {
        setAddresses([...addresses, response.data]);
        setSelectedAddress(response.data.id);
        setNewAddress({
          receiverName: "",
          receiverNumber: "",
          address: "",
          district: "",
          state: "",
          zipCode: "",
          country: "",
          landmark: "",
        });
        fetchCartData();
        setShowAddressForm(false); // Only close form on success
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const applyDiscount = async () => {
    try {
      const response = await getecomData(`/discounts/code/${discountCode}`);
      if (response.status === "success" && response.data?.discountPercentage) {
        const discountValue = response.data.discountPercentage; // Percentage value
        setAppliedDiscount(discountValue);
        setError("");
      } else {
        setError("Invalid or expired discount code");
        setAppliedDiscount(0);
      }
    } catch (error) {
      setError("Error applying discount. Please try again.");
      setAppliedDiscount(0);
    }
  };

  return (
    <div className="ShopMainPage">
      <InnerBanner Name={"Checkout"} />
      <div className="ShpInnerPage">
        <div className="container">
          <div class="head-title">
            <h2>Address Details</h2>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="shipping-address mb-4">
                <div className="form-field">
                  <label>Shipping Address</label>
                  <select
                    class="form-select"
                    value={selectedAddress}
                    aria-label="Default select example"
                    onChange={(e) => {
                      setSelectedAddress(e.target.value);
                      setAddressError("");
                    }}
                  >
                    <option value="">Select an Address</option>
                    {addresses.map((addr) => (
                      <option key={addr.id} value={addr.id}>
                        {addr.receiverName} - {addr.buildingName}
                      </option>
                    ))}
                  </select>
                  {addressError && (
                    <p className="text-red-500 text-sm mt-1">{addressError}</p>
                  )}
                </div>
                <div className="text-end">
                  <a
                    className="add-address btn btn-primary mt-3 text-end"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAddressForm(true);
                    }}
                  >
                    <FontAwesomeIcon className="me-2" icon={faPlus} />
                    Add Address
                  </a>
                </div>
              </div>
              {showAddressForm && (
                <div className="AddNewAddressBg">
                  <h4>Add New Address</h4>

                  {fields.map(({ name, placeholder, label }) => (
                    <div className="form-field mb-4" key={name}>
                      <label>
                        {label} <FontAwesomeIcon icon={faStarOfLife} />
                      </label>
                      <input
                        type="text"
                        name={name}
                        value={newAddress[name]}
                        onChange={handleAddressChange}
                        placeholder={placeholder}
                        className="form-control"
                      />
                    </div>
                  ))}

                  <div className="btn-group-box mt-3">
                    <button
                      className="btn btn-primary mt-0"
                      onClick={handleSaveAddress}
                    >
                      Save Address
                    </button>
                    <button
                      className="btn btn-secondary mt-0 ms-3"
                      onClick={() => setShowAddressForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-5">
              <div className="ReviewCartRight">
                <h4>Review Your Cart</h4>
                <ul className="ReviewList">
                  {cartProducts.map((product) => (
                    <li>
                      <figure>
                        <img src={ProductImg2} />
                      </figure>
                      <figcaption>
                        <h4 className="mb-0">{product.name}</h4>
                        <span className="">
                          Quantity:{product.quantity} &nbsp;|&nbsp; Colors:N/A
                        </span>
                        <div class="price-tag mt-1">
                          <p>${product.price}</p>
                        </div>
                      </figcaption>
                    </li>
                  ))}
                </ul>
                <div className="coupan-box">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <i class="fa-solid fa-money-bill"></i>
                  <input
                    type="text"
                    placeholder="Disocunt Code"
                    className="form-control"
                  />
                  <button className="btn">Apply</button>
                </div>
                <ul className="total-list">
                  <li>
                    <b>Subtotal</b>
                    <span>${totalPrice}</span>
                  </li>
                  <li>
                    <b>Shipping</b>
                    <span>$5.00</span>
                  </li>
                  <li>
                    <b>Disocunt</b>
                    <span>-$10.00</span>
                  </li>
                  <li className="total-amount">
                    <b>Total</b>
                    <span>${totalPrice - 5}</span>
                  </li>
                </ul>
                <button className="btn btn-primary w-100 mt-0 paynowbtn"    onClick={() => {
                    handleProceedToPayment(products);
                  }}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
