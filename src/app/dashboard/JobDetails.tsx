"use client"

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import DirectChat from './DirectChat';

import { JobDetail } from "@/types/job";

import { config } from '@/lib/config';


import './JobDetails.css';
import { apiClient } from "@/lib/apiClient";

export default function JobDetails() {
    const selectedJob = useSelector((state: RootState) => state.job.selectedJob);

    const [chatClicked, setChatClicked] = useState(false);

    const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);



    useEffect(() => {
        if (!selectedJob) return;

        const fetchJobDetail = async () => {
            const response = await apiClient(`${config.apiBaseUrl}/api/jobs/${selectedJob.objectId}`);
            const result = await response.json();
            setJobDetail(result);
        };

        fetchJobDetail();
    }, [selectedJob]);



    if (!selectedJob) {
        return <p>No job selected.</p>;
    }



    const applyJob = async () => {

        try {
            if (jobDetail?.applied) return;

            const jobId = selectedJob.objectId;

            const response = await apiClient(`${config.apiBaseUrl}/api/jobs/${jobId}/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to apply for job");
            }

            const result = await response.text();

            console.log("Server response:", result);
            setJobDetail(prev => prev ? { ...prev, applied: true } : prev);

            alert("Application submitted successfully!");

        } catch (error) {
            console.error("Error applying for job:", error);
            alert("Something went wrong while applying.");
        }
    };



    return (
        <div className="p-4 rounded-xl bg-white shadow-md w-full">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4 text-gray-800"> {jobDetail?.title}</h2>
                <button onClick={() => setChatClicked(prev => !prev)}
                    className="flex-row items-center gap-2 text-black">
                    💬 Chat
                    <p>PostedBy : {selectedJob.userName}</p>

                </button>


            </div>

            {
                chatClicked && (
                    <div>
                        <DirectChat />
                    </div>
                )
            }


            <div className="space-y-2 text-sm sm:text-base text-gray-700">
                <p>
                    <span className="font-semibold">Company:</span> TechSpark Inc.
                </p>

                <p>Task size : {selectedJob.taskSize}</p>
                <p>
                    <span className="font-semibold">Location:</span> Remote / Bangalore
                </p>
                <p>
                    <span className="font-semibold">Salary:</span> ₹10 - ₹15 LPA
                </p>
                <p>
                    <span className="font-semibold">Experience:</span> 2+ years
                </p>
                <div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <p>Skills Required: </p>
                        {selectedJob?.skills.map((skill) => (
                            <span key={skill.objectId} className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="mt-4 text-gray-600">
                    {selectedJob?.description}
                </p>

                {/* {jobDetail?.applied} */}
                {/* <button */}
                {/*     onClick={applyJob} */}
                {/*     className="apply-btn">Apply */}
                {/* </button> */}
                <button
                    onClick={applyJob}
                    disabled={jobDetail?.applied}
                    className={` ${jobDetail?.applied ? "apply-btn-inactive" : "apply-btn"
                        }`}
                >
                    {jobDetail?.applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    );
}

