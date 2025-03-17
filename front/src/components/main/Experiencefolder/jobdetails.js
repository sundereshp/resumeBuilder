import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    location: '',
    start_date: '',
    end_date: '',
    current: false,
    description: '',
    responsibilities: '',
    achievements: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/experience', formData, {
        withCredentials: true
      });
      
      if (response.status === 201) {
        navigate('/experience/summary');
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Job Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Job Title *</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Company Name *</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              disabled={formData.current}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="current"
            checked={formData.current}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label>I currently work here</label>
        </div>

        <div>
          <label className="block mb-1">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Key Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border rounded"
            placeholder="List your main responsibilities..."
          />
        </div>

        <div>
          <label className="block mb-1">Key Achievements</label>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border rounded"
            placeholder="List your notable achievements..."
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate('/experience/askjobtitle')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobDetails;
