import PropTypes from 'prop-types';

const ViewModal = ({ data, viewClose }) => {
  // Handle missing or invalid data gracefully
  if (!data || typeof data !== 'object') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold">Error</h2>
          <p>Unable to display details.</p>
          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded" onClick={viewClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold">Employee Details</h2>
        <div className="mt-4">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Role:</strong> {data.role}</p>
          <p><strong>Number:</strong> {data.number}</p>
          <p><strong>Date:</strong> {data.date}</p>
          {/* Add more fields as necessary */}
        </div>
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded" onClick={viewClose}>
          Close
        </button>
      </div>
    </div>
  );
};

ViewModal.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    number: PropTypes.string,
    date: PropTypes.string,
    // Add more fields as necessary
  }),
  viewClose: PropTypes.func.isRequired,
};

ViewModal.defaultProps = {
  data: null,
};

export default ViewModal;
