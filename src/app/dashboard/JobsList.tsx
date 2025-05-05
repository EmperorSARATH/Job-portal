"use client"

import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedJob } from "../store/jobSlice";


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


const JobsList = () => {

  const [job, setJobs] = useState<JobDTO[]>([]); useEffect(() => {


    const fetchJobs = async () => {
      try {
        const response = await apiClient('http://localhost:8080/list/jobs');
        const result = await response.json(); // parse JSON
        setJobs(result.content); // <-- set only the `content` array
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);


   const dispatch = useDispatch();

  const handleCardClick = (selectedJob: JobDTO) => {
      dispatch(setSelectedJob(selectedJob));
  };



  return (
    <div>
      <div className="h-[70vh] overflow-y-auto space-y-4">
        {job.map((job) => (
          <div
            key={job.objectId} // <-- use a unique id if available
             onClick={() => handleCardClick(job)}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
              <span className="text-sm text-blue-600">{job.location || "Bangalore"}</span>
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
