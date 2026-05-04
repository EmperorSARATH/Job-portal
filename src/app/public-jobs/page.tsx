"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "../store/jobSlice";
import { AppDispatch, RootState } from "../store/store";
import { fetchJobSearch } from "../store/jobSearch";
import { useRouter } from "next/navigation";

interface JobsListProps {
    filter: string | null;
}

const PublicJobList = ({ filter }: JobsListProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const jobs = useSelector((state: RootState) => state.jobSearch.list);

    //      const jobs = [
    //   {
    //     objectId: "1",
    //     title: "Frontend Developer",
    //     company: "Tech Corp",
    //     city: "Kochi",
    //     location: "Remote",
    //     skills: [
    //       { objectId: "s1", name: "React" },
    //       { objectId: "s2", name: "Tailwind" },
    //     ],
    //   },
    //   {
    //     objectId: "2",
    //     title: "Backend Engineer",
    //     company: "Startup Inc",
    //     city: "Bangalore",
    //     location: "Onsite",
    //     skills: [
    //       { objectId: "s3", name: "Java" },
    //       { objectId: "s4", name: "Spring Boot" },
    //     ],
    //   },
    // ];


    useEffect(() => {
        dispatch(fetchJobSearch(filter || null));
    }, [filter]);

    const handleCardClick = (job) => {
        dispatch(setSelectedJob(job));
    };

    const handleApplyClick = (e) => {
        e.stopPropagation(); // prevent card click
        router.push("/login"); // redirect to login
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-4">
            {/* Optional heading */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Find your next opportunity
            </h2>

            <div className="space-y-4 max-h-[75vh] overflow-y-auto">
                {jobs.map((job) => (
                    <div
                        key={job.objectId}
                        onClick={() => handleCardClick(job)}
                        className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer"
                    >
                        {/* Top Section */}
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                                    {job.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {job.company || "Company"} • {job.city}
                                </p>
                            </div>

                            <span className="text-sm text-gray-500">
                                {job.location || "Remote"}
                            </span>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill) => (
                                <span
                                    key={skill.objectId}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                                Sign in to view more details
                            </span>

                            <button
                                onClick={handleApplyClick}
                                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Login to Apply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PublicJobList;
