import React, { useState } from "react";
import api from "../services/api";

function Applications({ applications, fetchApplications }) {
  // This state object will track editing
  // Using application._id as keys
  const [editingStates, setEditingStates] = useState({});
  const [statusValues, setStatusValues] = useState({});

  // Initialize status values if they don't exist
  React.useEffect(() => {
    const newStatusValues = { ...statusValues };
    applications.forEach(app => {
      if (!newStatusValues[app._id]) {
        newStatusValues[app._id] = app.status;
      }
    });
    setStatusValues(newStatusValues);
  }, [applications]);

  const startEditing = (appId) => {
    setEditingStates(prev => ({ ...prev, [appId]: true }));
  };

  const cancelEditing = (appId) => {
    setEditingStates(prev => ({ ...prev, [appId]: false }));
    // Reset to original status
    const app = applications.find(a => a._id === appId);
    if (app) {
      setStatusValues(prev => ({ ...prev, [appId]: app.status }));
    }
  };

  const handleStatusChange = (appId, value) => {
    setStatusValues(prev => ({ ...prev, [appId]: value }));
  };

  const updateStatus = async (appId) => {
    try {
      await api.put(`/applications/${appId}`, { 
        status: statusValues[appId] 
      });
      setEditingStates(prev => ({ ...prev, [appId]: false }));
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteApplication = async (appId) => {
    try {
      await api.delete(`/applications/${appId}`);
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
      
      {/* Application list-------------------------- */}
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map(app => (
            <div key={app._id} className="bg-white shadow-md rounded px-6 py-4">
              <h3 className="text-xl font-bold">{app.company}</h3>
              <p className="text-gray-700">{app.role}</p>
              <p className="text-gray-600">Status: {app.status}</p>
              <p className="text-gray-600">Applied on: {new Date(app.date).toLocaleDateString()}</p>
              
              {app.link && (
                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Application
                </a>
              )}
              
              <div className="mt-4 flex gap-2">
                {editingStates[app._id] ? (
                  <>
                    <select
                      value={statusValues[app._id]}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className="p-1 border"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => updateStatus(app._id)}
                      className="bg-green-500 text-white py-1 px-3 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => cancelEditing(app._id)}
                      className="bg-gray-300 text-black py-1 px-3 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(app._id)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded"
                    >
                      Edit Status
                    </button>
                    <button
                      onClick={() => deleteApplication(app._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;