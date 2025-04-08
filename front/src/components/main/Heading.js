import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./heading.css";

const Heading = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    city: "",
    country: "",
    pincode: "",
    phone: "",
    email: "",
    linkedin: "",
    website: "",
    drivingLicence: "",
  });

  const [showFields, setShowFields] = useState({
    linkedin: false,
    website: false,
    drivingLicence: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Submitting form data:", formData);

      const response = await axios.post(
        "http://localhost:5000/heading",
        { section: "heading", data: formData },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Form submitted successfully!");
        alert("Form submitted successfully!");
        navigate("/dashboard/education/tips");
      } else {
        console.warn("Unexpected response:", response);
        setError("Unexpected error occurred!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        error.response?.data?.error ||
        "Error submitting form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add field dynamically when button is clicked
  const handleAddField = (fieldName) => {
    setShowFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  // ❌ Remove field when user clicks delete
  const handleRemoveField = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: "", // Clear the field value
    }));

    setShowFields((prev) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  // 🚩 Check if all fields are added to hide the "Add additional info" message
  const allFieldsAdded =
    showFields.linkedin && showFields.website && showFields.drivingLicence;

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
            <label className="form-label" htmlFor="firstName">
              First Name
            </label>
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
            <label className="form-label" htmlFor="surname">
              Surname
            </label>
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

        {/* Second Row: City + Country + Pincode */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="city">
              City
            </label>
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
                <label className="form-label" htmlFor="country">
                  Country
                </label>
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
                <label className="form-label" htmlFor="pincode">
                  Pin code
                </label>
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
            <label className="form-label" htmlFor="phone">
              Phone *
            </label>
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
            <label className="form-label" htmlFor="email">
              Email *
            </label>
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

        {/* 🚀 Additional Fields: Two-Column Layout */}
        <div>
          {/* 🚀 Additional Fields: Two-Column Layout (Same as First Name & Surname) */}
          {(showFields.linkedin || showFields.website || showFields.drivingLicence) && (
            <div className="form-row">
              {showFields.linkedin && (
                <div className="form-group">
                  <label className="form-label" htmlFor="linkedin">
                    LinkedIn
                  </label>
                  <div className="input-container">
                    <input
                      className="form-input with-delete"
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      placeholder="e.g. https://linkedin.com/in/saanvi"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleRemoveField("linkedin")}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              )}

              {showFields.website && (
                <div className="form-group">
                  <label className="form-label" htmlFor="website">
                    Website
                  </label>
                  <div className="input-container">
                    <input
                      className="form-input with-delete"
                      type="text"
                      id="website"
                      name="website"
                      placeholder="e.g. https://portfolio.com/saanvi"
                      value={formData.website}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleRemoveField("website")}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {showFields.drivingLicence && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="drivingLicence">
                  Driving License
                </label>
                <div className="input-container">
                  <input
                    className="form-input with-delete"
                    type="text"
                    id="drivingLicence"
                    name="drivingLicence"
                    placeholder="e.g. DL12345678"
                    value={formData.drivingLicence}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleRemoveField("drivingLicence")}
                  >
                    ❌
                  </button>
                </div>
              </div>

              {/* Add Empty Placeholder to Maintain Two-Column Layout */}
              <div className="form-group"></div>
            </div>
          )}

        </div>

        {/* 📚 Add Additional Information Section */}
        {!allFieldsAdded && (
          <div className="additional-info">
            <p className="additional-heading">
              Add additional information to your resume (optional)
            </p>
            <div className="additional-buttons">
              {!showFields.linkedin && (
                <button
                  type="button"
                  className="add-info-button"
                  onClick={() => handleAddField("linkedin")}
                >
                  LinkedIn +
                </button>
              )}
              {!showFields.website && (
                <button
                  type="button"
                  className="add-info-button"
                  onClick={() => handleAddField("website")}
                >
                  Website +
                </button>
              )}
              {!showFields.drivingLicence && (
                <button
                  type="button"
                  className="add-info-button"
                  onClick={() => handleAddField("drivingLicence")}
                >
                  Driving License + 
                </button>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {error && <div className="error-message">{error}</div>}

        <div className="button-container">
          <button type="submit" className="next-button" disabled={loading}>
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>

      {/* Custom styles */}
      <style jsx>{`
        .half-width {
          width: 48%;
        }

        .input-container {
          position: relative;
        }


        .delete-button {
          position: absolute;
          right: 5px;
          background: none;
          border: none;
          cursor: pointer;
          color: red;
          font-size: 16px;
        }

        .additional-info {
          margin-top: 20px;
        }

        .additional-heading {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .additional-buttons {
          display: flex;
          gap: 10px;
        }

        .add-info-button {
          padding: 10px 20px;
          border: 1px solid #ccc;
          border-radius: 20px;
          background-color: #f9f9f9;
          font-size: 14px;
          cursor: pointer;
          margin-right: 10px;
          transition: background-color 0.3s ease;
        }

        .add-info-button:hover {
          background-color: #e6e6e6;
        }
        .form-row{
          display: flex;
          
          gap: 20px;
          
        }
      `}</style>
    </div>
  );
};

export default Heading;
