import React, { useState, useEffect } from "react";
import {
  deleteUserAddress,
  getloginData,
  setDefaultAddress,
} from "../../Services/loginApiServices";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import AddAddressModal from "../Modals/AddAddressModal";
import { updateUserDetails } from "../../Services/userApiServices";
import { toast } from "react-toastify";
import DeletePopup from "../Modals/DeletePopup";
import {
  deleteecomData,
  getecomData,
  postecomData,
} from "../../Services/ecomapiServices";
import AddPaymentMethod from "../Modals/AddPaymentMethod";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "male",
    addresses: [],
  });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData || !userData.id) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await getloginData(`/users/${userData.id}`);
      if (response.status != 200) {
        throw new Error("Failed to fetch user data");
      }

      const data = response.data;
      setUser(data);

      setFormData({
        name: data.name || "",
        email: data.email || "",
        mobileNumber: data.mobileNumber || "",
        addresses: data.addresses || [],
      });

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
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
    fetchUserData();
    fetchSavedPaymentMethod();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      addresses: updatedAddresses,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.id) {
        throw new Error("User ID not found in localStorage");
      }
      const response = await updateUserDetails(
        `/users/update/${userData.id}`,
        formData
      );
      setUser(response.data);
    } catch (err) {
      alert(`Error updating profile: ${err.message}`);
    }
  };

  const setDefault = async (addressId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.id) {
        throw new Error("User ID not found in localStorage");
      }
      const response = await setDefaultAddress(
        `/address/${addressId}/set-default`,
        { userId: userData.id }
      );
      fetchUserData();
      toast.success("Default address updated");
    } catch (err) {
      toast.error(`Error setting default address: ${err.message}`);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData || !userData.id) {
        throw new Error("User ID not found in localStorage");
      }
      const response = await deleteUserAddress(
        `/address/remove/${addressId}/${userData.id}`
      );

      // Update local state by removing the deleted address
      const updatedAddresses = formData.addresses.filter(
        (addr) => addr.id !== addressId
      );
      setFormData({
        ...formData,
        addresses: updatedAddresses,
      });

      toast.success("Address deleted successfully");
    } catch (err) {
      toast.error(`Error deleting address: ${err.message}`);
    }
  };

  const deletePaymentMethod = async (id) => {
    try {
      const response = await deleteecomData(`/payment/delete-method/${id}`);

      // Update local state by removing the deleted address
      const updatedSaveMethods = savedPaymentMethods.filter(
        (method) => method.id !== id
      );
      setSavedPaymentMethods(updatedSaveMethods);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-state">
        <div className="error-box">
          <p>
            <strong>Error:</strong> {error}
          </p>
          <p>Please try refreshing the page or logging in again.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AddAddressModal
        selectedAddress={selectedAddress}
        isEditAddress={isEditAddress}
        open={openAddAddressModal}
        fetchUserData={fetchUserData}
        setOpenModal={setOpenAddAddressModal}
      />
      <DeletePopup
        deleteAddress={(val) =>
          activeTab == "paymentMethods"
            ? deletePaymentMethod(val)
            : deleteAddress(val)
        }
        selectedAddress={selectedAddress}
        open={showDeletePopup}
        setOpenModal={setShowDeletePopup}
      />
      <AddPaymentMethod
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
        fetchSavedPaymentMethod={fetchSavedPaymentMethod}
      />
      <div className="user-profile">
        <div className="container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="avatar">
              {formData.name && formData.name.charAt(0).toUpperCase()}
            </div>
            <div className="greeting">
              <h1>Welcome, {formData.name}</h1>
              <p>{formData.email}</p>
            </div>
          </div>

          {/* Dashboard Boxes */}
          <div className="dashboard-grid">
            {/* Orders Box */}
            <div className="dashboard-box" onClick={()=> navigate("/all-orders")}>
              <div className="box-header">
                <div className="icon-container">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3>My Orders</h3>
              </div>
              <p>View your order history and track current orders</p>
            </div>

            {/* Wishlist Box */}
            <div className="dashboard-box">
              <div className="box-header">
                <div className="icon-container">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3>Wishlist</h3>
              </div>
              <p>View and manage your saved items</p>
            </div>

            {/* Coupons Box */}
            <div className="dashboard-box">
              <div className="box-header">
                <div className="icon-container">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3>Coupons</h3>
              </div>
              <p>View and apply your available coupons</p>
            </div>

            {/* Help Center Box */}
            <div className="dashboard-box">
              <div className="box-header">
                <div className="icon-container">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3>Help Center</h3>
              </div>
              <p>Get support and find answers to your questions</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <nav>
              <button
                onClick={() => setActiveTab("profile")}
                className={activeTab === "profile" ? "active" : ""}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={activeTab === "addresses" ? "active" : ""}
              >
                My Addresses
              </button>
              <button
                onClick={() => setActiveTab("paymentMethods")}
                className={activeTab === "paymentMethods" ? "active" : ""}
              >
                Saved Payment Methods
              </button>
            </nav>
          </div>

          {/* Profile Information Form */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Profile Information
              </h2>

              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (user) {
                        setFormData({
                          name: user.name || "",
                          email: user.email || "",
                          mobileNumber: user.mobileNumber || "",
                          dateOfBirth: user.dateOfBirth || "",
                          gender: user.gender || "male",
                          addresses: user.addresses || [],
                        });
                      }
                    }}
                    className="reset-btn"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Addresses Section */}
          {activeTab === "addresses" && (
            <div className="address-section">
              <h2>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                My Addresses
              </h2>

              {formData.addresses.length === 0 ? (
                <div className="address-empty-state">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p>You don't have any saved addresses yet.</p>
                </div>
              ) : (
                formData.addresses.map((address, index) => (
                  <div
                    key={address.id}
                    className={`address-card ${
                      address.isDefault ? "default-address" : ""
                    }`}
                  >
                    <span
                      className={`address-tag ${
                        address.isDefault ? "default-tag" : "regular-tag"
                      }`}
                    >
                      {address.isDefault ? "Default" : address.type}
                    </span>

                    <h3>{address.type} Address</h3>
                    <div className="address-details">
                      <p>{address.receiverName}</p>
                      <p>{address.receiverNumber}</p>
                      <p>{address.buildingName}</p>
                      <p>{address.street}</p>
                      <p>
                        {address.district}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                    </div>

                    <div className="address-actions">
                      <button
                        onClick={() => {
                          setSelectedAddress(address);
                          setOpenAddAddressModal(true);
                          setIsEditAddress(true);
                        }}
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setShowDeletePopup(true);
                          setSelectedAddress(address);
                        }}
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Delete
                      </button>

                      {!address.isDefault && (
                        <button onClick={() => setDefault(address.id)}>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Add New Address */}
              <button
                onClick={() => setOpenAddAddressModal(true)}
                className="add-address-btn"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Add New Address</span>
              </button>
            </div>
          )}

          {/* Saved Payment Section */}
          {activeTab === "paymentMethods" && (
            <div className="payment-methods-section">
              <h2>Saved Payment Methods</h2>

              {savedPaymentMethods.length === 0 ? (
                <div className="empty-state">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p>You don't have any saved Payment method yet</p>
                </div>
              ) : (
                savedPaymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`payment-card ${
                      method.isDefault ? "default-method" : ""
                    }`}
                  >
                    <span
                      className={`tag ${method.isDefault ? "default-tag" : ""}`}
                    >
                      {method.isDefault
                        ? "Default"
                        : method.methodType.toUpperCase()}
                    </span>

                    <h3>
                      {method.methodType === "card" ? "Card" : "UPI"} Payment
                    </h3>

                    <div className="method-details">
                      {method.methodType === "card" ? (
                        <>
                          <p>Name on Card: {method.cardName}</p>
                          <p>Brand: {method.cardBrand}</p>
                          <p>
                            Last 4 Digits: **** **** **** {method.cardLastFour}
                          </p>
                          <p>Expiry: {method.cardExpiry}</p>
                        </>
                      ) : (
                        <p>UPI ID: {method.upiId}</p>
                      )}
                    </div>

                    <div className="actions">
                      <button
                        onClick={() => {
                          setSelectedAddress(method);
                          setShowDeletePopup(true);
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}

              <button
                onClick={() => setOpenPaymentModal(true)}
                className="add-method-btn"
              >
                ➕ <span>Add New Method</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
