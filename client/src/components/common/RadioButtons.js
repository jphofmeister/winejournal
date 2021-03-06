import React from 'react';
//import classnames from 'classnames';
import PropTypes from 'prop-types';

const RadioButtons = ({
  name,
  mainLabel,
  value,
  error,
  info,
  onChange,
  checked,
  disabled,
  options,
  divClass
}) => {

  const radioOptions = options.map((option, i) => (
    <span key={i}>
      <input
        type="radio"
        id={option.value}
        name={option.name}
        value={option.value}
        onChange={option.onChange}
        checked={option.checked}
        disabled={option.disabled}
      />
      <label key={i} htmlFor={option.value} onClick={option.onClick} className="radio-label">
        <img key={option.image} src={option.image} alt="" />
        {option.value}
      </label>
    </span>
  ));

  return (
    <div className={divClass}>

      {mainLabel && <label>{mainLabel}</label>}

      <div className="radio-buttons">
        {radioOptions}
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>

    </div>
  );
};

RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  mainLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default RadioButtons;