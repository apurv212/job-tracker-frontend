import React, { useState, useEffect } from 'react';
import api from '../services/api';

function StatusDashboard({ filter, setFilter }) {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);

  // To fetch status counts-----------------------------------------------------------------------
  const fetchStatusCount = async () => {
    setLoading(true);
    try {
      const response = await api.get('/applications/status-count');
      setCounts(response.data);
    } catch (error) {
      console.error("Error fetching status counts:", error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchStatusCount();
  }, []);


  const totalCount = Object.values(counts).reduce((sum, current) => sum + current, 0);

  // Status color=====================================
  const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Interview: "bg-purple-100 text-purple-800",
    Offer: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800"
  };

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* ================Status count section =========================*/}
          <div className="mb-6 md:mb-0 md:mr-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Applications Overview</h2>
              <button
                onClick={fetchStatusCount}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm flex items-center"
                disabled={loading}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(counts).map(([status, count]) => (
                <div 
                  key={status} 
                  className={`${filter === status ? 'ring-2 ring-blue-500' : ''} cursor-pointer p-3 rounded-lg flex flex-col items-center ${statusColors[status] || "bg-gray-100"}`}
                  onClick={() => setFilter(status === filter ? "" : status)}
                >
                  <span className="text-2xl font-bold">{count}</span>
                  <span className="text-sm">{status}</span>
                </div>
              ))}
              <div 
                className={`${filter === "" ? 'ring-2 ring-blue-500' : ''} cursor-pointer p-3 rounded-lg flex flex-col items-center bg-gray-100`}
                onClick={() => setFilter("")}
              >
                <span className="text-2xl font-bold">{totalCount}</span>
                <span className="text-sm">All</span>
              </div>
            </div>
          </div>
          
          {/* Filter functionality */}
          <div className="bg-gray-50 p-4 rounded-lg md:w-64">
            <label className="block text-gray-700 font-semibold mb-2">Filter by Status</label>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="p-2 border rounded w-full bg-white"
            >
              <option value="">All Applications</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusDashboard;