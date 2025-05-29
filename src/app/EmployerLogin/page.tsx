"use client"

import Link from "next/link";
import { useState } from "react";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";


export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(""); // Clear any previous error
    const userType = "EMPLOYER";
    // Construct the login payload
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
          localStorage.setItem('accessToken', data.object.accessToken);
          router.push("/dashboardEmployer"); // Navigate to dashboard
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
    <div className=" relative flex items-center justify-center min-h-screen bg-gray-100">
          {/* Back Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link
          href="/"
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
        >
          ← Back
        </Link>
        {/* OR use button and router.push if programmatic */}
        {/* <button
          onClick={() => router.push('/your-target-page')}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
        >
          ← Back
        </button> */}
      </div>


      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login as Employer</h2>
        <form className="space-y-4 " onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2 mt-1 text-black text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full px-4 py-2 mt-1 text-sm text-black border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
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
          Don't have an account?{" "}
          <Link href="/Registration/EmployerReg" className="text-blue-600 hover:underline">
            Sign up
          </Link>

        </p>
      </div>
    </div>
  );
}

