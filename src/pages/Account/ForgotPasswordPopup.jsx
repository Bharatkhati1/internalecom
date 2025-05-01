import React, { useState } from "react";

const ForgotPasswordPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    console.log("Password reset requested for:", email);
    onClose(); // Close modal after submission
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="w-full max-w-md p-6 space-y-4 rounded-xl bg-white dark:bg-gray-50 dark:text-gray-800 relative shadow-lg">
          <button
            className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
          <p className="text-sm text-gray-600 text-center">
            Enter your email to receive a password reset link.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="w-full p-3 text-white bg-violet-600 rounded-md hover:bg-violet-700"
            onClick={handleReset}
          >
            Reset Password
          </button>
        </div>
      </div>
    )
  );
};

export default ForgotPasswordPopup;
