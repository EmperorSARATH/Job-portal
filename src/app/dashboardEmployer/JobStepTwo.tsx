import React from "react";

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
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 space-y-5">
        <h2 className="text-xl font-bold text-black">Additional Details</h2>

        {/* GitHub Link */}
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

        {/* How to Contribute */}
        <div>
          <label className="block font-medium text-black mb-1">
            How to contribute
          </label>
          <textarea
            name="contributionGuide"
            value={formData.contributionGuide || ""}
            onChange={handleChange}
            placeholder="Explain how contributors should get started..."
            className="w-full p-3 border border-black rounded text-black h-32 resize-none"
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
            placeholder="e.g. $100 / ₹5000"
            className="flex-1 p-2 border border-black rounded text-black"
          />
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

