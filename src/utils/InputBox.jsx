import PropTypes from 'prop-types';

const InputBox = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  name,
  required = false,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  pattern,
  autoComplete = 'off',
  autoFocus = false,
  error = '',
  className = '',
  inputRoleImage = '', // Correct prop casing
  InputStyle = '',
  id,
  ...rest
}) => {
  return (
    <div className={`flex px-2 border items-center border-black rounded-xl py-1 bg-white ${className}`}>
      {inputRoleImage && (
        <div>
          <img className="h-8" src={inputRoleImage} alt="" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={`${InputStyle} h-10 rounded-xl ${error ? 'input-error' : ''}`}
        id={id}
        {...rest} // Pass additional props to the input
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

InputBox.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Can be a string or number
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
  inputRoleImage: PropTypes.string,
  InputStyle: PropTypes.string,
  id: PropTypes.string, // Added id to prop-types
};

InputBox.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
  disabled: false,
  readOnly: false,
  autoComplete: 'off',
  autoFocus: false,
  error: '',
  className: '',
  inputRoleImage: '',
  InputStyle: '',
};

export default InputBox;
