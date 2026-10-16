import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Printer, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHtmlViewerStore } from '../store/useHtmlViewerStore';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from '../store/useToastStore';

export function HtmlModalViewer() {
  const { htmlView, closeHtml } = useHtmlViewerStore();
  const { user, toggleDay } = useAuthStore();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (htmlView) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [htmlView]);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      try {
        const win = iframe.contentWindow as any;
        const doc = iframe.contentDocument;
        if (!win || !doc) return;

        win.sendPrompt = (promptText: string) => {
          const clean = (promptText || "").toLowerCase();
          if (clean.includes("voltar")) {
            closeHtml();
            return;
          }
          if (clean.includes("presente")) {
            closeHtml();
            navigate("/presentes");
            return;
          }
        };

        const styleEl = doc.createElement("style");
        styleEl.textContent = `
          .topbar { display: none !important; }
          .backlink { display: none !important; }
          .screen { min-height: auto !important; width: 100% !important; max-width: 100% !important; }
          .body { padding-top: 14px !important; }
          @media print {
            html, body { height: auto !important; background: #fff !important; }
            body { display: block !important; }
            .screen { min-height: auto !important; box-shadow: none !important; background: #fff !important; max-width: none !important; }
            .topbar, .backlink, .share-btn, .tag-reg { display: none !important; }
            * { animation: none !important; transition: none !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            .acc, .day, .gift-card, .summary, .day-row, .seg, .acc-head { opacity: 1 !important; transform: none !important; }
            .acc-body { max-height: none !important; overflow: visible !important; }
            .acc .chev { display: none !important; }
          }
        `;
        doc.head.appendChild(styleEl);
      } catch {}
    }
  };

  const handlePrint = () => {
    const iframe = iframeRef.current;
    const win = iframe?.contentWindow;
    if (!win) {
      window.print();
      return;
    }
    try {
      const doc = iframe?.contentDocument;
      if (doc) {
        doc.querySelectorAll(".acc").forEach((item) => item.classList.add("open"));
      }
      win.focus();
      win.print();
    } catch {
      window.print();
    }
  };

  // Check if viewing a Day (e.g., "Dia 1", "Dia 2")
  const dayMatch = htmlView?.title?.match(/Dia\s+(\d+)/i);
  const dayNumber = dayMatch ? parseInt(dayMatch[1], 10) : null;
  const isDayCompleted = dayNumber && user?.completedDays?.includes(dayNumber);

  const handleToggleDay = () => {
    if (!dayNumber) return;
    toggleDay(dayNumber);
    if (!isDayCompleted) {
      toast(`Dia ${dayNumber} concluído! Parabéns! 💛`, 'success');
    } else {
      toast(`Dia ${dayNumber} desmarcado.`, 'info');
    }
  };

  return (
    <AnimatePresence>
      {htmlView && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col bg-creme"
        >
          <header className="flex items-center gap-2 border-b border-dourado-600/15 bg-creme-50/95 px-3 py-2 pt-safe shadow-soft backdrop-blur">
            <button
              onClick={closeHtml}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-creme-50 text-verde-700 shadow-[0_0_0_1.3px_rgba(156,122,42,0.3)] active:scale-95 cursor-pointer"
              aria-label="Voltar"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
            </button>

            <p className="min-w-0 flex-1 truncate text-[14px] sm:text-[15px] font-bold text-verde-700">
              {htmlView.title}
            </p>

            {dayNumber && (
              <button
                onClick={handleToggleDay}
                className={`flex h-10 shrink-0 items-center gap-1.5 rounded-2xl px-3 text-[12px] font-bold transition active:scale-95 cursor-pointer ${
                  isDayCompleted
                    ? 'bg-gradient-verde text-creme shadow-[0_0_0_1.2px_#16382a]'
                    : 'bg-creme-50 text-verde-700 shadow-[0_0_0_1.3px_rgba(156,122,42,0.3)]'
                }`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                <span>{isDayCompleted ? 'Concluído' : 'Concluir'}</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex h-10 shrink-0 items-center gap-1.5 rounded-2xl bg-creme-50 px-2.5 sm:px-3 text-[12px] font-semibold text-dourado-600 shadow-[0_0_0_1.3px_rgba(156,122,42,0.3)] active:scale-95 cursor-pointer"
              aria-label="Imprimir ou salvar PDF"
            >
              <Printer className="h-4 w-4" strokeWidth={2} />
              <span className="hidden xs:inline sm:inline">Imprimir</span>
            </button>
          </header>

          <iframe
            ref={iframeRef}
            onLoad={handleIframeLoad}
            src={htmlView.src}
            title={htmlView.title}
            className="min-h-0 w-full flex-1 border-0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
