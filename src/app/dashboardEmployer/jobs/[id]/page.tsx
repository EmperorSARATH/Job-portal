"use client";

import { apiClient } from "@/lib/apiClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { config } from "@/lib/config";

const applicants = [
    {
        objectId: "1",
        username: "Arjun",
        email: "arjun@gmail.com",
        phone: "+91 9876543210",
        status: "Pending",
    },
    {
        objectId: "2",
        username: "Rahul",
        email: "rahul@gmail.com",
        phone: "+91 9123456780",
        status: "Pending",
    },
    {
        objectId: "3",
        username: "Nikhil",
        email: "nikhil@gmail.com",
        phone: "+91 9988776655",
        status: "Shortlisted",
    },
];


interface JobDetails {
    title: string;
    postedBy: string;
    description: string;
    applied: boolean;
    skills: string[];
    numberOfApplicants: number;
}

export default function JobDetailPage() {

    const params = useParams();

    const jobId = params.id;


    const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const res = await apiClient(
                    `${config.apiBaseUrl}/api/jobs/${jobId}`
                );

               const response : JobDetails = await res.json();  


                setJobDetails(response);
            } catch (err) {
                setError("Failed to load job details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!jobDetails) {
        return <div>No job found</div>;
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* TOP HEADER */}
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* LEFT */}
                    <div>

                        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-100">
                            Job Detail
                        </p>

                        <h1 className="text-4xl font-bold">
                            Senior Frontend Developer
                        </h1>

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100">
                            Looking for an experienced React / Next.js developer
                            who can build scalable frontend systems and work
                            closely with backend teams.
                        </p>

                        {/* TAGS */}
                        <div className="mt-5 flex flex-wrap gap-2">

                            {jobDetails.skills.map(
                                (skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full bg-white/20 px-4 py-1 text-sm"
                                    >
                                        {skill}
                                    </span>
                                )
                            )}

                        </div>

                    </div>

                    {/* RIGHT STATS */}
                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                            <p className="text-sm text-blue-100">
                                Applications
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {jobDetails?.numberOfApplicants}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                            <p className="text-sm text-blue-100">
                                Status
                            </p>

                            <h2 className="mt-2 text-xl font-bold">
                                Active
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* JOB INFO */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* LEFT */}
                <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-sm">

                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Job Information
                            </h2>

                            <p className="text-sm text-gray-500">
                                Detailed information about this position
                            </p>
                        </div>

                        {/* <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"> */}
                        {/*     Edit Job */}
                        {/* </button> */}

                    </div>

                    {/* DETAILS */}
                    <div className="space-y-5">

                        <div className="rounded-2xl bg-gray-50 p-5">

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Experience
                            </p>

                            <p className="mt-2 text-gray-800">
                                3+ Years
                            </p>

                        </div>

                        <div className="rounded-2xl bg-gray-50 p-5">

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Salary
                            </p>

                            <p className="mt-2 text-gray-800">
                                ₹12 LPA - ₹18 LPA
                            </p>

                        </div>

                        <div className="rounded-2xl bg-gray-50 p-5">

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Location
                            </p>

                            <p className="mt-2 text-gray-800">
                                Remote / Kochi
                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDEBAR */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold text-gray-900">
                        Quick Actions
                    </h2>

                    <div className="mt-5 space-y-3">

                        <button className="w-full rounded-2xl bg-green-500 px-4 py-3 font-medium text-white transition hover:bg-green-600">
                            View Analytics
                        </button>

                        <button className="w-full rounded-2xl bg-yellow-500 px-4 py-3 font-medium text-white transition hover:bg-yellow-600">
                            Pause Hiring
                        </button>

                        <button className="w-full rounded-2xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600">
                            Delete Job
                        </button>

                    </div>

                    {/* JOB ID */}
                    <div className="mt-6 rounded-2xl bg-gray-50 p-4">

                        <p className="text-xs uppercase tracking-wide text-gray-400">
                            Job ID
                        </p>

                        <p className="mt-2 break-all text-sm font-medium text-gray-700">
                            {jobId}
                        </p>

                    </div>

                </div>

            </div>

            {/* APPLICANTS */}
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">

                {/* HEADER */}
                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">
                            Applicants
                        </h2>

                        <p className="text-sm text-gray-500">
                            Review and manage candidate applications
                        </p>

                    </div>

                    <button className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                        View All
                    </button>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {applicants.map((applicant) => (
                        <div
                            key={applicant.objectId}
                            className="rounded-3xl border border-gray-200 bg-gray-50 p-5 transition hover:shadow-md"
                        >

                            {/* TOP */}
                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                                    {applicant.username.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        {applicant.username}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {applicant.status}
                                    </p>
                                </div>

                            </div>

                            {/* DETAILS */}
                            <div className="mt-5 space-y-3 text-sm">

                                <div className="rounded-xl bg-white p-3">
                                    <p className="text-xs uppercase text-gray-400">
                                        Email
                                    </p>

                                    <p className="mt-1 text-gray-700">
                                        {applicant.email}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-3">
                                    <p className="text-xs uppercase text-gray-400">
                                        Contact
                                    </p>

                                    <p className="mt-1 text-gray-700">
                                        {applicant.phone}
                                    </p>
                                </div>

                            </div>

                            {/* ACTIONS */}
                            <div className="mt-5 flex gap-3">

                                <button className="flex-1 rounded-xl bg-green-500 px-4 py-3 font-medium text-white transition hover:bg-green-600">
                                    Accept
                                </button>

                                <button className="flex-1 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600">
                                    Reject
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}
