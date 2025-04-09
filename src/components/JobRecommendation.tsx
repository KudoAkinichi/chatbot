import React, { useState } from "react";
import { jobDatabase, identifyDisabilityType } from "@/data/jobData";

const JobRecommendation = () => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const identified = identifyDisabilityType(input);
    setCategory(identified);
  };

  const jobInfo = category ? jobDatabase[category] : null;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Job Recommendations Based on Accessibility
      </h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="disability" className="block text-gray-700 font-medium mb-2">
          Enter your disability type:
        </label>
        <input
          id="disability"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., hearing, mobility, vision, autism, etc."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Recommendations
        </button>
      </form>

      {/* Result */}
      {jobInfo ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Recommended Jobs:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {jobInfo.jobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Recommended Skills:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {jobInfo.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Resume Tips:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {jobInfo.resumeTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Motivation:</h3>
            <ul className="list-disc list-inside text-green-700 font-medium">
              {jobInfo.motivation.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        category !== null && (
          <p className="text-red-500 font-semibold">
            Sorry, we could not find matching job data.
          </p>
        )
      )}
    </div>
  );
};

export default JobRecommendation;
