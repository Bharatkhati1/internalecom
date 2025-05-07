import React, { useState } from "react";
import SignUpForm from "./SignUpPopup";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import { postloginData } from "../../Services/loginApiServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
const LoginPopup = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await postloginData("/auth/login-customer", {email, password });
//   console.log({response})
//       if (response.status===201) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", response.data);
//         console.log("Login Successful:", response.data);
//         onClose(); // Close modal on success
//       } else {
//         console.error("Login Failed:");
//         alert( "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };
const handleLogin = async () => {
    try {
        const response = await postloginData("/auth/login-customer", { email, password });

        if (response.status === 201) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));

            toast.success("Login Successful! 🎉", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            window.location.reload()
            onClose(); // Close modal on success
        } else {
            toast.error("Login failed. Please try again. ❌", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            console.error("Login Failed:");
        }
    } catch (error) {
        toast.error("An error occurred. Please try again later. ⚠️", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

        console.error("Error during login:", error);
    }
};
  return (
    isOpen && (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white dark:bg-gray-50 dark:text-gray-800 relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black"
              onClick={onClose}
            >
              ×
            </button>
            <h1 className="text-2xl font-bold text-center">
              {isSignUp ? "Sign Up" : "Login"}
            </h1>

            {isSignUp ? (
              <SignUpForm onSignUp={() => setIsSignUp(false)} onClose={onClose} />
            ) : (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1 text-sm">
                  <label htmlFor="email" className="block text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="flex justify-end text-xs">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setIsForgotPassword(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="block w-full p-3 text-center rounded-sm text-white bg-violet-600 hover:bg-violet-700"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </form>
            )}

            <div className="text-center text-sm mt-4">
              <button
                className="text-violet-600 hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordPopup
          isOpen={isForgotPassword}
          onClose={() => setIsForgotPassword(false)}
        />
      </>
    )
  );
};

export default LoginPopup;
