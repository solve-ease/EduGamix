import React, { forwardRef } from 'react';

 const Textarea = forwardRef(({ 
  className = '', 
  disabled = false, 
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={`flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={disabled}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;