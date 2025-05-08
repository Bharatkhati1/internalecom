import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Products";
import ProductDetails from "./pages/Product/ProductDetails";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/Product/OrderSummary";
import FAQ from "./pages/FAQ";
import TermsCondition from "./pages/TermsCondition";
import Blogs from "./pages/Blogs";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import UserProfile from "./pages/Profile/Profile";
import AppLayout from "./Components/AppLayout";
import { ToastContainer } from "react-toastify";
import OrderListing from "./pages/OrderListing";
import NotificationSetup from "./Components/NotificationSetup";
import Wishlist from "./pages/wishlist/Wishlist";

function App() {
  return (
    <Router>
      <NotificationSetup />
      <ToastContainer position="top-right" autoClose={1800} />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:categoryName" element={<Product />} />
          <Route path="/Product-details/:id" element={<ProductDetails />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/OrderSummary" element={<OrderSummary />} />
          <Route path="/all-orders" element={<OrderListing />}></Route>
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/TermsCondition" element={<TermsCondition />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
