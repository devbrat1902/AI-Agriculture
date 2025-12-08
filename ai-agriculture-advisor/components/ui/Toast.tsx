import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export function ToastNotification({ toast, onClose }: ToastProps) {
  const { id, type, title, message } = toast;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [id, toast.duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bg: "bg-green-500/20",
      border: "border-green-500/30",
      iconColor: "text-green-400",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      iconColor: "text-red-400",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30",
      iconColor: "text-yellow-400",
    },
    info: {
      icon: Info,
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
      iconColor: "text-blue-400",
    },
  };

  const { icon: Icon, bg, border, iconColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm shadow-lg max-w-md",
        bg,
        border
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconColor)} />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white text-sm">{title}</p>
        {message && <p className="text-xs text-gray-300 mt-1">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-50  space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastNotification key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}
