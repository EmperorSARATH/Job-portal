
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Sidebar from "./sidebar";
import SearchBar from "./searchBar";
import JobsList from './JobsList';
import { useEffect, useState } from "react";
import JobDetails from "./JobDetails";
import { useRouter } from "next/navigation";
import FilterDropdown from "./FilterDropdown";

export default function Dashboard() {
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

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
        // <div className="mt-4">
        //   <SearchBar/>
        //   <Sidebar name = {user.username}/>
        // </div>

        <div className="mt-4 min-h-screen space-y-4 bg-[#F9F9F9]">
            {/* First Row: Search Bar & Sidebar */}
            <div className="flex items-center justify-between w-full">
                {/* Left group: Search + Filter */}
                <div className="ml-4 mb-10 flex items-center space-x-4">
                    <SearchBar />
                    <FilterDropdown onFilterChange={setSelectedFilter} />
                </div>

                <button className="relative flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-black hover:bg-gray-100 active:scale-95 transition">
                    {/* Notification badge */}
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

                    <span>Chat</span>
                </button>        

                {/* Right: Sidebar */}
                <Sidebar name={user?.username} />
            </div>

            {/* Second Row: Two Columns with Vertical Line */}
            <div className="grid grid-cols-2 gap-4">
                <div className="ml-8 pr-4  border-r-2 border-red-500">
                    {/* Component left*/}
                    <JobsList filter={selectedFilter} />
                </div>
                <div className="pl-4">
                    {/* Component right*/}
                    <JobDetails />
                </div>
            </div>
        </div>
    );
}
