import React from 'react';
//import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextArea = ({
  name,
  labelText,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name}>{labelText}</label>
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextArea;
