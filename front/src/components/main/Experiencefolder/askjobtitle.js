import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AskJobTitle = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobTitle.trim()) {
      navigate(`/experience/jobdescription/${encodeURIComponent(jobTitle)}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">What's your job title?</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">
            Enter your most recent or current job title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-3 border rounded-md"
            placeholder="e.g. Software Engineer"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/education')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Continue
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="font-semibold mb-4">Tips for Job Titles:</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Use your official job title as it appears on your employment records</li>
          <li>Avoid using abbreviations or internal company titles</li>
          <li>Be specific but concise (e.g., "Senior Software Engineer" instead of just "Engineer")</li>
          <li>Use standard industry titles when possible</li>
        </ul>
      </div>
    </div>
  );
};

export default AskJobTitle;
