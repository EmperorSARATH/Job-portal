

import { apiClient } from "@/lib/apiClient";
import { useState, useEffect } from "react";
import JobStepOne from './JobStepOne';
import JobStepTwo from './JobStepTwo';



// interface FormData {
//     title: string;
//     description: string;
//     skills: { objectId: string; name: string }[];
//     taskSize: string;
// }
//




type Job = {
    objectId: string;
    title: string;
    description: string;
    taskSize: "SMALL" | "MID" | "LARGE";
    skills: { objectId: string; name: string }[];
    // any other fields
};



interface JobPostFormProps {
    mode: string;
    job?: Job
    onClose: () => void;
    onSubmit: (data: FormData, mode: string, objectId?: string) => void;
}


const JobPostForm: React.FC<JobPostFormProps> = ({ mode, objectId, job, onClose, onSubmit }) => {
    // component body


    console.log(job);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        taskSize: "" as Job["taskSize"] | "",
        skills: [] as { objectId: string; name: string }[]
    });


    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(2);
    };





    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log("changing:", e.target.name, "=", e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    useEffect(() => {
        if (mode === "edit" && job) {
            const selectedSkills = Array.from(job.skills.entries()).map(
                ([id, name]) => ({
                    objectId: String(id), // ensure string
                    name: String(name)    // ensure string
                })
            );

            setFormData({
                title: job.title,
                description: job.description,
                taskSize: job.taskSize,
                skills: job.skills.map(skill => ({
                    objectId: skill.objectId,
                    name: skill.name
                }))
            });


        }
    }, [mode, job]);






    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData, mode, objectId);
        setFormData({
            title: "",
            description: "",
            skills: [] as { objectId: string; name: string }[],
            taskSize: ""
        });
        // Reset form after submit
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h2 className="text-xl font-bold mb-4 text-black">{mode == "create" ? "Create Job Post" : "Edit Job Post"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {step == 1 && (
                        <JobStepOne formData={formData} setFormData={setFormData} onNext={handleNext} onClose={onClose} />

                    )}

                    {step == 2 && (
                        <JobStepTwo
                            formData={formData}
                            setFormData={setFormData}
                            onBack={() => setStep(1)}
                            onSubmit={handleSubmit}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};

export default JobPostForm;

