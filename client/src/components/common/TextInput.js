import React from 'react';
//import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextInput = ({
  name,
  labelText,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  step
}) => {
  return (
    <div className="form-row">
      {labelText && <label htmlFor={name}>{labelText}</label>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        step={step}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextInput.defaultProps = {
  type: 'text'
};

export default TextInput;