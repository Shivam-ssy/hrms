import PropTypes from 'prop-types';

function DashCard({ title, counting = 0 }) {
  return (
    <div className='flex px-2 flex-col outline rounded-xl outline-gray-500 w-56 h-32'>
      <div className='self-start text-lg font-bold'>{title}</div>
      <div className='text-3xl m-auto text-green-500'>{counting}</div>
    </div>
  );
}

DashCard.propTypes = {
  title: PropTypes.string.isRequired,
  counting: PropTypes.number,
};

export default DashCard;
