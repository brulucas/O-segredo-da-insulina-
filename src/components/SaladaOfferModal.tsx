import { useState } from 'react';
import { Salad, ChevronRight, Check } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { SALADA_CHECKOUT_URL, SALADA_PRICE } from '../data/materials';

export function SaladaOfferModal() {
  const [open, setOpen] = useState(false);

  const handleCheckout = () => {
    window.open(SALADA_CHECKOUT_URL, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-2xl bg-gradient-gold p-4 text-left text-verde-900 shadow-gold cursor-pointer"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-verde-900/10">
          <Salad className="h-6 w-6 text-verde-900" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black">Salada de pote — 60 receitas</p>
          <p className="text-xs font-semibold text-verde-900/70">
            Emagreça sem passar fome · {SALADA_PRICE}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0" />
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <div className="text-center">
          <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold shadow-gold">
            <Salad className="h-8 w-8 text-verde-900" />
          </span>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-dourado-600">
            Oferta exclusiva pra você
          </p>
          <h2 className="mt-1 text-2xl font-black text-verde-900">Salada de Pote</h2>
          <p className="mt-1.5 text-[15px] font-semibold text-ink-soft">
            60 receitas + 19 molhos pra emagrecer sem passar fome — prontas pra sua semana inteira.
          </p>
        </div>

        <div className="mt-4 space-y-2">
          {[
            "60 receitas de salada no pote",
            "19 molhos que cabem na dieta",
            "Guia: como montar e conservar a semana toda",
            "Você recebe no e-mail e no WhatsApp"
          ].map((item) => (
            <div
              className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-soft"
              key={item}
            >
              <Check className="h-5 w-5 shrink-0 text-sucesso" strokeWidth={3} />
              <p className="text-[15px] font-semibold text-verde-900">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-verde-700/5 p-4 text-center">
          <p className="text-sm font-semibold text-ink-soft">Pagamento único</p>
          <p className="text-3xl font-black text-verde-900">{SALADA_PRICE}</p>
        </div>

        <Button
          variant="gold"
          size="lg"
          fullWidth
          className="mt-4"
          onClick={handleCheckout}
        >
          Quero as receitas por {SALADA_PRICE}
        </Button>

        <button
          onClick={() => setOpen(false)}
          className="mt-2 w-full py-2 text-sm font-bold text-ink-faint cursor-pointer"
        >
          Agora não
        </button>
        <div className="h-2" />
      </BottomSheet>
    </>
  );
}
