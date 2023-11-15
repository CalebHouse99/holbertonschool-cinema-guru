import React from 'react';
import './general.css';

const Button = ({ label, className, onClick, icon }) => {
  return (
    <button className={className} onClick={onClick}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;