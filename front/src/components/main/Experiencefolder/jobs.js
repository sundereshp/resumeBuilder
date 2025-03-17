import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/experience', {
          withCredentials: true
        });
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleAddMore = () => {
    navigate('/experience/askjobtitle');
  };

  const handleContinue = () => {
    navigate('/skills');
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Work Experience</h2>
      
      {jobs.length === 0 ? (
        <p className="text-gray-600 mb-4">No work experience added yet.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <h3 className="font-semibold text-lg">{job.job_title}</h3>
              <p className="text-gray-600">{job.company_name}</p>
              <p className="text-gray-500 text-sm">
                {job.location && `${job.location} • `}
                {new Date(job.start_date).toLocaleDateString()} - 
                {job.current ? 'Present' : new Date(job.end_date).toLocaleDateString()}
              </p>
              {job.description && (
                <p className="mt-2 text-gray-700">{job.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={handleAddMore}
          className="px-4 py-2 bg-white border border-purple-600 text-purple-600 rounded hover:bg-purple-50"
        >
          Add More Experience
        </button>
        <button
          onClick={handleContinue}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Continue to Skills
        </button>
      </div>
    </div>
  );
};

export default Jobs;
