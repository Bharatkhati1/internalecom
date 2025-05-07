import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getecomData, putecomData } from "../Services/ecomapiServices";
import "./pages.scss";

export default function OrderListing() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const userId = user.id;

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        throw new Error("User not found. Please login again.");
      }
      const response = await getecomData(`/orders/user/${userId}`);
      const result = response;

      if (result.status) {
        setOrders(result.data);
      } else {
        throw new Error("Failed to fetch orders.");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await putecomData(`/orders/update/${orderId}`, {
        statusId: 7,
      });

      fetchOrders();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter
      ? order.status.status === statusFilter.toLowerCase()
      : true;
    const matchesYear = yearFilter
      ? new Date(order.createdAt).getFullYear().toString() === yearFilter
      : true;
    const matchesSearch = searchQuery
      ? order.products.some((p) =>
          p.productName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;

    return matchesStatus && matchesYear && matchesSearch;
  });

  return (
    <div className="order-listing-container">
      <div className="filters-section">
        <div className="filter-group">
          <h2>ORDER STATUS</h2>
          <ul>
            {["On the way", "Delivered", "Canceled", "Returned", "Pending"].map(
              (status) => (
                <li
                  key={status}
                  className={statusFilter === status ? "active" : ""}
                  onClick={() =>
                    setStatusFilter(statusFilter === status ? "" : status)
                  }
                >
                  {status}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="orders-section">
        <div className="search-box">
          <h2>Search your orders here</h2>
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            No orders found matching your criteria
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>
                    {order.uniqueId} - {order.products.length} item
                    {order.products.length !== 1 ? "s" : ""}
                  </h3>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <span className={`status ${order.status.status}`}>
                      {order.status.status.charAt(0).toUpperCase() +
                        order.status.status.slice(1)}
                    </span>

                    {order.status.status.toLowerCase() !== "delivered" &&
                      order.status.status.toLowerCase() !== "canceled" &&
                      order.status.status.toLowerCase() !== "completed" && (
                        <button
                          className="cancel-button"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      )}
                  </div>
                </div>

                {order.products.map((product) => (
                  <div key={product.id} className="product-details">
                    <div className="product-info">
                      <p className="product-name">{product.productName}</p>
                      <p className="product-sku">SKU: {product.productId}</p>
                    </div>
                    <div className="product-price">${product.price}</div>
                    <div className="delivery-date">
                      Delivered on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
