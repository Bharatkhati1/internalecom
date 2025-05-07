import React, { useState } from "react";
import axios from "axios";
import { postloginData } from "../../Services/loginApiServices";

const SignUpForm = ({ onSignUp, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await postloginData("/auth/register", {
                name,
                email,
                password,
            });
            if (response.status === 201) {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                onSignUp(); // Any additional signup handling
                onClose(); // Close modal after successful signup
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Try again.");
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white dark:bg-gray-50 dark:text-gray-800">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="space-y-1 text-sm">
                    <label htmlFor="name" className="block text-gray-600">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1 text-sm">
                    <label htmlFor="email" className="block text-gray-600">Email</label>
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
                    <label htmlFor="password" className="block text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1 text-sm">
                    <label htmlFor="confirm-password" className="block text-gray-600">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="block w-full p-3 text-center rounded-sm text-white bg-violet-600 hover:bg-violet-700"
                    onClick={handleSignUp}
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
