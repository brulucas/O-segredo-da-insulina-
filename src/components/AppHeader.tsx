import { useNavigate } from 'react-router-dom';
import { CsBadge } from './CsBadge';
import { Gift, Camera, Calendar, User } from 'lucide-react';
import { useHtmlViewerStore } from '../store/useHtmlViewerStore';

interface AppHeaderProps {
  premium?: boolean;
}

export function AppHeader({ premium: _premium }: AppHeaderProps) {
  const navigate = useNavigate();
  const openHtml = useHtmlViewerStore((s) => s.openHtml);

  return (
    <header className="sticky top-0 z-20 flex items-center border-b border-dourado-600/15 bg-creme/90 px-2.5 sm:px-3.5 pt-safe backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-1 sm:gap-1.5 py-2.5 sm:py-3">
        <button
          onClick={() => navigate('/')}
          aria-label="Início"
          className="active:scale-95 cursor-pointer shrink-0 mr-0.5"
        >
          <CsBadge size={40} />
        </button>

        <HeaderActionBtn
          label="21 Dias"
          onClick={() => navigate('/jornada')}
          icon={<Calendar className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" strokeWidth={2} />}
        />
        <HeaderActionBtn
          label="Evolução"
          onClick={() => openHtml('/evolucao.html', 'Minha evolução')}
          icon={<Camera className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" strokeWidth={1.8} />}
        />
        <HeaderActionBtn
          label="Presentes"
          onClick={() => navigate('/presentes')}
          icon={<Gift className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" strokeWidth={1.8} />}
        />
        <HeaderActionBtn
          label="Conta"
          onClick={() => navigate('/perfil')}
          icon={<User className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" strokeWidth={1.8} />}
        />
      </div>
    </header>
  );
}

function HeaderActionBtn({
  label,
  icon,
  onClick
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex min-w-0 flex-1 flex-col items-center gap-1 py-0.5 active:scale-95 cursor-pointer"
    >
      <span className="grid h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] place-items-center rounded-[12px] sm:rounded-[13px] bg-gradient-gold text-verde-800 shadow-[0_0_0_1px_#9C7A2A,0_3px_8px_rgba(14,42,30,0.12)]">
        {icon}
      </span>
      <span className="text-center text-[10px] sm:text-[11px] font-semibold leading-[1.1] text-verde-700 truncate w-full px-0.5">
        {label}
      </span>
    </button>
  );
}
