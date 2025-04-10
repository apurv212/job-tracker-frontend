import React, { useState, useEffect } from "react";
import Applications from "../components/Applications";
import StatusDashboard from "../components/StatusDashboard";
import ApplicationModal from "../components/ApplicationForm";
import api from "../services/api";

function Home() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all applications--------------------------------------------------------------
  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filtering by status----------------------------------------------------------------------------
  const filteredApplications = filter
    ? applications.filter(app => app.status === filter)
    : applications;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Student Job Tracker</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-50 transition font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Application
          </button>
        </div>
      </div>
      
      <StatusDashboard filter={filter} setFilter={setFilter} />
      <Applications applications={filteredApplications} fetchApplications={fetchApplications} />
      
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        fetchApplications={fetchApplications} 
      />
    </div>
  );
}

export default Home;