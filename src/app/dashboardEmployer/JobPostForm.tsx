

import { apiClient } from "@/lib/apiClient";
import { useState, useEffect } from "react";


interface FormData {
    title: string;
    description: string;
    skills: Map<number, string>;
}

interface Skill {
    id: number;
    name: string;
    category: string;
}


interface JobPostFormProps {
    mode: string;
    objectId?: string;
    onClose: () => void;
    onSubmit: (data: FormData, mode: string, objectId?: string) => void;
}


const JobPostForm: React.FC<JobPostFormProps> = ({ mode, objectId, onClose, onSubmit }) => {
    // component body



    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        skills: new Map(),
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData, mode, objectId);
        setFormData({
            title: "",
            description: "",
            skills: new Map(),
        });
        // Reset form after submit
    };


    const handleAddSkill = (skill: Skill) => {
        if (!skill) return;

        setFormData((prev) => {
            const newSkills = new Map(prev.skills);

            // Only add if not already in the map
            if (!newSkills.has(skill.id)) {
                newSkills.set(skill.id, skill.name);
            }

            return { ...prev, skills: newSkills };
        });

        setSkillInput(''); // clear input
    };


    const handleRemoveSkill = (skillId: number) => {
        setFormData((prev) => {
            const newSkills = new Map(prev.skills); // create a copy
            newSkills.delete(skillId); // remove by id
            return { ...prev, skills: newSkills };
        });
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-100">
                <h2 className="text-xl font-bold mb-4 text-black">{mode == "create" ? "Create Job Post" : "Edit Job Post"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
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
                            {Array.from(formData.skills.entries()).map(([id, name]) => (
                                <span
                                    key={id}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center space-x-1"
                                >
                                    <span>{name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(id)}
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

