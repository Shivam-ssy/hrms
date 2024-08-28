import React, { useState } from 'react';
import { db } from '../BackendAsService/Config';
import { collection, addDoc } from 'firebase/firestore';

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'leaveRequests'), {
        ...formData,
        status: 'Pending',
        createdAt: new Date()
      });
      alert('Leave request submitted successfully');
    } catch (error) {
      console.error('Error submitting leave request: ', error);
    }
  };

  return (
<>
   <h1 className='text-center text-4xl my-10 text-gray-500'>Leave Request Form</h1>
<form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
  <div className="mb-4">
    <input
      name="employeeName"
      value={formData.employeeName}
      onChange={handleChange}
      placeholder="Employee Name"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="mb-4">
    <select
      name="leaveType"
      value={formData.leaveType}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        Select Leave Type
      </option>
      <option value="Sick">Sick Leave</option>
      <option value="Vacation">Vacation Leave</option>
      <option value="Other">Other</option>
    </select>
  </div>
  <div className="mb-4">
    <input
      name="startDate"
      type="date"
      value={formData.startDate}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="mb-4">
    <input
      name="endDate"
      type="date"
      value={formData.endDate}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="mb-4">
    <textarea
      name="reason"
      value={formData.reason}
      onChange={handleChange}
      placeholder="Reason for Leave"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="4"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Submit
  </button>
</form>
</>

  );
};

export default LeaveRequestForm;