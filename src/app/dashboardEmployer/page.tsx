
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import SearchBar from "../dashboard/searchBar";
import Sidebar from "../dashboard/sidebar";
import JobPostForm from "./JobPostForm";
import { apiClient } from "@/lib/apiClient";
import { redirect } from "next/navigation";

export interface SkillDTO {
  objectId: string;
  name: string;
}

interface CardData {
  objectId: string;
  title: string;
  description: string;
}

interface PaginatedResponse {
  content: CardData[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  const [data, setData] = useState<CardData[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const response = await apiClient("http://localhost:8080/list/jobPostCard"); // Replace with actual API URL
      const result: PaginatedResponse = await response.json();
      setData(result.content);
      console.log(result.content,"values")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);



  const handleFormSubmit = async (formData: CardData) => {
    try {
      const response = await apiClient("http://localhost:8080/create/jobPostCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create job post card");

      const newData = await response.json();
      setData((prev) => [...prev, newData]); // Update UI with the new card
      setShowForm(false); // Hide form after submission
      fetchData();
    } catch (error) {
      console.error("Error creating job post:", error);
    }
  };

const isDeleted = async (id: string) => {
  try {
    const response = await apiClient(`http://localhost:8080/delete/jobPostCard/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error("Failed to delete JobPostcard");
    fetchData(); 

    
  } catch (error) {
    console.error("Error deleting", error);
  }
};

useEffect(() => {
    if (!user) {
      // Wait for 2 seconds and then redirect to the login page
      setTimeout(() => {
        redirect("/login");
      }, 100);
    }
  }, [user]); // This effect will run when `user` changes.

  if (!user) {
    return <p>Loading...</p>;
  }


  return (
    <div className="mt-4 space-y-4">
      {/* First Row: Search Bar & Sidebar */}
      <div className="flex items-center justify-between space-x-4">
        <SearchBar />
        <div className="relative z-50">
        <Sidebar name={user.username} type="/EmployerLogin" />
        </div>
      </div>

      {/* Grid of Dynamic Cards */}
      <div className="rounded-lg p-4 m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <div
            key={item.objectId}
            className="relative bg-blue-500 text-white flex flex-col items-center justify-center rounded-lg shadow-lg p-4"
          >
            {/* Close Button */}
            <button
              //  onClick={() => handleClose(item.id)} // Define handleClose function to remove item
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
              onClick={()=>{
                  isDeleted(item.objectId)}
              }
             
            >
              ✖
            </button>

            <button
              //  onClick={() => handleClose(item.id)} // Define handleClose function to remove item
              className="absolute bottom-2 right-2 text-white bg-orange-500 rounded-full p-1 hover:bg-orange-600"
            onClick={() => setShowForm(true)}
             
            >
              ^
            </button>

            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
        {/* Plus Button appearing after the last card */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-center"
          style={{ width: "20%", height: "20%" }} // Makes it match card size
        >
          +
        </button>
      </div>
      {/* Render Form when 'showForm' is true */}
      {showForm && <JobPostForm onClose={() => setShowForm(false)} onSubmit={handleFormSubmit} />}

    </div>
  );
}

