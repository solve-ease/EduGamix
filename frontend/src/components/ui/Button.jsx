import React from 'react';

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  disabled = false, 
  onClick, 
  type = 'button',
  ...props 
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Size classes
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 py-3 text-base'
  }[size] || 'h-10 px-4 py-2 text-sm';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    link: 'bg-transparent text-blue-600 underline-offset-4 hover:underline'
  }[variant] || 'bg-blue-600 text-white hover:bg-blue-700';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};