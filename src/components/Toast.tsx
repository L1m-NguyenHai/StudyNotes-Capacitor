import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
  duration?: number;
}

function Toast({ type, message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    warning: <AlertCircle className="text-amber-500" size={24} />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-md mx-auto animate-slide-down`}
    >
      <div
        className={`${bgColors[type]} border-2 rounded-xl shadow-lg p-4 flex items-center gap-3`}
      >
        {icons[type]}
        <p className="flex-1 text-slate-800 font-medium text-sm">{message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close notification"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
