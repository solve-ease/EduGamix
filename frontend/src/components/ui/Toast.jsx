import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Create toast context
const ToastContext = createContext(null);

// Toast variants
const TOAST_VARIANTS = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-800',
    iconClass: 'text-green-500'
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 border-red-200 text-red-800',
    iconClass: 'text-red-500'
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    iconClass: 'text-yellow-500'
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
    iconClass: 'text-blue-500'
  },
  default: {
    icon: Info,
    className: 'bg-slate-50 border-slate-200 text-slate-800',
    iconClass: 'text-slate-500'
  }
};

// Toast item component
const ToastItem = ({ id, title, description, variant = 'default', onClose, autoClose = true }) => {
  const toastConfig = TOAST_VARIANTS[variant] || TOAST_VARIANTS.default;
  const Icon = toastConfig.icon;
  
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose(id);
      }, 5000); // Auto close after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, id, onClose]);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className={`flex items-start p-4 mb-3 max-w-md border rounded-lg shadow-md ${toastConfig.className}`}
    >
      <div className={`flex-shrink-0 mr-3 ${toastConfig.iconClass}`}>
        <Icon size={20} />
      </div>
      
      <div className="flex-grow">
        {title && <div className="font-semibold mb-1">{title}</div>}
        {description && <div className="text-sm">{description}</div>}
      </div>
      
      <button 
        onClick={() => onClose(id)} 
        className="flex-shrink-0 ml-3 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  // Add new toast
  const addToast = ({ title, description, variant = 'default', autoClose = true }) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, description, variant, autoClose }]);
    return id;
  };
  
  // Remove toast by id
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // Shorthand methods for different toast types
  const toast = {
    success: (props) => addToast({ ...props, variant: 'success' }),
    error: (props) => addToast({ ...props, variant: 'error' }),
    warning: (props) => addToast({ ...props, variant: 'warning' }),
    info: (props) => addToast({ ...props, variant: 'info' }),
    default: addToast
  };
  
  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      <div className="fixed top-4 right-4 z-50">
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastItem
              key={toast.id}
              {...toast}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Default export for simpler imports
export const toast = {
  success: ({ title, description }) => {
    console.warn('Toast used outside provider. Please wrap your app with ToastProvider');
    alert(`✅ ${title}: ${description}`);
  },
  error: ({ title, description }) => {
    console.warn('Toast used outside provider. Please wrap your app with ToastProvider');
    alert(`❌ ${title}: ${description}`);
  },
  warning: ({ title, description }) => {
    console.warn('Toast used outside provider. Please wrap your app with ToastProvider');
    alert(`⚠️ ${title}: ${description}`);
  },
  info: ({ title, description }) => {
    console.warn('Toast used outside provider. Please wrap your app with ToastProvider');
    alert(`ℹ️ ${title}: ${description}`);
  },
  default: ({ title, description }) => {
    console.warn('Toast used outside provider. Please wrap your app with ToastProvider');
    alert(`${title}: ${description}`);
  }
};

export default toast;