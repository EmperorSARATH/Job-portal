
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import SearchBar from "../dashboard/searchBar";
import Sidebar from "../dashboard/sidebar";
import JobPostForm from "./JobPostForm";
import { apiClient } from "@/lib/apiClient";
import { redirect } from "next/navigation";
import "./page.css";
export interface SkillDTO {
    objectId: string;
    name: string;
}

interface CardData {
    objectId: string;
    title: string;
    description: string;
    skills: [];
    taskSize: string
}


interface FormData {
    title: string;
    description: string;
    skills: { objectId: string; name: string }[];
    taskSize: string;
}


interface PaginatedResponse {
    content: CardData[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

const green = "#4CAF50";   // soft green
const yellow = "#FFC107";  // amber yellow
const red = "#F44336";     // material red

const colors = {
    SMALL: green,
    MID: yellow,
    LARGE: red,
};

type Job = {
    objectId: string;
    title: string;
    description: string;
    taskSize: "SMALL" | "MID" | "LARGE";
    skills: Map<string, string>;
};




export default function Dashboard() {
    const user = useSelector((state: RootState) => state.user.user);
    const [data, setData] = useState<CardData[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [objectId, setObjectId] = useState("");

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const [formMode, setFormMode] = useState("create");

    const fetchData = async () => {
        try {
            const response = await apiClient("http://localhost:8080/list/jobPostCard");
            const result: PaginatedResponse = await response.json();
            setData(result.content);
            console.log(result.content, "values")
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    const handleFormSubmit = async (formData: FormData, mode: string, objectId?: string) => {
        try {
            if (mode === "create") {
                const skillsList = Array.from(formData.skills.entries()).map(([objectId, name]) => ({
                    objectId,
                    name
                }));
                const req = {
                    description: formData.description,
                    title: formData.title,
                    objectId: objectId,
                    skills: skillsList,
                    taskSize: formData.taskSize
                };
                const response = await apiClient("http://localhost:8080/create/jobPostCard", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(req),
                });
                if (!response.ok) throw new Error("Failed to create job post card");

                const newData = await response.json();
                setData((prev) => [...prev, newData]); // Update UI with the new card
                setShowForm(false); // Hide form after submission
                fetchData();

            } else if (mode === "edit") {
                const skillsList = formData.skills.map(skill => ({
                    objectId: skill.objectId,
                    name: skill.name
                }))

                console.log("skillList", skillsList);


                const req = {
                    description: formData.description,
                    title: formData.title,
                    objectId: objectId,
                    skills: skillsList
                };

                const response = await apiClient("http://localhost:8080/edit/jobPostCard", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(req),
                });
                if (!response.ok) throw new Error("Failed to create job post card");

                const newData = await response.json();
                setData((prev) => [...prev, newData]); // Update UI with the new card
                setShowForm(false); // Hide form after submission
                fetchData();
            }
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

    // useEffect(() => {
    //     if (!user) {
    //         // Wait for 2 seconds and then redirect to the login page
    //         setTimeout(() => {
    //             redirect("/EmployerLogin");
    //         }, 1000);
    //     }
    // }, [user]); // This effect will run when `user` changes.


    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            setTimeout(() => {
                redirect("/EmployerLogin");
            }, 1000);
        }
    }, []);


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
            <div className=" outer-container rounded-lg p-4 m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((item) => (
                    <div
                        key={item.objectId}
                        className="relative bg-blue-500 text-white flex flex-col items-center justify-center rounded-lg shadow-lg p-4"
                    >

                        <button className="absolute top-2 left-2 rounded-full">
                            <div
                                className="w-4 h-4"
                                style={{ backgroundColor: colors[item.taskSize] }}
                            ></div>
                        </button>

                        {/* Close Button */}
                        <button
                            //  onClick={() => handleClose(item.id)} // Define handleClose function to remove item
                            className="absolute top-2 right-2 text-white  rounded-full  hover:bg-red-600"
                            onClick={() => {
                                isDeleted(item.objectId)
                            }
                            }

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6 7.5l.867 12.06A2.25 2.25 0 009.11 21h5.78a2.25 2.25 0 002.243-1.44L18 7.5M4.5 7.5h15M10 11v6m4-6v6m-7.5-9V5.25A2.25 2.25 0 019.75 3h4.5A2.25 2.25 0 0116.5 5.25V7.5" />
                            </svg>
                        </button>

                        <button
                            //  onClick={() => handleClose(item.id)} // Define handleClose function to remove item
                            className="absolute bottom-2 right-2 text-white  rounded-full  hover:bg-blue-600"
                            onClick={() => {
                                setSelectedJob(item);
                                setFormMode("edit");
                                setShowForm(true);
                                setObjectId(item.objectId);
                            }}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.688 1.687a1.5 1.5 0 010 2.122l-8.5 8.5-3.373.843.842-3.374 8.5-8.5a1.5 1.5 0 012.121 0z" />
                            </svg>

                        </button>

                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
                    </div>
                ))}
                {/* Plus Button appearing after the last card */}
                <button
                    onClick={() => {
                        setShowForm(true);
                        setFormMode("create");
                    }}

                    className="top-button"
                >
                    +
                </button>
            </div>
            {/* Render Form when 'showForm' is true */}
            {showForm && <JobPostForm mode={formMode} objectId={objectId} job={selectedJob} onClose={() => setShowForm(false)} onSubmit={handleFormSubmit} />}

        </div>
    );
}

