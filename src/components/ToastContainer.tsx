import { motion, AnimatePresence } from 'motion/react';
import { useToastStore } from '../store/useToastStore';
import { CircleCheck, Info, Sparkles, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex flex-col items-center gap-2 px-4 pt-safe">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={() => dismiss(t.id)}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-float cursor-pointer"
            key={t.id}
          >
            {t.type === 'success' && <CircleCheck className="h-5 w-5 text-sucesso shrink-0" />}
            {t.type === 'info' && <Info className="h-5 w-5 text-verde-500 shrink-0" />}
            {t.type === 'gold' && <Sparkles className="h-5 w-5 text-dourado-600 shrink-0" />}
            <span className="flex-1 text-sm font-medium text-ink">{t.message}</span>
            <X className="h-4 w-4 text-ink-faint shrink-0" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
