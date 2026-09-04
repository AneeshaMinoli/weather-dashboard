"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onDone: () => void;
}

export function Toast({ message, onDone }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-black/85 backdrop-blur-md border border-white/20 text-white text-sm px-5 py-3 rounded-full shadow-xl">
      {message}
    </div>
  );
}

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-black/90 border border-white/20 rounded-2xl p-6 w-full max-w-sm text-white text-center shadow-2xl">
        <p className="text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-full border border-white/30 bg-white/10 text-sm"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 transition text-sm font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}