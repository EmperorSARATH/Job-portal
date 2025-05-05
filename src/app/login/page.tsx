"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/userSlice";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function LoginPage() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  useEffect(() => {
    const handlePopState = () => {
      router.replace("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  },);

  const handleSubmit = async (e: React.FormEvent) => {





    e.preventDefault(); // Prevent the default form submission behavior
    setError(""); // Clear any previous error
    // Construct the login payload
    const userType = "EMPLOYEE";
    const payload = {
      email,
      password,
      userType
    };





    try {
      // Send the request to the server
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success == true) {
          alert("login success")
          dispatch(setUser(data.object.user)); // Set user in Redux store
          Cookies.set('JWT', data.object.accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
          localStorage.setItem('accessToken', data.object.accessToken);
          router.push("/dashboard"); // Navigate to dashboard
        } else {
          alert("Login failed")
        }

      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login as Employee</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border text-black rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              className="w-full px-4 py-2 mt-1 text-black text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don&#39;t have an account?{" "}
          <Link href="/Registration/EmployeeReg" className="text-blue-600 hover:underline">
            Sign up
          </Link>


        </p>
      </div>
    </div>
  );
}

