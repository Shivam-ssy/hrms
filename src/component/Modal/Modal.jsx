import React from 'react'
import './Modal.css'
import { db } from '../../BackendAsService/Config.js';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

const Modal = ({onClose,isOpen}) => {

  if (!isOpen) return null;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    date: '',
    number: '',
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
      const data =await addDoc(collection(db, 'employees'), formData);
      alert('Data submitted successfully!');
      onClick(onClose);
      setFormData({
        name: '',
        email: '',
        role: '',
        date: '',
        number: '',
      });
      console.log("data after the addition : ", data);
      
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    onClose();
  };
  return (
  
    <>
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close-btn" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit} className='modal-form'>
      <div className='modal-div'>
        <label className='modal-label'>
          <h1 className='modal-h1'>Name:</h1>
          <input
            className='modal-input'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <h1 className='modal-h1'>Email:</h1>
          <input
            className='modal-input'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <h1 className='modal-h1'>Role:</h1>
          <input
            className='modal-input'
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <h1 className='modal-h1'>Date:</h1>
          <input
            className='modal-input'
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <h1 className='modal-h1'>Number:</h1>
          <input
            className='modal-input'
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button className='modal_button' type="submit">Submit</button>
    </form>
      </div>
    </div>
    </>
  )
}

export default Modal




  // <>
    // {isOpen && (
    //   <>
    //   <div className='modal_box'>
    //     <span onClick={onClose} style={{cursor:pointer}}>close</span>
    //   </div> 
    //   <div className='blur'/>
    //   </>
    // )}
    // </>