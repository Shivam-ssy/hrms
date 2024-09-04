import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../BackendAsService/Config';

const PerformanceReview = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "PerformanceReview"), formData);
      alert("Form submitted successfully!");
      setFormData({
        name: '',
        email: '',
        review: '',
        role: ''
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <>
      <h1 style={{ fontFamily: 'Arial, sans-serif', display: 'flex', padding: '20px', fontSize:'24px', justifyContent:'center' }}>
      Performance Review Form
      </h1>
      <form 
        onSubmit={handleSubmit} 
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          backgroundColor: '#fff',
          gap: '15px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontFamily: 'Arial, sans-serif' }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontFamily: 'Arial, sans-serif' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontFamily: 'Arial, sans-serif' }}>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontFamily: 'Arial, sans-serif' }}>Review</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
              resize: 'vertical', // Allows the textarea to be resized vertically
              minHeight: '100px' // Minimum height to make it initially larger
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: '#fff',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default PerformanceReview;
