
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import SearchBar from "../dashboard/searchBar";
import Sidebar from "../dashboard/sidebar/sidebar";
import JobPostForm from "./JobPostForm";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
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
    taskSize: string;
    applications: number;
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
    const [totalElements, setTotalElements] = useState<number>(0);

    const router = useRouter();



    const analytics = [
        {
            title: "Total Posts",
            value: totalElements,
            emoji: "💼",
        },
        {
            title: "Current Page",
            value: page + 1,
            emoji: "📄",
        },
        {
            title: "Applications",
            value: data.reduce((acc, job) => acc + job.applications, 0),
            emoji: "📄",
        },
        {
            title: "Total Pages",
            value: totalPages,
            emoji: "📊",
        },
    ];



    const fetchData = async (pageNumber: number) => {
        try {
            const response = await apiClient(`${config.apiBaseUrl}/list/jobPostCard?page=${pageNumber}&size=5`);
            const result: PaginatedResponse = await response.json();
            setData(result.content);
            setTotalPages(result.totalPages);
            setTotalElements(result.totalElements);
            console.log(result.content, "values")
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData(page);
    }, [page]);


    const cardDetailClick = async (jobId : string) => {

        console.log("clicked !!!!!!!");


        router.push(`/dashboardEmployer/jobs/${jobId}`);

    }

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
            fetchData(page);


        } catch (error) {
            console.error("Error deleting", error);
        }
    };

    const purchase = async () => {
        try {
            const response = await apiClient(
                `${config.apiBaseUrl}/api/payments/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );

            if (!response.ok) {
                throw new Error("Failed to get payment checkout url");
            }

            const checkoutUrl = await response.text();
            // const data = await response.json();

            console.log("checkout res = ", checkoutUrl);

            // Open checkout in new tab
            window.open(checkoutUrl, "_blank");

        } catch (error) {
            console.error(error);
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
        <div className="min-h-screen bg-gray-100">
            <div className="flex">

                {/* LEFT SIDEBAR */}
                <aside className="sticky top-0 h-screen w-72 border-r border-gray-200 bg-white p-5">

                    {/* PROFILE */}
                    <div className="border-b border-gray-200 pb-5">
                        <div className="flex items-center gap-3">

                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                                {user.username?.charAt(0)?.toUpperCase()}
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-800">
                                    {user.username}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Employer Dashboard
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* NAVIGATION */}
                    <div className="mt-6 space-y-2">

                        <button className="w-full rounded-xl bg-black px-4 py-3 text-left text-white transition hover:opacity-90">
                            📊 Dashboard
                        </button>

                        <button className="w-full rounded-xl px-4 py-3 text-left text-gray-700 transition hover:bg-gray-100">
                            💼 Job Posts
                        </button>

                        <button className="w-full rounded-xl px-4 py-3 text-left text-gray-700 transition hover:bg-gray-100">
                            📄 Applications
                        </button>

                        <button className="w-full rounded-xl px-4 py-3 text-left text-gray-700 transition hover:bg-gray-100">
                            💳 Billing
                        </button>

                    </div>

                    {/* BOTTOM */}
                    <div className="mt-10 border-t border-gray-200 pt-4 text-sm text-gray-400">
                        Manage your hiring platform
                    </div>

                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6">

                    {/* TOP BAR */}
                    <div className="mb-6 flex items-center justify-between">

                        {/* LEFT */}
                        <div className="flex items-center gap-4">
                            <SearchBar />

                            <button
                                className="rounded-xl bg-green-500 px-4 py-2 font-medium text-white transition hover:bg-green-600"
                                onClick={() => {
                                    purchase();
                                }}
                            >
                                Purchase
                            </button>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-4">

                            {/* CHAT */}
                            <button className="relative rounded-xl border border-gray-300 bg-white px-4 py-2 transition hover:bg-gray-50">

                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    1
                                </span>

                                💬 Chat
                            </button>

                            <div className="relative z-50">
                                <Sidebar
                                    name={user.username}
                                    type="/EmployerLogin"
                                />
                            </div>

                        </div>

                    </div>

                    {/* ANALYTICS */}
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                        {analytics.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {item.title}
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                            {item.value}
                                        </h2>
                                    </div>

                                    <div className="rounded-xl bg-gray-100 p-3 text-2xl">
                                        {item.emoji}
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* JOB POSTS SECTION */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        {/* HEADER */}
                        <div className="mb-5 flex items-center justify-between">

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Job Posts
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Manage all posted jobs
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowForm(true);
                                    setFormMode("create");
                                }}
                                className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                            >
                                + Create Job
                            </button>

                        </div>

                        {/* JOB GRID */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {data.map((item) => (
                                <div
                                    key={item.objectId}
                                    onClick={() => cardDetailClick(item.objectId)}
                                >
                                    <div className="relative flex min-h-[260px] flex-col items-center justify-center rounded-2xl bg-blue-500 p-4 text-white shadow-lg">

                                        {/* STATUS DOT */}
                                        <button className="absolute left-2 top-2 rounded-full">
                                            <div
                                                className="h-4 w-4 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        colors[item.taskSize],
                                                }}
                                            />
                                        </button>

                                        {/* DELETE */}
                                        <button
                                            className="absolute right-2 top-2 rounded-full text-white hover:bg-red-600"
                                            onClick={() => {
                                                isDeleted(item.objectId);
                                            }}
                                        >
                                            ✕
                                        </button>

                                        {/* EDIT */}
                                        <button
                                            className="absolute bottom-2 right-2 rounded-full text-white hover:bg-blue-600"
                                            onClick={() => {
                                                setSelectedJob(item);
                                                setFormMode("edit");
                                                setShowForm(true);
                                                setObjectId(item.objectId);
                                            }}
                                        >
                                            ✎
                                        </button>

                                        {/* TITLE */}
                                        <h3 className="text-lg font-bold">
                                            {item.title}
                                        </h3>

                                        {/* DESCRIPTION */}
                                        <p className="mt-2 text-center text-sm">
                                            {item.description}
                                        </p>

                                        {/* SKILLS */}
                                        <div className="mt-auto flex flex-wrap justify-center gap-2 pt-5">
                                            {item.skills?.map((skill) => (
                                                <span
                                                    key={skill.objectId}
                                                    className="rounded-full bg-white/20 px-3 py-1 text-xs"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>

                                        {/* APPLICATIONS */}
                                        <div className="mt-4 text-sm font-medium">
                                            {item.applications} Applications
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* PAGINATION */}
                    <div className="mt-8 flex items-center justify-center space-x-2">

                        {/* PREV */}
                        <button
                            disabled={page === 0}
                            onClick={() => setPage((prev) => prev - 1)}
                            className={`rounded-lg border px-4 py-2 transition
                        ${page === 0
                                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            Prev
                        </button>

                        {/* PAGE NUMBERS */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index)}
                                className={`rounded-lg border px-4 py-2 transition
                            ${index === page
                                        ? "border-blue-600 bg-blue-600 text-white shadow-md"
                                        : "bg-white text-gray-700 hover:bg-blue-50"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        {/* NEXT */}
                        <button
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                            className={`rounded-lg border px-4 py-2 transition
                        ${page + 1 >= totalPages
                                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            Next
                        </button>

                    </div>

                    {/* MODAL */}
                    {showForm && (
                        <JobPostForm
                            mode={formMode}
                            objectId={objectId}
                            job={selectedJob}
                            onClose={() => setShowForm(false)}
                            onSubmit={handleFormSubmit}
                        />
                    )}

                </main>

            </div>
        </div>
    );
}

