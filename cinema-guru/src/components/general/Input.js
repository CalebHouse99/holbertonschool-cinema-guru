import React from 'react';
import './general.css';

const Input = ({ label, type, className, value, setValue, icon, inputAttributes }) => {
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label>{label}</label>}
      <input type={type} value={value} onChange={handleInput} {...inputAttributes} />
      {icon}
    </div>
  );
};

export default Input;
