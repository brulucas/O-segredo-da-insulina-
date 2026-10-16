import { CsBadge } from './CsBadge';

export function AppLogoHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={compact ? "flex flex-col items-center pb-3 pt-5" : "flex flex-col items-center pb-6 pt-10"}>
      <CsBadge size={compact ? 52 : 74} />
      <p className={compact ? "mt-2 font-wordmark text-[16px] font-semibold tracking-[0.04em] text-verde-700" : "mt-3.5 font-wordmark text-[21px] font-semibold tracking-[0.04em] text-verde-700"}>
        CLUBE <span className="text-dourado-600">DO</span> SEGREDO
      </p>
      <div className="mt-2 flex w-[140px] items-center gap-2.5">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-dourado-500 to-transparent" />
        <span className="text-[11px] text-dourado-500">✦</span>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-dourado-500 to-transparent" />
      </div>
    </header>
  );
}
