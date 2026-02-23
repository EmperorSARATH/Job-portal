
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import SearchBar from "../dashboard/searchBar";
import Sidebar from "../dashboard/sidebar";
import JobPostForm from "./JobPostForm";
import { apiClient } from "@/lib/apiClient";
import { redirect } from "next/navigation";
import "./page.css"//;
import { config } from '@/lib/config';

export interface SkillDTO {
    objectId: string;
    name: string;
}

interface CardData {
    objectId: string;
    title: string;
    description: string;
    skills: SkillDTO[];
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


    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchData = async (pageNumber: number) => {
        try {
            const response = await apiClient(`${config.apiBaseUrl}/list/jobPostCard?page=${pageNumber}&size=5`);
            const result: PaginatedResponse = await response.json();
            setData(result.content);
            setTotalPages(result.totalPages);
            console.log(result.content, "values")
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData(page);
    }, []);


    const handleFormSubmit = async (formData: FormData, mode: string, objectId?: string) => {
        try {
            if (mode === "create") {
                const skillsList = formData.skills.map(skill => ({
                    objectId: skill.objectId,
                    name: skill.name
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
                fetchData(page);
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
                    skills: skillsList,
                    taskSize: formData.taskSize
                };

                const response = await apiClient("http://localhost:8080/edit/jobPostCard", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(req),
                });
                if (!response.ok) throw new Error("Failed to create job post card");

                const newData = await response.json();
                fetchData(page);
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
        <div className="bg-[#FFFFFF] min-h-screen mt-1 space-y-4">
            <div className="flex w-full items-center px-4">
                {/* Left */}
                <div className="flex-1">
                    <SearchBar />
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Chat */}
                    <button className=" fixed top-4 right-20 flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 hover:bg-gray-100 active:scale-95 transition">
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            1
                        </span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.4-4 8-9 8a9.7 9.7 0 01-4-.8L3 20l1.2-3.6A7.6 7.6 0 013 12c0-4.4 4-8 9-8s9 3.6 9 8z"
                            />
                        </svg>

                        <span className="text-black">Chat</span>
                    </button>

                </div>

                {/* Sidebar */}
                <div className="relative z-50">
                    <Sidebar name={user.username} type="/EmployerLogin" />
                </div>

            </div>

            {/* Grid of Dynamic Cards */}
            <div className=" outer-container rounded-lg p-4 m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((item) => (
                    <div
                        key={item.objectId}
                        className="relative bg-blue-500 text-white flex flex-col items-center justify-center rounded-lg shadow-lg p-4 min-h-[260px]"
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
                                className="w-5 h-5">
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
                                className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.688 1.687a1.5 1.5 0 010 2.122l-8.5 8.5-3.373.843.842-3.374 8.5-8.5a1.5 1.5 0 012.121 0z" />
                            </svg>

                        </button>




                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
                        {/* <p className="absolute bottom-0 pt-7 ">Amount offered : </p> */}


                        <div className="mt-auto flex flex-wrap gap-2 justify-center">
                            {item.skills?.map((skill) => (
                                <span
                                    key={skill.objectId}
                                    className="px-3 py-1 text-xs bg-white/20 rounded-full"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>

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

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8 space-x-2">

                {/* Previous Button */}
                <button
                    disabled={page === 0}
                    onClick={() => setPage((prev) => prev - 1)}
                    className={`px-4 py-2 rounded-lg border transition
            ${page === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 text-gray-700"
                        }`}
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index)}
                        className={`px-4 py-2 rounded-lg border transition
              ${index === page
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white hover:bg-blue-50 text-gray-700"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className={`px-4 py-2 rounded-lg border transition
            ${page + 1 >= totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 text-gray-700"
                        }`}
                >
                    Next
                </button>

            </div>


        </div >
    );
}

