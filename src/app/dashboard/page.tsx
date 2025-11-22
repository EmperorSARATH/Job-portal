
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

    <div className="mt-4  space-y-4">
      {/* First Row: Search Bar & Sidebar */}
      <div className="flex items-center justify-between w-full">
        {/* Left group: Search + Filter */}
        <div className="ml-4 mb-10 flex items-center space-x-4">
          <SearchBar />
          <FilterDropdown onFilterChange={setSelectedFilter} />
        </div>

        {/* Right: Sidebar */}
        <Sidebar name={user?.username} />
      </div>

      {/* Second Row: Two Columns with Vertical Line */}
      <div className="grid grid-cols-2 gap-4">
        <div className="ml-8 pr-4  border-r-2 border-red-500">
          {/* Component left*/}
          <JobsList filter = {selectedFilter} />
        </div>
        <div className="pl-4">
          {/* Component right*/}
          <JobDetails />
        </div>
      </div>
    </div>
  );
}
