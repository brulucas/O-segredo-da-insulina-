import { useState } from 'react';
import { useHtmlViewerStore } from '../store/useHtmlViewerStore';
import { SubHeader } from '../components/SubHeader';
import {
  BONUS_PDFS,
  PROTOCOLOS,
  RECEITAS_EXCLUSIVAS,
  RITUAIS
} from '../data/materials';
import {
  FileText,
  Download,
  Sparkles,
  ChevronDown,
  ShieldAlert,
  Utensils,
  Clock,
  ChevronRight
} from 'lucide-react';

export function PresentesPage() {
  const openHtml = useHtmlViewerStore((s) => s.openHtml);

  const [exclusiveOpen, setExclusiveOpen] = useState(true);
  const [protocolsOpen, setProtocolsOpen] = useState(false);
  const [recipesOpen, setRecipesOpen] = useState(false);
  const [ritualsOpen, setRitualsOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-creme">
      <SubHeader title="Presentes" />

      <div className="flex-1 px-4 pb-12 pt-5">
        <p className="mb-5 ml-1 text-[14.5px] text-verde-600">
          Seus bônus e materiais para baixar e usar quando quiser.
        </p>

        <p className="mb-3 ml-1 font-wordmark text-[12px] font-semibold uppercase tracking-[0.18em] text-dourado-600">
          Para baixar
        </p>

        {/* Bonus PDFs for download */}
        <div className="space-y-3">
          {BONUS_PDFS.map((item) => (
            <a
              href={item.arquivo}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
              key={item.arquivo}
            >
              <div className="flex items-center gap-3.5 rounded-[18px] border border-dourado-600/20 bg-creme-50 p-4 text-left shadow-[0_4px_12px_rgba(14,42,30,0.05)] transition-transform active:scale-[0.99]">
                <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[15px] bg-gradient-gold text-verde-800 shadow-[0_4px_10px_rgba(14,42,30,0.14)]">
                  <FileText className="h-[26px] w-[26px]" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-semibold leading-tight text-verde-700">
                    {item.titulo}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-ink-muted">
                    {item.descricao}
                  </span>
                </span>
                <span className="shrink-0">
                  <Download className="h-5 w-5 text-dourado-600" strokeWidth={2} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Exclusive Method Materials - Unlocked for everyone */}
        <div className="mt-8">
          <button
            onClick={() => setExclusiveOpen((prev) => !prev)}
            className="flex w-full items-center gap-3.5 rounded-[18px] border border-dourado-600/25 bg-gradient-to-br from-verde-700 to-verde-800 p-4 text-left shadow-card active:scale-[0.99] cursor-pointer"
          >
            <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[15px] bg-gradient-gold text-verde-800">
              <Sparkles className="h-[26px] w-[26px]" strokeWidth={1.8} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-[15.5px] font-semibold leading-tight text-creme">
                <Sparkles className="h-4 w-4 text-dourado-300" /> Materiais do Método
              </span>
              <span className="mt-0.5 block text-[13px] text-dourado-300">
                {exclusiveOpen ? "Toque para recolher" : "Clique aqui para ver"}
              </span>
            </span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-dourado-300 transition-transform ${
                exclusiveOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {exclusiveOpen && (
            <div className="mt-3 space-y-3">
              {/* Protocolos */}
              <MaterialAccordionSection
                label="Protocolos de imprevistos"
                count={PROTOCOLOS.length}
                open={protocolsOpen}
                onToggle={() => setProtocolsOpen((prev) => !prev)}
                icon={<ShieldAlert className="h-[22px] w-[22px]" strokeWidth={1.8} />}
              >
                {PROTOCOLOS.map((p) => (
                  <MaterialItemRow
                    key={p.arquivo}
                    titulo={p.titulo}
                    onClick={() => openHtml(p.arquivo, p.titulo)}
                  />
                ))}
              </MaterialAccordionSection>

              {/* Receitas exclusivas */}
              <MaterialAccordionSection
                label="Receitas exclusivas Poderosas"
                count={RECEITAS_EXCLUSIVAS.length}
                open={recipesOpen}
                onToggle={() => setRecipesOpen((prev) => !prev)}
                icon={<Utensils className="h-[22px] w-[22px]" strokeWidth={1.8} />}
              >
                {RECEITAS_EXCLUSIVAS.map((r) => (
                  <MaterialItemRow
                    key={r.arquivo}
                    titulo={r.titulo}
                    onClick={() => openHtml(r.arquivo, r.titulo)}
                  />
                ))}
              </MaterialAccordionSection>

              {/* Rituais de 7 minutos */}
              <MaterialAccordionSection
                label="Rituais de 7 minutos"
                count={RITUAIS.length}
                open={ritualsOpen}
                onToggle={() => setRitualsOpen((prev) => !prev)}
                icon={<Clock className="h-[22px] w-[22px]" strokeWidth={1.8} />}
              >
                {RITUAIS.map((rit) => (
                  <MaterialItemRow
                    key={rit.arquivo}
                    titulo={rit.titulo}
                    onClick={() => openHtml(rit.arquivo, rit.titulo)}
                  />
                ))}
              </MaterialAccordionSection>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MaterialAccordionSection({
  label,
  count,
  open,
  onToggle,
  icon,
  children
}: {
  label: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-dourado-600/20 bg-creme-50 shadow-[0_4px_12px_rgba(14,42,30,0.05)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3.5 p-4 text-left active:bg-creme-200 cursor-pointer"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-dourado-500/14 text-dourado-600">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-tight text-verde-700">
            {label}
          </span>
          <span className="mt-0.5 block text-[12.5px] text-ink-muted">
            {count} materiais · clique para ver
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-verde-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-dourado-600/10 px-3 pb-3 pt-1">
          {children}
        </div>
      )}
    </div>
  );
}

function MaterialItemRow({
  titulo,
  onClick
}: {
  titulo: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left active:bg-creme-200 cursor-pointer"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-gold text-verde-800">
        <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
      </span>
      <span className="min-w-0 flex-1 truncate text-[14.5px] font-medium text-verde-700">
        {titulo}
      </span>
      <Download className="h-4 w-4 shrink-0 text-dourado-600" strokeWidth={2} />
    </button>
  );
}
