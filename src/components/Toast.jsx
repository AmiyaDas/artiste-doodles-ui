import { useEffect } from 'react';
import { IoCheckmarkCircle, IoClose, IoInformationCircle, IoWarning } from 'react-icons/io5';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <IoCheckmarkCircle className="text-green-500 text-xl" />;
      case 'error':
        return <IoWarning className="text-red-500 text-xl" />;
      case 'info':
        return <IoInformationCircle className="text-blue-500 text-xl" />;
      default:
        return <IoCheckmarkCircle className="text-green-500 text-xl" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className={`fixed top-20 right-4 z-50 max-w-sm w-full ${getBgColor()} border rounded-lg shadow-lg p-4 transition-all duration-300 animate-slide-in`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <IoClose className="text-lg" />
        </button>
      </div>
      
      {/* Progress bar for auto-dismiss */}
      {duration > 0 && (
        <div className="mt-3 bg-gray-200 rounded-full h-1">
          <div 
            className="bg-green-500 h-1 rounded-full animate-progress"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;
