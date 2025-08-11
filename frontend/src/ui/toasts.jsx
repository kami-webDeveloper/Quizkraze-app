import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

export function showSuccess(message) {
  toast.success(message, {
    icon: <CheckCircleIcon className="w-5 h-5 text-green-600" />,
  });
}

export function showError(message) {
  toast.error(message, {
    icon: <ExclamationCircleIcon className="w-5 h-5 text-red-600" />,
  });
}

export function showInfo(message) {
  toast.info(message, {
    icon: <InformationCircleIcon className="w-5 h-5 text-blue-600" />,
  });
}
