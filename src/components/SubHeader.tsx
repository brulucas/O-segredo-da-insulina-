import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface SubHeaderProps {
  title: string;
  onBack?: () => void;
}

export function SubHeader({ title, onBack }: SubHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-dourado-600/15 bg-creme/90 px-4 pt-safe backdrop-blur-md">
      <div className="flex w-full items-center gap-3 py-3">
        <button
          onClick={onBack ?? (() => navigate(-1))}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-creme-50 text-verde-700 shadow-[0_0_0_1.3px_rgba(156,122,42,0.3)] active:scale-95 cursor-pointer"
          aria-label="Voltar"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
        </button>
        <h1 className="flex-1 truncate text-[18px] font-bold text-verde-700">
          {title}
        </h1>
      </div>
    </header>
  );
}
