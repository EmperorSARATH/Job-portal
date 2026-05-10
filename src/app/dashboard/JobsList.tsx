"use client"


import { apiClient } from "@/lib/apiClient";
import { useEffect, useRef, useState } from "react";
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
const initialState = {
    list: [],
    page: 0,
    hasNext: true,
    loading: false
};

const JobsList = ({ filter }: JobsListProps) => {

    const dispatch = useDispatch<AppDispatch>();
    //   const jobs = useSelector((state: RootState) => state.jobSearch.list);

    const { list, page, hasNext, loading } = useSelector(
        (state: RootState) => state.jobSearch
    );


    const scrollRef = useRef<HTMLDivElement | null>(null);
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
                //                dispatch(fetchJobSearch(filter || null));
                //              dispatch(fetchJobSearch({ keyword: "", page: 0, size: 10 }));
                dispatch(fetchJobSearch({
                    keyword: filter || "",
                    page: 0,
                    size: 6
                }));

            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            }
        };

        fetchJobs();
    }, [filter]);


    useEffect(() => {

        const handleScroll = () => {

            if (!scrollRef.current) return;

            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = scrollRef.current;

            const bottomReached =
                scrollTop + clientHeight >= scrollHeight - 100;

            if (bottomReached && hasNext && !loading) {

                dispatch(fetchJobSearch({
                    keyword: filter || "",
                    page: page + 1,
                    size: 6
                }));

            }
        };

        const currentRef = scrollRef.current;

        if (currentRef) {
            currentRef.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
            }
        };

    }, [page, hasNext, loading, filter]);



    const handleCardClick = (selectedJob: JobDTO) => {
        console.log("anamika is learning !!!!!", selectedJob);
        dispatch(setSelectedJob(selectedJob));
    };



    return (
        <div className="h-full">
            <div
            ref={scrollRef} 
            className="h-full overflow-y-auto space-y-4"
            >
                {list.map((job) => (
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

