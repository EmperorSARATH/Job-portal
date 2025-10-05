"use client";

import { apiClient } from "@/lib/apiClient";
import { useState, useEffect } from "react";

const JobPostForm = ({ mode, objectId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ title: "", description: "", skills: [] });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [suggestions, setSuggestions] = useState([]);
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
      } catch (err) {
        console.error(err);
      }
    }, 300);

    // Cleanup if user types again within 300ms
    return () => clearTimeout(handler);
  }, [skillInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, mode, objectId);
    setFormData({ title: "", description: "", skills: [] }); // Reset form after submit
  };


  const handleAddSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
    setSkillInput(''); // clear the input after selection
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100">
        <h2 className="text-xl font-bold mb-4 text-black">Create Job Post</h2>
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
                {suggestions.map((skill) => (
                  <li
                    key={skill.id}
                    className="p-2 hover:bg-blue-300 cursor-pointer text-black"
                    onClick={() => handleAddSkill(skill.name)}
                  >
                    {skill.name}
                  </li>
                ))}
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
              {formData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
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

