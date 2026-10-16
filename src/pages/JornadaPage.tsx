import { useAuthStore } from '../store/useAuthStore';
import { useHtmlViewerStore } from '../store/useHtmlViewerStore';
import { AppHeader } from '../components/AppHeader';
import { ShoppingBasket, ChevronRight, Check } from 'lucide-react';

const DAYS = Array.from({ length: 21 }, (_, idx) => idx + 1);

export function JornadaPage() {
  const user = useAuthStore((s) => s.user);
  const openHtml = useHtmlViewerStore((s) => s.openHtml);

  const completedDays = Array.isArray(user?.completedDays) ? user.completedDays : [];
  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / 21) * 100);

  // Day 1 is default today if no specific days passed
  const currentDay = 1;

  const handleOpenDay = (day: number) => {
    const pad = String(day).padStart(2, '0');
    const url = `/dias/dia-${pad}-premium.html`;
    openHtml(url, `Dia ${day}`);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-creme">
      <AppHeader />

      <div className="flex-1 px-4 sm:px-5 pb-12 pt-5">
        <div className="mb-5 ml-1">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-dourado-600">
            Sua jornada
          </p>
          <h1 className="mb-3 text-[26px] sm:text-[28px] font-bold leading-[1.15] text-verde-700">
            21 dias para o seu resultado
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-dourado-500/16">
              <i
                className="block h-full rounded-full bg-gradient-to-r from-dourado-300 to-dourado-500 transition-[width] duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="shrink-0 text-[13px] font-medium text-ink-muted">
              {completedCount} de 21
            </span>
          </div>
        </div>

        {/* Lista de compras button */}
        <button
          onClick={() => openHtml('/materiais/lista-compras-21-dias.html', 'Lista de compras')}
          className="mb-6 flex w-full items-center gap-3.5 rounded-2xl border border-dourado-600/20 bg-creme-50 p-4 text-left shadow-soft transition-transform active:scale-[0.99] cursor-pointer"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-verde">
            <ShoppingBasket className="h-5 w-5 text-creme" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold text-verde-900 leading-tight">
              Lista de compras dos 21 dias
            </p>
            <p className="text-xs font-semibold text-ink-muted mt-0.5">
              Tudo que você precisa comprar pro programa
            </p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />
        </button>

        {/* 21 Days Grid */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {DAYS.map((day) => {
            const isCompleted = completedDays.includes(day);
            const isToday = day === currentDay && !isCompleted;

            return (
              <button
                key={day}
                onClick={() => handleOpenDay(day)}
                className={`relative flex min-h-[92px] flex-col items-center justify-center gap-px rounded-[18px] border p-3 sm:p-4 shadow-[0_4px_12px_rgba(14,42,30,0.05)] transition-transform active:scale-95 cursor-pointer ${
                  isCompleted
                    ? 'border-transparent bg-gradient-verde text-creme'
                    : 'border-dourado-600/20 bg-creme-50'
                } ${
                  isToday
                    ? 'border-2 border-dourado-500 bg-creme-50 shadow-[0_0_0_4px_rgba(199,162,76,0.18),0_10px_22px_rgba(14,42,30,0.12)]'
                    : ''
                }`}
              >
                {isToday && (
                  <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 rounded-full bg-gradient-gold px-2.5 py-[2px] text-[10px] font-semibold text-verde-800 shadow-[0_3px_7px_rgba(14,42,30,0.2)]">
                    Hoje
                  </span>
                )}
                <span
                  className={`text-[12px] sm:text-[13px] font-medium ${
                    isCompleted ? 'text-dourado-300' : 'text-ink-muted'
                  }`}
                >
                  Dia
                </span>
                <span
                  className={`text-[28px] sm:text-[32px] font-bold leading-[1.05] ${
                    isCompleted ? 'text-creme-50' : 'text-verde-700'
                  }`}
                >
                  {day}
                </span>
                {isCompleted && (
                  <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-gradient-gold text-verde-800">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
