import React, { useState } from "react";
import api from "../services/api";

function ApplicationForm({ isOpen, onClose, fetchApplications }) {
  const initialFormData = { 
    fullName: "", 
    email: "", 
    phone: "",
    company: "", 
    role: "", 
    status: "Applied", 
    link: "" 
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/applications", formData);
      setFormData(initialFormData);
      fetchApplications();
      onClose(); // Close after submit
    } catch (error) {
      // Check ------------------duplicate error-------------
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error("Error adding application:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/30 bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/*============== Modal Header========= */}
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Job Application</h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-full p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/*==================== Modal Body============= */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              {/* =======Full Name======== */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Your Full Name"
                />
              </div>

              {/*========= Email =========*/}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="sharshit416@gmail.com"
                />
              </div>

              {/*======= Phone======== */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="7677672641"
                />
              </div>

              {/* Company s-------------- */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Company Name"
                />
              </div>

              {/* Roles--------------  */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Job Role"
                />
              </div>

              {/* Status-------------- */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="p-2 border rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* s-------------- */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-1">Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="p-2 border rounded w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Application Link"
                />
              </div>
            </div>

            {/* s-------------- buttons */}
            <div className="flex justify-end gap-2 mt-6 border-t pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm"
              >
                Add Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;