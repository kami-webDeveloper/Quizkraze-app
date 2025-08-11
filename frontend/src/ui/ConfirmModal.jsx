import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 text-gray-700 dark:text-gray-300">{message}</div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
