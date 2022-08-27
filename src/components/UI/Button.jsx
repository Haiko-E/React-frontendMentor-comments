import React from 'react';
import './Buttons.scss';

const Button = ({ onClick, children, className, style, href }) => {
  return (
    <a onClick={onClick} style={style} className={`button ${className}`} href={href}>
      {children}
    </a>
  );
};

export default Button;
