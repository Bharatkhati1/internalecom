import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postloginData } from "../../Services/loginApiServices";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogin = async () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Please enter your email";
    if (!formData.password) newErrors.password = "Please enter your password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await postloginData("/auth/login-customer", formData);
      const data = response?.data;

      if (response.status !== 201) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
      window.location.reload();
    } catch (error) {
      setErrors({ email: "Invalid credentials", password: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="signin-content">
          <div className="signin-form-wrapper">
            <form className="signin-form">
              <div className="signin-header">
                <h3>Login in</h3>
                <p>
                  Log in to your account and explore a world of possibilities. Your journey begins here.
                </p>
              </div>

              <div className="signin-input-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="Enter email"
                />
                {errors.email && <p className="signin-error">{errors.email}</p>}
              </div>

              <div className="signin-input-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="Enter password"
                />
                {errors.password && <p className="signin-error">{errors.password}</p>}
              </div>

              <div className="signin-options">
                <a href="#" className="signin-forgot">Forgot your password?</a>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="signin-submit"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="signin-register">
                Don't have an account{" "}
                <a onClick={() => navigate('/signup')}>Register here</a>
              </p>
            </form>
          </div>

          <div className="signin-image-wrapper">
            <img
              src="https://readymadeui.com/login-image.webp"
              alt="Login Visual"
              className="signin-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
