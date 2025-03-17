import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './heading.css';

const Heading = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    city: '',
    country: '',
    pincode: '',
    phone: '',
    email: '',
    linkedin: '',
    website: '',
    drivingLicence: ''
  });

  const [showFields, setShowFields] = useState({
    linkedin: false,
    website: false,
    drivingLicence: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        console.log("Submitting form data:", formData); // Debugging log

        const response = await axios.post(
            'http://localhost:5000/heading',
            { section: 'heading', data: formData }, // Ensure section is included
            {
                withCredentials: true, // Send cookies for session verification
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 201) {
            console.log("Form submitted successfully!");
            alert("Form submitted successfully!"); // Show success message
            navigate('/dashboard/education/tips');
        } else {
            console.warn("Unexpected response:", response);
            setError("Unexpected error occurred!");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        setError(error.response?.data?.error || "Error submitting form. Please try again.");
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="heading-container">
      <button onClick={handleBack} className="back-button">
        ← Back
      </button>

      <div className="form-header">
        <h2>What's the best way for employers to contact you?</h2>
        <p>We suggest including an email and phone number.</p>
        <p className="required-note">* indicates a required field</p>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        
        {/* First Row: First Name & Surname */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First Name</label>
            <input
              className="form-input"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="e.g. Saanvi"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="surname">Surname</label>
            <input
              className="form-input"
              type="text"
              id="surname"
              name="surname"
              placeholder="e.g. Patel"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Second Row: City (first column) + (Country + Pincode in the second column) */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="city">City</label>
            <input
              className="form-input"
              type="text"
              id="city"
              name="city"
              placeholder="e.g. New Delhi"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <div className="form-subrow">
              <div className="form-group">
                <label className="form-label" htmlFor="country">Country</label>
                <input
                  className="form-input"
                  type="text"
                  id="country"
                  name="country"
                  placeholder="e.g. India"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pincode">Pin code</label>
                <input
                  className="form-input"
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="e.g. 110034"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Third Row: Phone & Email */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone *</label>
            <input
              className="form-input"
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. +91 22 1234 5677"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email *</label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              placeholder="e.g. saanvi@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Submit and Optional Section */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="button-container">
          <div className="button-group">
            <button 
              type="button" 
              className="optional-button"
            >
              Optional: Personal Details
            </button>
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="next-button"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save & Continue'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Heading;
