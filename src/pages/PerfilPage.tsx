import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useHtmlViewerStore } from '../store/useHtmlViewerStore';
import { SubHeader } from '../components/SubHeader';
import { CsBadge } from '../components/CsBadge';
import { Button } from '../components/Button';
import { toast } from '../store/useToastStore';
import {
  Calendar,
  Camera,
  Gift,
  LogOut,
  ChevronRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export function PerfilPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const resetProgress = useAuthStore((s) => s.resetProgress);
  const openHtml = useHtmlViewerStore((s) => s.openHtml);
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm("Deseja realmente zerar todos os dias e reiniciar seu progresso?")) {
      resetProgress();
      toast("Progresso zerado! Você começou do Dia 1 💛", "success");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-creme">
      <SubHeader title="Minha conta" />

      <div className="flex-1 px-4 sm:px-5 pb-10 pt-5">
        {/* User Card */}
        <div className="flex items-center gap-4 rounded-[20px] border border-dourado-600/15 bg-creme-50 p-4 shadow-[0_4px_12px_rgba(14,42,30,0.05)]">
          <CsBadge size={54} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[18px] sm:text-[19px] font-bold text-verde-700">
              {user?.name || "Você"}
            </p>
            <p className="truncate text-[13px] text-ink-muted">
              {user?.email || "usuario@exemplo.com"}
            </p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-dourado-500/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-dourado-700">
              <Sparkles className="h-3 w-3" /> Acesso Completo ao Método
            </span>
          </div>
        </div>

        {/* Quick Access List */}
        <div className="mt-5 space-y-2.5">
          <button
            onClick={() => navigate('/jornada')}
            className="flex w-full items-center gap-3 rounded-2xl border border-dourado-600/15 bg-creme-50 p-3.5 text-left shadow-soft active:bg-creme-200 cursor-pointer"
          >
            <Calendar className="h-5 w-5 text-dourado-600 shrink-0" />
            <span className="flex-1 text-[14.5px] font-semibold text-verde-700">
              Jornada dos 21 Dias
            </span>
            <ChevronRight className="h-5 w-5 text-ink-faint shrink-0" />
          </button>

          <button
            onClick={() => openHtml('/evolucao.html', 'Minha evolução')}
            className="flex w-full items-center gap-3 rounded-2xl border border-dourado-600/15 bg-creme-50 p-3.5 text-left shadow-soft active:bg-creme-200 cursor-pointer"
          >
            <Camera className="h-5 w-5 text-dourado-600 shrink-0" />
            <span className="flex-1 text-[14.5px] font-semibold text-verde-700">
              Minha Evolução (Fotos e Peso)
            </span>
            <ChevronRight className="h-5 w-5 text-ink-faint shrink-0" />
          </button>

          <button
            onClick={() => navigate('/presentes')}
            className="flex w-full items-center gap-3 rounded-2xl border border-dourado-600/15 bg-creme-50 p-3.5 text-left shadow-soft active:bg-creme-200 cursor-pointer"
          >
            <Gift className="h-5 w-5 text-dourado-600 shrink-0" />
            <span className="flex-1 text-[14.5px] font-semibold text-verde-700">
              Presentes & Materiais
            </span>
            <ChevronRight className="h-5 w-5 text-ink-faint shrink-0" />
          </button>
        </div>

        {/* Reset progress button */}
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dourado-600/20 bg-creme-50 py-3 text-xs font-bold text-verde-700 shadow-soft active:bg-creme-200 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 text-dourado-600" />
            Reiniciar progresso (zerar dias)
          </button>
        </div>

        {/* Logout */}
        <div className="mt-5">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5" /> Sair da conta
          </Button>
        </div>

        <p className="mt-6 text-center text-[12px] font-medium text-ink-faint">
          Clube do Segredo · versão 2.0
        </p>
      </div>
    </div>
  );
}
