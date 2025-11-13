import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

function ConfirmDialog({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-[70] animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto animate-slide-up sm:animate-scale-in">
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div
              className={`${
                danger ? "bg-red-100" : "bg-amber-100"
              } w-16 h-16 rounded-full flex items-center justify-center`}
            >
              <AlertTriangle
                className={danger ? "text-red-500" : "text-amber-500"}
                size={32}
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center mb-3">
            {title}
          </h2>

          {/* Message */}
          <p className="text-slate-600 text-center mb-6 leading-relaxed">
            {message}
          </p>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-6 py-3 text-white rounded-xl font-medium transition-opacity ${
                danger
                  ? "bg-red-500 hover:opacity-90"
                  : "bg-blue-500 hover:opacity-90"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
