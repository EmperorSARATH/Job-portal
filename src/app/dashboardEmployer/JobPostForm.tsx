

import { apiClient } from "@/lib/apiClient";
import { useState, useEffect } from "react";



interface FormData {
    title: string;
    description: string;
    skills: { objectId: string; name: string }[];
    taskSize: string;
}


interface Skill {
    id: string;
    name: string;
    category: string;
}


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


const JobPostForm: React.FC<JobPostFormProps> = ({ mode,objectId, job, onClose, onSubmit }) => {
    // component body


    console.log(job);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        taskSize: "" as Job["taskSize"] | "",
        skills: [] as { objectId: string; name: string }[]
    });





    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log("changing:", e.target.name, "=", e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [suggestions, setSuggestions] = useState<Skill[]>([]);
    const [skillInput, setSkillInput] = useState('');

    useEffect(() => {
        if (!skillInput.trim()) {
            setSuggestions([]);
            return;
        }

        // Debounce: wait 300ms after user stops typing
        const handler = setTimeout(async () => {
            try {
                const res = await apiClient(
                    `http://localhost:8080/search?query=${skillInput}`
                );
                const data = await res.json();
                setSuggestions(data);
                setSkillInput(data.name());
            } catch (err) {
                console.error(err);
            }
        }, 300);


        // Cleanup if user types again within 300ms
        return () => clearTimeout(handler);
    }, [skillInput]);



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


    const handleAddSkill = (skill: Skill) => {
        if (!skill) return;

        setFormData(prev => {
            // prevent duplicates
            const exists = prev.skills.some(s => s.id === skill.id);
            if (exists) return prev;

            return {
                ...prev,
                skills: [...prev.skills, { id: skill.id, name: skill.name }]
            };
        });

        setSkillInput(""); // clear input
    };




    const handleRemoveSkill = (skillId: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.objectId !== skillId)
        }));
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h2 className="text-xl font-bold mb-4 text-black">{mode == "create" ? "Create Job Post" : "Edit Job Post"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block font-medium text-black mb-1">Task Size</label>
                    <div className="flex gap-4 mb-4">
                        {["SMALL", "MID", "LARGE"].map((size) => (
                            <label key={size} className="flex items-center gap-2 text-black">
                                <input
                                    type="radio"
                                    name="taskSize"
                                    value={size}                        // ✅ use the individual value
                                    checked={formData.taskSize === size} // ✅ keeps it in sync
                                    onChange={handleChange}
                                    className="accent-blue-600"
                                    required
                                />
                                {size.charAt(0).toUpperCase() + size.slice(1)}
                            </label>
                        ))}

                    </div>
                    <div className="w-full">
                        <label className="block font-medium text-black">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-black rounded text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-black">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-black rounded text-black"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium text-black">Skills</label>
                        <div className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                className="flex-1 p-2 border border-black rounded text-black"
                                placeholder="Enter skill and press Add"
                            />
                            {/* Always render UL (empty if no suggestions) */}
                            <ul className="border border-gray-300 rounded mt-1 bg-white shadow w-64 h-40 overflow-y-auto">
                                {Array.isArray(suggestions) && suggestions.length > 0 ? (
                                    suggestions.map((skill: Skill) => (
                                        <li
                                            key={skill.id}
                                            className="p-2 hover:bg-blue-300 cursor-pointer text-black"
                                            onClick={() => handleAddSkill(skill)}
                                        >
                                            {skill.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 text-gray-500 italic">No suggestions found</li>
                                )}

                            </ul>
                            {/*
               <button
                type="button"
                onClick={()=>handleAddSkill()}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
              */}

                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.skills.map(({ objectId, name }) => (
                                <span
                                    key={objectId}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center space-x-1"
                                >
                                    <span>{name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(objectId)}
                                        className="text-red-500 font-bold ml-1"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobPostForm;

