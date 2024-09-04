
const InputBox = ({
  label,
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
  InputStyle='',
  ...rest
}) => {
  return (
    <div className={`flex px-2 border items-center border-black rounded-xl  py-1 bg-white ${className}`}>
      {/* {label && <label htmlFor={id || name}>{label}</label>} */}
      <div>
        <img className='h-8' src={rest.inputroleimage} alt="" />
      </div>
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
        {...rest} // This allows passing any other attribute to the input
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputBox;
