
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Sidebar from "./sidebar";
import SearchBar from "./searchBar";
import JobsList from './JobsList';
import { redirect } from "next/navigation";
import { useEffect } from "react";
import JobDetails from "./JobDetails";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (!user) {
      // Wait for 2 seconds and then redirect to the login page
      setTimeout(() => {
        redirect("/login");
      }, 100);
    }
  }, [user]); // This effect will run when `user` changes.


  useEffect(() => {
    console.log('After dispatch, user state:', user);
  }, [user]);

  if (!user) {
    // Wait for 2 seconds and then redirect to the home page
    return <p>Loading...</p>;
  }

  return (
    // <div className="mt-4">
    //   <SearchBar/>
    //   <Sidebar name = {user.username}/>
    // </div>

    <div className="mt-4 space-y-4">
      {/* First Row: Search Bar & Sidebar */}
      <div className="flex items-center justify-between space-x-4">
        <SearchBar />
        <Sidebar name={user.username} />
      </div>

      {/* Second Row: Two Columns with Vertical Line */}
      <div className="grid grid-cols-2 gap-4">
        <div className="pr-4  border-r-2 border-red-500">
          {/* Component left*/}
         <JobsList/> 
        </div>
        <div className="pl-4">
          {/* Component right*/}
          <JobDetails/>
        </div>
      </div>
    </div>
  );
}
