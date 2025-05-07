import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteecomData,
  getecomData,
  postecomData,
} from "../../Services/ecomapiServices";
import InnerBanner from "../../Components/Header/InnerBanner";
import SuccessModal from "../Modals/SuccessModal";

function OrderSummary() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [orderId, setOrderId] = useState();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isAddNewMethod, setIsAddNewMethod] = useState(false);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const { cartProducts } = useSelector((state) => state.orebi);
  let totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const userId = user.id;
  const { total, appliedDiscount, tax, discountCode } = location.state ?? 0;

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    agreeTerms: false,
  });
  const [orderformData, setorderFormData] = useState({
    userId: userId,
    totalPrice: total,
    tax: tax,
    discount: appliedDiscount,
    couponCode: discountCode,
    paymentId: "",
    paymentType: "",
    paymentStatus: "pending",
    products: cartProducts.map((product) => ({
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity: product.quantity,
      tax: tax,
    })),
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (!formData.agreeTerms) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }

    const orderData = {
      ...orderformData,
      paymentType: paymentMethod, // Assign selected payment method
      paymentId: paymentMethod !== "COD" ? generateUniqueId() : null, // Mock payment ID for non-COD
    };

    try {
      const response = await postecomData("orders/create", orderData);

      const result = response;

      if (result.status === "success") {
        setIsModalOpen(true);
        setOrderId(result.data.id);
        await removeProductsFromCart(orderData.products, orderData.userId);
        // navigate("/order-summary", { state: { orderId: result.orderId } }); // Navigate after success
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const removeProductsFromCart = async (products, userId) => {
    try {
      for (const product of products) {
        const response = await deleteecomData(
          `cart/remove?userId=${userId}&productId=${product.productId}`
        );
      }
    } catch (error) {
      console.error("Error removing products from cart:", error);
    }
  };

  const generateUniqueId = () => {
    return "450254" + Math.floor(Math.random() * 1000000000); // Example unique ID generator
  };

  const handleRazorpayPayment = () => {
    if (!formData.agreeTerms) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: total * 100,
      currency: "INR",
      name: "Your Store Name",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment successful: " + response.razorpay_payment_id);
        navigate("/order-summary", {
          state: { orderId: response.razorpay_payment_id },
        });
      },
      prefill: {
        name: formData.cardName,
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    if (paymentMethod === "upi") {
      options.payment_capture = 1;
      options.method = { upi: true };
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const fetchSavedPaymentMethod = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const res = await getecomData(
        `/payment/saved-payment-methods/${userData.id}`
      );
      setSavedPaymentMethods(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedPaymentMethod();
  }, []);

  return (
    <div className="OrderSummaryMain">
      <SuccessModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Placed Successfully!"
        message="Your order has been placed successfully. You can view your order details in the orders section."
        buttonText="OK"
        onButtonClick={() => {
          setIsModalOpen(false);
          navigate("/all-orders", { state: { orderId, userId } });
          window.location.reload();
        }}
      />
      <InnerBanner Name={"Order Summary"} />
      <div className="OrderSummaryBox">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="OrderSummaryInner">
                <div className="head-title">
                  <h2>Payment Method</h2>
                </div>
                <p className="p-save-method">
                  Select from saved payment methods :
                </p>
                <div className="savedPayment-methods">
                  {savedPaymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`payment-card ${
                        method?.id == selectedMethod?.id ? "default-method" : ""
                      }`}
                    >
                      <span
                        className={`tag ${
                          method.isDefault ? "default-tag" : ""
                        }`}
                      >
                        {method.isDefault
                          ? "Default"
                          : method.methodType.toUpperCase()}
                      </span>

                      <div className="method-details">
                        {method.methodType === "card" ? (
                          <>
                            <p>Name on Card: {method.cardName}</p>
                            <p>
                              Last 4 Digits: **** **** ****{" "}
                              {method.cardLastFour}
                            </p>
                            <p>Expiry: {method.cardExpiry}</p>
                            {method.cardBrand &&
                              method.cardBrand !== "unknown" && (
                                <p>
                                  Card Type:{" "}
                                  {method.cardBrand.charAt(0).toUpperCase() +
                                    method.cardBrand.slice(1)}
                                </p>
                              )}
                          </>
                        ) : (
                          <p>UPI ID: {method.upiId}</p>
                        )}
                      </div>
                      <div className="actions">
                        <button
                          onClick={() => {
                            setPaymentMethod("card");
                            setSelectedMethod(method);
                            setIsAddNewMethod(false);
                          }}
                        >
                          {method?.id == selectedMethod?.id
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="add-new-method"
                  onClick={() => {
                    setSelectedMethod(null);
                    setIsAddNewMethod(true);
                  }}
                >
                  Add new payment methods +
                </button>
                <br></br>
                {isAddNewMethod && (
                  <>
                    <div className="CheckListBox d-flex">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="card"
                          checked={paymentMethod === "card"}
                          onChange={() => handlePaymentSelection("card")}
                        />
                        <label className="form-check-label" htmlFor="card">
                          Card Payment
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => handlePaymentSelection("upi")}
                        />
                        <label className="form-check-label" htmlFor="upi">
                          UPI
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => handlePaymentSelection("COD")}
                        />
                        <label className="form-check-label" htmlFor="COD">
                          Cash On Delivery
                        </label>
                      </div>
                    </div>

                    <div className="MethodBox mt-4">
                      <div className="row PaymentsM">
                        {paymentMethod === "card" && (
                          <>
                            <div className="form-box col-md-12 mb-4">
                              <input
                                type="text"
                                name="cardName"
                                placeholder="Cardholder name"
                                className="form-control"
                                value={formData.cardName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-box col-md-12 mb-4">
                              <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                className="form-control"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-12">
                              <div className="row">
                                <div className="form-box col-md-6">
                                  <input
                                    type="text"
                                    name="expDate"
                                    placeholder="Exp (MM/YY)"
                                    className="form-control"
                                    value={formData.expDate}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="form-box col-md-6">
                                  <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    className="form-control"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {paymentMethod === "upi" && (
                          <div className="UPIBox mt-4">
                            <div className="form-box col-md-12 mb-4">
                              <input
                                type="text"
                                placeholder="Enter UPI ID"
                                className="form-control"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                        {paymentMethod === "COD" && (
                          <div className="UPIBox mt-4">
                            <p className="cod-selected">
                              {" "}
                              You have selected COD !
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {(selectedMethod != null || isAddNewMethod) && (
                  <>
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree to the Terms and Conditions
                      </label>
                    </div>
                    {paymentMethod === "COD" ? (
                      <button
                        className="btn btn-primary mt-3"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary mt-3"
                        onClick={handleRazorpayPayment}
                      >
                        Proceed to Payment
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="OrderSummaryBg">
                <h4 className="mb-3">Order Summary</h4>
                <div className="Total Amount">
                  <h3>Total Amount:</h3>
                  <b>₹{totalPrice}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderSummary;
