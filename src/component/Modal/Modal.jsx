import { useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { db } from '../../BackendAsService/Config.js';
import { collection, addDoc } from 'firebase/firestore';

const Modal = ({ onClose, isOpen }) => {
  // Ensure that the component renders but hides content conditionally
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    date: '',
    number: '',
  });

  const [error, setError] = useState(null);

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
      await addDoc(collection(db, 'employees'), formData);
      alert('Data submitted successfully!');
      onClose(); // Close the modal
      setFormData({
        name: '',
        email: '',
        role: '',
        date: '',
        number: '',
      });
      setError(null);
    } catch (error) {
      setError('Error adding document. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  if (!isOpen) return null; // Early return to hide the modal if not open

  return (
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
          {error && <p className="modal-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Modal;
