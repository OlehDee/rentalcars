import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({
  children,
  to,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  style = {},
}) {
  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.button} ${styles[variant]}`}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${
        disabled ? styles.disabled : ''
      }`}
      style={style}
    >
      {children}
    </button>
  );
}
