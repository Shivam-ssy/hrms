import React from 'react';

const ViewModal = ({ data,viewClose }) => {

  //maybe   if (!data) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold">Employee Details</h2>
        <div className="mt-4">
          {data ? (
            <>
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Role:</strong> {data.role}</p>
              <p><strong>Number:</strong> {data.number}</p>
              <p><strong>Date:</strong> {data.date}</p>
              {/* Add more fields as necessary */}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded" onClick={viewClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewModal;
