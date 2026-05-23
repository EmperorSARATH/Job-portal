"use client";

import { useEffect, useState } from "react";

import { config } from '@/lib/config';

import type { User } from '../../../store/type';
import { apiClient } from "@/lib/apiClient";

type ApplicationStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "INTERVIEW"
  | "REJECTED"
  | "OFFER";

interface AppliedJob {
  jobId: string;
  title: string;
 // company: string;
//  location: string;
  appliedOn: string;
  status: ApplicationStatus;
}

const mockAppliedJobs: AppliedJob[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore, India",
    appliedDate: "2026-05-01",
    status: "INTERVIEW",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Amazon",
    location: "Hyderabad, India",
    appliedDate: "2026-04-28",
    status: "UNDER_REVIEW",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Microsoft",
    location: "Remote",
    appliedDate: "2026-04-20",
    status: "REJECTED",
  },
];

export default function AppliedJobsPage({user}:{user:User}) {
  const [jobs, setJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with API call
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);

        // Example:
        // const response = await apiClient.get("/applications");
        // setJobs(response.data);

        const response = await apiClient(`${config.apiBaseUrl}/api/jobs/applied`);

        const data = (await response.json()) as AppliedJob[];

        console.log("applied jobs : ",data)
        setJobs(data);
        setLoading(false);

        //
        // setTimeout(() => {
        //   setJobs(mockAppliedJobs);
        //   setLoading(false);
        // }, 200);
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  // This will log every single time the 'jobs' state actually changes
useEffect(() => {
  console.log("Jobs state has updated successfully:", jobs);
}, [jobs]);

  const getStatusStyles = (status: ApplicationStatus) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700";

      case "UNDER_REVIEW":
        return "bg-yellow-100 text-yellow-700";

      case "INTERVIEW":
        return "bg-purple-100 text-purple-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "OFFER":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Applied Jobs
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Track and manage all your job applications
        </p>
      </div>

      {/* Top Actions */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search applied jobs..."
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none transition focus:border-black md:max-w-sm"
        />

        <div className="flex gap-3">
          <select className="rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none">
            <option>All Status</option>
            <option>Applied</option>
            <option>Under Review</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          <select className="rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center rounded-2xl bg-white py-20 shadow-sm">
          <p className="text-gray-500">Loading applied jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            No Applications Yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Start applying to jobs and track them here.
          </p>

          <button className="mt-6 rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90">
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.jobId}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Left */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h2>

                  {/* <p className="mt-1 text-sm text-gray-600"> */}
                  {/*   {job.company} • {job.location} */}
                  {/* </p> */}

                  <p className="mt-3 text-sm text-gray-500">
                    Applied on{" "}
                    {new Date(job.appliedOn).toLocaleDateString()}
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                      job.status
                    )}`}
                  >
                    {job.status.replace("_", " ")}
                  </span>

                  <div className="flex gap-2">
                    <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                      View Details
                    </button>

                    <button className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
