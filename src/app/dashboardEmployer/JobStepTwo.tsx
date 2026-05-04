import React from "react";
import LocationSelect from "./LocationSelect";

interface JobStepTwoProps {
    formData: {
        githubLink?: string;
        contributionGuide?: string;
        amountOffered?: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    onBack: () => void;
    onSubmit: () => void;
}

const JobStepTwo: React.FC<JobStepTwoProps> = ({
    formData,
    setFormData,
    onBack,
    onSubmit,
}) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
       

<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
    <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 space-y-5 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-black">Additional Details</h2>

        {/* Project Type */}
        <div>
            <label className="block font-medium text-black mb-1">
                Project Type
            </label>
            <select
                name="projectType"
                value={formData.projectType || ""}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded text-black"
            >
                <option value="">Select</option>
                <option value="repo">Public Repository</option>
                <option value="private">Private Codebase</option>
                <option value="standalone">Standalone Problem</option>
            </select>
        </div>

        <LocationSelect formData={formData} setFormData={setFormData} />

        {/* GitHub Link (only if repo) */}
        {formData.projectType === "repo" && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-medium text-black sm:w-40">
                    GitHub Link
                </label>
                <input
                    type="text"
                    name="githubLink"
                    value={formData.githubLink || ""}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="flex-1 p-2 border border-black rounded text-black"
                />
            </div>
        )}

        {/* Additional Context */}
        {formData.projectType !== "repo" && (
            <div>
                <label className="block font-medium text-black mb-1">
                    Additional Context
                </label>
                <textarea
                    name="additionalContext"
                    value={formData.additionalContext || ""}
                    onChange={handleChange}
                    placeholder="Explain the system or problem context..."
                    className="w-full p-3 border border-black rounded text-black h-28 resize-none"
                />
            </div>
        )}

        {/* Expected Outcome */}
        <div>
            <label className="block font-medium text-black mb-1">
                Expected Outcome
            </label>
            <textarea
                name="expectedOutcome"
                value={formData.expectedOutcome || ""}
                onChange={handleChange}
                placeholder="What should the final result look like?"
                className="w-full p-3 border border-black rounded text-black h-24 resize-none"
            />
        </div>

        {/* Steps to Reproduce */}
        <div>
            <label className="block font-medium text-black mb-1">
                Steps to Reproduce (optional)
            </label>
            <textarea
                name="stepsToReproduce"
                value={formData.stepsToReproduce || ""}
                onChange={handleChange}
                placeholder="Step-by-step instructions to recreate the issue..."
                className="w-full p-3 border border-black rounded text-black h-24 resize-none"
            />
        </div>

        {/* Constraints */}
        <div>
            <label className="block font-medium text-black mb-1">
                Constraints / Notes (optional)
            </label>
            <textarea
                name="constraints"
                value={formData.constraints || ""}
                onChange={handleChange}
                placeholder="Any restrictions or requirements..."
                className="w-full p-3 border border-black rounded text-black h-24 resize-none"
            />
        </div>

        {/* How to Contribute */}
        <div>
            <label className="block font-medium text-black mb-1">
                How to Contribute
            </label>
            <textarea
                name="contributionGuide"
                value={formData.contributionGuide || ""}
                onChange={handleChange}
                placeholder="Explain how contributors should get started..."
                className="w-full p-3 border border-black rounded text-black h-24 resize-none"
            />
        </div>

        {/* Amount Offered */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="font-medium text-black sm:w-40">
                Amount Offered
            </label>
            <input
                type="text"
                name="amountOffered"
                value={formData.amountOffered || ""}
                onChange={handleChange}
                placeholder="e.g. ₹5000"
                className="flex-1 p-2 border border-black rounded text-black"
            />
        </div>

        {/* Delivery Time */}
        <div>
            <label className="block font-medium text-black mb-1">
                Delivery Time
            </label>
            <select
                name="deliveryTime"
                value={formData.deliveryTime || ""}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded text-black"
            >
                <option value="">Select</option>
                <option value="1_day">1 Day</option>
                <option value="3_days">3 Days</option>
                <option value="1_week">1 Week</option>
            </select>
        </div>

        {/* Experience Level */}
        <div>
            <label className="block font-medium text-black mb-1">
                Preferred Experience Level (optional)
            </label>
            <select
                name="experienceLevel"
                value={formData.experienceLevel || ""}
                onChange={handleChange}
                className="w-full p-2 border border-black rounded text-black"
            >
                <option value="">Select</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
            </select>
        </div>

        {/* Urgent Toggle */}
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                name="isUrgent"
                checked={formData.isUrgent || false}
                onChange={(e) =>
                    setFormData({ ...formData, isUrgent: e.target.checked })
                }
            />
            <label className="text-black font-medium">Mark as Urgent</label>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
            <button
                type="button"
                onClick={onBack}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
                Back
            </button>

            <button
                type="button"
                onClick={onSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
                Submit
            </button>
        </div>
    </div>
</div>


  );
};

export default JobStepTwo;

