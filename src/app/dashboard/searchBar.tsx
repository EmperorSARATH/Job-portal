"use client"
import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { config } from '@/lib/config';
import {fetchJobSearch, setJobs} from "../store/jobSearch";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

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
const SearchBar = () => {
    const [query, setQuery] = useState("");


    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        const fetchJobs = async () => {
            console.log("Es Search !!");
            let response = await apiClient(`${config.apiBaseUrl}/ESsearch?keyword='${query}'&page=0&size=10`);
            const res = await response.json();
            dispatch(setJobs(res));
        }
        if(query.length > 3){

        fetchJobs();
        }if(query.length === 0){
            dispatch(fetchJobSearch(null));
        }

    }, [query])


    return (
        <div className="flex justify-center w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-[30vw] p-3 text-lg text-black border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;

