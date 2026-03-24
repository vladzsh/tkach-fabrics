'use client';

import { ComponentPropsWithoutRef } from 'react';
import styles from './Input.module.css';

type InputProps = {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  error,
  textarea,
  className,
  ...rest
}: InputProps) {
  const inputClasses = [
    styles.input,
    textarea ? styles.textarea : undefined,
    error ? styles.errorInput : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && ' *'}
        </label>
      )}
      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
          {...(rest as ComponentPropsWithoutRef<'textarea'>)}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
          {...rest}
        />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
