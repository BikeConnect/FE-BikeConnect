const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 
      ${type === "success" ? "bg-green-500" : "bg-red-500"} 
      text-white transform transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center">
        <div className="mr-2">{type === "success" ? "✓" : "✕"}</div>
        <div>{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
