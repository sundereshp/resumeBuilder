import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tips = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Tips for Writing Job Descriptions</h2>
      
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Use Action Verbs</h3>
          <p className="text-gray-600">Start your bullet points with strong action verbs like:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>Developed, Implemented, Created</li>
            <li>Managed, Led, Coordinated</li>
            <li>Analyzed, Evaluated, Researched</li>
            <li>Improved, Increased, Reduced</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Quantify Achievements</h3>
          <p className="text-gray-600">Include numbers and metrics whenever possible:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>Increased sales by 25%</li>
            <li>Managed a team of 10 developers</li>
            <li>Reduced costs by $50,000 annually</li>
            <li>Completed projects 15% ahead of schedule</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Focus on Results</h3>
          <p className="text-gray-600">Emphasize outcomes and impact:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>What problems did you solve?</li>
            <li>What improvements did you make?</li>
            <li>What goals did you achieve?</li>
            <li>How did your work benefit the company?</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Keep it Relevant</h3>
          <p className="text-gray-600">Tips for content selection:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>Focus on achievements relevant to your target role</li>
            <li>Highlight transferable skills</li>
            <li>Include industry-specific keywords</li>
            <li>Be concise but descriptive</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/experience/askjobtitle')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={() => navigate('/experience/jobdetails')}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Tips;
