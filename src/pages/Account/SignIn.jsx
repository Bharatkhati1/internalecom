import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postloginData } from "../../Services/loginApiServices";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({ 
    email: "", 
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(null); // null | 'email' | 'otp' | 'newPassword'
  const [resetToken, setResetToken] = useState(null);

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

      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, [2000]);
    } catch (error) {
      toast.error("Login Failed!");
      setErrors({
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (forgotPasswordStep === null) handleLogin();
      if (forgotPasswordStep === 'email') handleSendOtp();
      if (forgotPasswordStep === 'otp') handleVerifyOtp();
      if (forgotPasswordStep === 'newPassword') handleResetPassword();
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: "Please enter your email" });
      return;
    }

    setLoading(true);
    try {
      const res = await postloginData("/auth/forgot-password", { email: formData.email });
      toast.success("OTP sent to your email!");
      setForgotPasswordStep('otp');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      setErrors({ ...errors, otp: "Please enter the OTP" });
      return;
    }

    setLoading(true);
    try {
      const res = await postloginData("/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp
      });
      setResetToken(res.data.token); // Assuming the API returns a token
      toast.success("OTP verified!");
      setForgotPasswordStep('newPassword');
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    let newErrors = {};
    if (!formData.newPassword) newErrors.newPassword = "Please enter a new password";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await postloginData("/auth/reset-password", {
        email: formData.email,
        newPassword: formData.newPassword
      });
      toast.success("Password reset successfully!");
      setForgotPasswordStep(null);
      setFormData({
        ...formData,
        password: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const renderForgotPasswordForm = () => {
    switch (forgotPasswordStep) {
      case 'email':
        return (
          <form className="signin-form">
            <div className="signin-header">
              <h3>Forgot Password</h3>
              <p>
                Enter your registered email. We'll send you an OTP to reset
                your password.
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
              {errors.email && (
                <p className="signin-error">{errors.email}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="signin-submit"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <p className="signin-register">
              <a onClick={() => setForgotPasswordStep(null)}>
                ← Back to login
              </a>
            </p>
          </form>
        );
      
      case 'otp':
        return (
          <form className="signin-form">
            <div className="signin-header">
              <h3>Verify OTP</h3>
              <p>
                We've sent a 6-digit OTP to your email {formData.email}. 
                Please enter it below.
              </p>
            </div>

            <div className="signin-input-group">
              <label>OTP</label>
              <input
                name="otp"
                type="text"
                value={formData.otp}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
                placeholder="Enter 6-digit OTP"
              />
              {errors.otp && (
                <p className="signin-error">{errors.otp}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="signin-submit"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="signin-register">
              <a onClick={() => setForgotPasswordStep('email')}>
                ← Back to email entry
              </a>
            </p>
          </form>
        );
      
      case 'newPassword':
        return (
          <form className="signin-form">
            <div className="signin-header">
              <h3>Reset Password</h3>
              <p>
                Please enter your new password.
              </p>
            </div>

            <div className="signin-input-group">
              <label>New Password</label>
              <input
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="signin-error">{errors.newPassword}</p>
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
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="signin-error">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="signin-submit"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <p className="signin-register">
              <a onClick={() => setForgotPasswordStep('otp')}>
                ← Back to OTP entry
              </a>
            </p>
          </form>
        );
      
      default:
        return (
          <form className="signin-form">
            <div className="signin-header">
              <h3>Login</h3>
              <p>
                Log in to your account and explore a world of possibilities.
                Your journey begins here.
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
              {errors.email && (
                <p className="signin-error">{errors.email}</p>
              )}
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

            <div className="signin-options">
              <p
                className="signin-forgot"
                onClick={() => setForgotPasswordStep('email')}
              >
                Forgot your password?
              </p>
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
              <a onClick={() => navigate("/signup")}>Register here</a>
            </p>
          </form>
        );
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="signin-content">
          <div className="signin-form-wrapper">
            {renderForgotPasswordForm()}
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