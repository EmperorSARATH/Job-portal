
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Sidebar from "./sidebar/sidebar";
import SearchBar from "./searchBar";
import JobsList from './JobsList';
import { useEffect, useState } from "react";
import JobDetails from "./JobDetails";
import { useRouter } from "next/navigation";
import FilterDropdown from "./FilterDropdown";
import EmployeeDashboardSidebar from "./sidebar/EmployeeDashboardSidebar";
import AppliedJobsPage from "./sidebar/appliedJobs/page";

export default function Dashboard() {
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const [activeSection, setActiveSection] = useState("jobs");

    useEffect(() => {
        // Simulate async check or wait for Redux rehydration
        if (user === undefined) {
            // Still loading (e.g., initial Redux state)
            return;
        }



        if (!user && !localStorage.getItem("accessToken")) {
            // Auth check done, user not found, redirect
            router.replace('/login');
        } else {
            // User is present, no redirect
            setCheckingAuth(false);
        }
    }, [user, router]);

    if (checkingAuth) {
        return <p>Loading...</p>; // Or a spinner
    }

    return (

        <div className="min-h-screen bg-gray-50 p-4">

            {/* HEADER */}
            <div className="sticky top-0 z-10 bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 mb-4">
                <div className="flex items-center justify-between">

                    {/* Left: Search + Filter */}
                    <div className="flex items-center gap-4">
                        <SearchBar />
                        <FilterDropdown onFilterChange={setSelectedFilter} />
                    </div>

                    {/* Right: Chat + Profile */}
                    <div className="flex items-center gap-4">

                        {/* Chat Button */}
                        <button className="relative flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-100 transition mr-4">

                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                1
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
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

                            <span className="font-medium">Chat</span>
                        </button>

                        {/* Profile */}
                        <Sidebar name={user?.username} />
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-[260px_1fr_1fr] gap-4">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sticky top-24 flex flex-col justify-between h-full overflow-y-auto">
                    < EmployeeDashboardSidebar
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        user={user}
                    />
                </div>

                {/* LEFT PANEL */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-[calc(100vh-120px)] overflow-hidden ">

                    {activeSection === "appliedJobs" && (
                        <AppliedJobsPage/>
                    )}

                    {activeSection === "jobs" && (

                        <JobsList filter={selectedFilter} />
                    )}
                </div>

                {/* RIGHT PANEL */}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    {activeSection === "jobs" && (
                        <JobDetails />
                    )}
                    </div>

                </div>
            </div>
            );
}
