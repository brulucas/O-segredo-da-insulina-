import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  full?: boolean;
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  full
}: BottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-verde-950/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={`relative w-full max-w-md rounded-t-3xl bg-creme shadow-float ${
              full ? "h-[92vh]" : "max-h-[88vh]"
            } flex flex-col`}
          >
            <div className="relative flex items-center justify-center px-5 pb-2 pt-3">
              <div className="h-1.5 w-12 rounded-full bg-ink/15" />
            </div>
            <div className="flex min-h-[40px] items-center justify-between gap-3 px-5 pb-1">
              {title ? (
                <h2 className="truncate text-xl font-extrabold text-verde-800">{title}</h2>
              ) : (
                <span />
              )}
              <button
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-verde-700 text-creme shadow-soft active:scale-95 cursor-pointer"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
