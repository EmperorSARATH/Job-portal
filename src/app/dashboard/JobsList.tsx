"use client"


import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "../store/jobSlice";
import { AppDispatch, RootState } from "../store/store";
import { fetchJobSearch } from "../store/jobSearch";


export interface SkillDTO {
    objectId: string;
    name: string;
}

export interface JobDTO {
    objectId: string;
    title: string;
    description: string;
    skills: SkillDTO[];
    location: string;
    company: string;
    city: string;

}
interface JobsListProps {
    filter: string | null;
}

const JobsList = ({ filter }: JobsListProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const jobs = useSelector((state: RootState) => state.jobSearch.list);
    //
    // const [job, setJobs] = useState<JobDTO[]>([]); 


    useEffect(() => {


        const fetchJobs = async () => {
            try {
                // let response = null;
                // if(filter!=null){
                // response = await apiClient(`http://localhost:8080/list/jobs?filter=${encodeURIComponent(filter)}`);
                //
                // }else{
                // response = await apiClient('http://localhost:8080/list/jobs');
                //
                // }
                // const result = await response.json(); // parse JSON
                // setJobs(result.content); // <-- set only the `content` array
                //
                dispatch(fetchJobSearch(filter || null));
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            }
        };

        fetchJobs();
    }, [filter]);



    const handleCardClick = (selectedJob: JobDTO) => {
        console.log("anamika is learning !!!!!", selectedJob);
        dispatch(setSelectedJob(selectedJob));
    };



    return (
        <div>
            <div className="h-[70vh] overflow-y-auto space-y-4">
                {jobs.map((job) => (
                    <div
                        key={job.objectId} // <-- use a unique id if available
                        onClick={() => handleCardClick(job)}
                        className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                            <span className="flex flex-col text-sm text-blue-600">
                                {job.location || "Bangalore"}
                                {/**/}
                                {/* <button className="flex items-center gap-2 text-black"> */}
                                {/*     💬 Chat */}
                                {/* </button> */}

                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{job.company || "Sarath company"} • {job.city}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-white">
                            {job.skills.map((skill) => (
                                <span key={skill.objectId} className="bg-blue-500 px-2 py-1 rounded-full">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default JobsList;




// return(
//      <div>
//        <div className="h-[70vh] overflow-y-auto space-y-4">
//            {[...Array(10)].map((_, i) => (
//              <div
//                key={i}
//                className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
//              >
//                <div className="flex items-center justify-between mb-2">
//                  <h3 className="text-lg font-semibold text-gray-800">Frontend Developer</h3>
//                  <span className="text-sm text-blue-600">Remote</span>
//                </div>
//                <p className="text-sm text-gray-600 mb-2">TechCorp Inc. • Bengaluru, India</p>
//                <div className="flex flex-wrap gap-2 text-xs text-white">
//                  <span className="bg-blue-500 px-2 py-1 rounded-full">React</span>
//                  <span className="bg-green-500 px-2 py-1 rounded-full">Tailwind</span>
//                  <span className="bg-purple-500 px-2 py-1 rounded-full">TypeScript</span>
//                </div>
//              </div>
//            ))}
//          </div>
//    </div>
//  );
