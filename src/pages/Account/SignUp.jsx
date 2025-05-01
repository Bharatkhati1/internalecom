import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postloginData } from "../../Services/loginApiServices";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSignUp = async () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.email) newErrors.email = "Please enter your email";
    if (!formData.password) newErrors.password = "Please enter your password";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...requestData } = formData;

      const response = await postloginData("/auth/register", requestData);
      const data = response?.data;

      if (response.status !== 201) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/signin");
    } catch (error) {
      setErrors({ email: "Signup failed", password: "Please try again" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="signin-content">
          <div className="signin-form-wrapper">
            <form className="signin-form">
              <div className="signin-header">
                <h3>Sign up</h3>
                <p>Create an account to explore a world of possibilities.</p>
              </div>

              <div className="signin-input-group">
                <label>Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="signin-error">{errors.name}</p>}
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
                {errors.password && (
                  <p className="signin-error">{errors.password}</p>
                )}
              </div>

              <div className="signin-input-group">
                <label>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="signin-error">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="signin-options" >
                Already have an account?{" "}
                <a
                  href="#"
                  className="signin-forgot"
                  onClick={() => navigate("/signin")}
                >
                  Login here
                </a>
              </div>
              <button
                type="button"
                className="signin-submit"
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </form>
          </div>

          <div className="signin-image-wrapper">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="signin-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
