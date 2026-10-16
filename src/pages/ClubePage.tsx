import { SubHeader } from '../components/SubHeader';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { Play, ShieldAlert, Scale, ShieldCheck, Check } from 'lucide-react';
import { CLUBE_CHECKOUT_URL } from '../data/materials';

const FEATURES = [
  {
    icon: ShieldAlert,
    title: "Protocolos para imprevistos",
    desc: "Festa, viagem, TPM, preguiça — prontos para usar."
  },
  {
    icon: WhatsAppIcon,
    title: "Dra. do Segredo particular no WhatsApp",
    desc: "Acompanhamento próximo, nunca sozinha."
  },
  {
    icon: Scale,
    title: "Minha Evolução",
    desc: "Foto, peso e medidas, semana a semana."
  }
];

export function ClubePage() {
  const handleCheckout = () => {
    window.open(CLUBE_CHECKOUT_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-creme">
      <SubHeader title="Dra. do Segredo" />

      <div className="flex-1 px-5 pb-32 pt-5">
        <div className="text-center">
          <div
            className="mx-auto grid h-[64px] w-[64px] place-items-center rounded-full bg-gradient-verde"
            style={{
              boxShadow: '0 0 0 2px #C7A24C, 0 10px 24px rgba(14,42,30,0.22)'
            }}
          >
            <WhatsAppIcon className="h-8 w-8 text-dourado-300" />
          </div>
          <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.05] text-verde-700">
            Dra. do Segredo no WhatsApp
          </h1>
          <p className="mx-auto mt-2.5 max-w-[320px] text-[15px] leading-snug text-ink-soft">
            O Segredo da Insulina te mostra o caminho, a Dra. do Segredo trilha esse caminho com você no WhatsApp.
          </p>
        </div>

        {/* Video Player */}
        <div className="mt-6 overflow-hidden rounded-[20px] bg-verde-900 shadow-[0_0_0_1.5px_#9C7A2A,0_14px_30px_rgba(14,42,30,0.26)]">
          <iframe
            src="/vsl.html"
            title="Vídeo"
            className="aspect-video w-full border-0"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          />
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[12px] font-medium text-ink-muted">
          <Play className="h-3.5 w-3.5 text-dourado-600 fill-dourado-600" /> Assista ao vídeo antes de decidir
        </div>

        {/* Features List */}
        <div className="mt-7 space-y-2.5">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                className="flex items-center gap-3.5 rounded-[18px] border border-dourado-600/15 bg-creme-50 p-3.5 shadow-[0_4px_12px_rgba(14,42,30,0.05)]"
                key={feat.title}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-dourado-500/14 text-dourado-600">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-tight text-verde-700">
                    {feat.title}
                  </p>
                  <p className="mt-0.5 text-[13px] text-ink-muted">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Offer Pricing Card */}
        <div className="mt-7 rounded-[20px] bg-gradient-verde p-6 text-center text-creme shadow-card">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-dourado-300">
            Acesso completo
          </p>
          <p className="mt-1 font-display text-[44px] font-bold leading-none">R$ 67</p>
          <p className="mt-1 text-[13.5px] text-creme/85">pagamento único</p>
          <p className="mx-auto mt-3 max-w-[280px] text-[13.5px] leading-snug text-creme/80">
            Dra. do Segredo por todos os 21 dias + Protocolos e materiais pra sempre.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[13px] font-medium text-dourado-300">
            <ShieldCheck className="h-4 w-4" /> Garantia incondicional de 7 dias
          </div>
        </div>

        {/* Highlights */}
        <ul className="mt-5 space-y-2">
          {[
            "Liberação imediata após o pagamento",
            "Sem mensalidade, sem surpresas",
            "Acesso pelo mesmo login"
          ].map((t) => (
            <li className="flex items-center gap-2.5 text-[14px] text-verde-700" key={t}>
              <Check className="h-4 w-4 shrink-0 text-dourado-600" strokeWidth={2.6} /> {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md border-t border-dourado-600/15 bg-creme/92 px-5 py-3.5 pb-safe backdrop-blur-md">
        <button
          onClick={handleCheckout}
          className="flex w-full items-center justify-center gap-2.5 rounded-[16px] bg-gradient-gold px-3 py-[16px] text-verde-800 shadow-[0_0_0_1.4px_#9C7A2A,0_10px_22px_rgba(14,42,30,0.2)] transition-transform active:scale-[0.99] cursor-pointer"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          <span className="text-[15px] font-semibold leading-tight">
            Quero ter a Dra. do Segredo no meu WhatsApp
          </span>
        </button>
      </div>
    </div>
  );
}
