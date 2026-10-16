import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useHtmlViewerStore } from '../store/useHtmlViewerStore';
import { AppLogoHeader } from '../components/AppLogoHeader';
import {
  Calendar,
  ShoppingBasket,
  Camera,
  Gift,
  User,
  ChevronRight,
  Flame,
  Sparkles
} from 'lucide-react';

export function HomePage() {
  const user = useAuthStore((s) => s.user);
  const openHtml = useHtmlViewerStore((s) => s.openHtml);
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-creme px-5 pb-12">
      {/* Top Profile Icon */}
      <button
        onClick={() => navigate('/perfil')}
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-creme-50 text-verde-600 shadow-[0_0_0_1.2px_rgba(156,122,42,0.25)] active:scale-95 cursor-pointer z-10"
        aria-label="Minha conta"
        style={{ marginTop: 'env(safe-area-inset-top)' }}
      >
        <User className="h-5 w-5" />
      </button>

      {/* Main Logo */}
      <AppLogoHeader compact={false} />

      {/* Welcome Card */}
      <div className="mt-2 mb-6 rounded-2xl border border-dourado-600/15 bg-creme-50/80 p-4 text-center shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wider text-dourado-600">
          Acesso Completo
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-verde-900">
          Olá, {user?.name || "você"}! 💛
        </h2>
        <p className="mt-1 text-[13.5px] leading-snug text-ink-muted">
          Seu método está 100% liberado. Siga o passo a passo diário para alcançar seus resultados.
        </p>
      </div>

      <div className="space-y-3.5">
        <p className="ml-1 font-wordmark text-[12px] font-semibold uppercase tracking-[0.2em] text-dourado-600">
          Acessar o Método
        </p>

        {/* 21 Dias da Insulina */}
        <button
          onClick={() => navigate('/jornada')}
          className="flex w-full items-center gap-4 rounded-[22px] border border-dourado-600/25 bg-gradient-to-br from-verde-700 to-verde-800 p-5 text-left text-creme shadow-card transition-transform active:scale-[0.99] cursor-pointer"
        >
          <span className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-2xl bg-gradient-gold text-verde-800 shadow-[0_4px_12px_rgba(14,42,30,0.2)]">
            <Flame className="h-7 w-7 text-verde-900" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[16px] font-bold uppercase tracking-[0.04em] text-creme">
              Segredo da Insulina
            </span>
            <span className="mt-0.5 block text-[13.5px] text-dourado-300">
              Jornada completa de 21 dias
            </span>
          </span>
          <ChevronRight className="h-6 w-6 shrink-0 text-dourado-300" strokeWidth={2.4} />
        </button>

        {/* Lista de compras */}
        <button
          onClick={() => openHtml('/materiais/lista-compras-21-dias.html', 'Lista de compras')}
          className="flex w-full items-center gap-4 rounded-[20px] border border-dourado-600/20 bg-creme-50 p-4 text-left shadow-soft transition-transform active:scale-[0.99] cursor-pointer"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-verde">
            <ShoppingBasket className="h-6 w-6 text-creme" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold text-verde-900">
              Lista de Compras dos 21 Dias
            </span>
            <span className="mt-0.5 block text-[13px] text-ink-muted">
              Tudo o que você precisa para o programa
            </span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />
        </button>

        {/* Minha evolução */}
        <button
          onClick={() => openHtml('/evolucao.html', 'Minha evolução')}
          className="flex w-full items-center gap-4 rounded-[20px] border border-dourado-600/20 bg-creme-50 p-4 text-left shadow-soft transition-transform active:scale-[0.99] cursor-pointer"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-verde">
            <Camera className="h-6 w-6 text-creme" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold text-verde-900">
              Minha Evolução
            </span>
            <span className="mt-0.5 block text-[13px] text-ink-muted">
              Acompanhe seu peso, medidas e fotos semanais
            </span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />
        </button>

        {/* Presentes e Bônus */}
        <button
          onClick={() => navigate('/presentes')}
          className="flex w-full items-center gap-4 rounded-[20px] border border-dourado-600/20 bg-creme-50 p-4 text-left shadow-soft transition-transform active:scale-[0.99] cursor-pointer"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-verde">
            <Gift className="h-6 w-6 text-dourado-300" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold text-verde-900">
              Presentes & Materiais
            </span>
            <span className="mt-0.5 block text-[13px] text-ink-muted">
              Receitas detox, shakes, protocolos e rituais
            </span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-ink-faint" />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-ink-faint">
        <Sparkles className="h-3.5 w-3.5 text-dourado-500" />
        <span>Método 100% individual e liberado</span>
      </div>
    </div>
  );
}
