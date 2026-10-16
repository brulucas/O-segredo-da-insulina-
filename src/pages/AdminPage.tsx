import { useState } from 'react';
import {
  Users,
  Crown,
  UserX,
  AlertTriangle,
  ShoppingBag,
  Scale,
  Camera,
  RefreshCw,
  LogOut,
  Radio,
  Search,
  Check
} from 'lucide-react';
import { Button } from '../components/Button';
import { toast } from '../store/useToastStore';

export function AdminPage() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("adminKey") || "");
  const [inputKey, setInputKey] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  const [search, setSearch] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    localStorage.setItem("adminKey", inputKey.trim());
    setAdminKey(inputKey.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem("adminKey");
    setAdminKey("");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast("Dados atualizados!", "success");
    }, 600);
  };

  if (!adminKey) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center bg-gradient-creme px-6">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-float backdrop-blur">
          <p className="text-2xs font-extrabold uppercase tracking-[0.16em] text-dourado-600">
            Área restrita
          </p>
          <h1 className="mt-1 text-2xl font-black text-verde-900">
            Painel Gerencial
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Digite a chave de administração para acessar métricas e usuárias.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="Chave de acesso"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-base outline-none focus:border-verde-700/40"
            />
            <Button variant="primary" size="lg" fullWidth type="submit">
              Entrar no painel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const metrics = {
    acessandoAgora: 14,
    total: 384,
    premium: 168,
    padrao: 216,
    inativas: 18,
    emRisco: 22,
    vendas30: 89,
    receita30: 5963.00,
    evoComPeso: 124,
    evoComFoto: 82
  };

  const tabs = [
    { id: "todas", label: `Todas (${metrics.total})` },
    { id: "premium", label: `Premium (${metrics.premium})` },
    { id: "padrao", label: `Padrão (${metrics.padrao})` },
    { id: "inativas", label: `Inativas (${metrics.inativas})` },
    { id: "online", label: `Online (${metrics.acessandoAgora})` },
    { id: "evolucao", label: `Evolução (${metrics.evoComPeso})` }
  ];

  const demoUsers = [
    { id: '1', name: 'Maria da Silva', email: 'maria@exemplo.com', phone: '11999999999', plan: 'premium', status: 'online', date: 'Hoje' },
    { id: '2', name: 'Ana Paula Rocha', email: 'anapaula@gmail.com', phone: '21988887777', plan: 'premium', status: 'ativo', date: 'Ontem' },
    { id: '3', name: 'Juliana Costa', email: 'juliana.c@hotmail.com', phone: '31977776666', plan: 'padrao', status: 'ativo', date: '3 dias atrás' },
    { id: '4', name: 'Carla Beatriz', email: 'carlab@uol.com.br', phone: '41966665555', plan: 'padrao', status: 'inativo', date: '10 dias atrás' },
    { id: '5', name: 'Patricia Mendes', email: 'patricia@gmail.com', phone: '19955554444', plan: 'premium', status: 'online', date: 'Hoje' }
  ];

  const filteredUsers = demoUsers.filter(u => {
    if (activeTab === 'premium' && u.plan !== 'premium') return false;
    if (activeTab === 'padrao' && u.plan !== 'padrao') return false;
    if (activeTab === 'inativas' && u.status !== 'inativo') return false;
    if (activeTab === 'online' && u.status !== 'online') return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-gradient-creme px-4 pb-10 pt-safe">
      <header className="flex items-center justify-between py-4">
        <div>
          <p className="text-2xs font-extrabold uppercase tracking-[0.16em] text-dourado-600">
            Clube do Segredo
          </p>
          <h1 className="text-2xl font-black text-verde-900">
            Painel gerencial
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft cursor-pointer"
            aria-label="Atualizar"
          >
            <RefreshCw className={`h-5 w-5 text-verde-700 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleLogout}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft cursor-pointer"
            aria-label="Sair"
          >
            <LogOut className="h-5 w-5 text-ink-muted" />
          </button>
        </div>
      </header>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <MetricCard
          icon={Radio}
          label="Acessando agora"
          value={metrics.acessandoAgora}
          tone="verde"
          pulse
        />
        <MetricCard icon={Users} label="Total" value={metrics.total} />
        <MetricCard icon={Crown} label="Premium" value={metrics.premium} tone="dourado" />
        <MetricCard icon={Users} label="Padrão" value={metrics.padrao} />
        <MetricCard icon={UserX} label="Inativas" value={metrics.inativas} tone="erro" />
        <MetricCard icon={AlertTriangle} label="Em risco (7d+)" value={metrics.emRisco} tone="erro" />
        <MetricCard icon={ShoppingBag} label="Vendas (30d)" value={metrics.vendas30} tone="dourado" />
        <MetricCard
          icon={ShoppingBag}
          label="Receita (30d)"
          value={metrics.receita30.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          tone="verde"
        />
        <MetricCard icon={Scale} label="Preencheram peso" value={metrics.evoComPeso} tone="verde" />
        <MetricCard icon={Camera} label="Enviaram foto" value={metrics.evoComFoto} tone="dourado" />
      </div>

      {/* Salada Promo Metrics */}
      <div className="mt-5 rounded-2xl bg-white p-4 shadow-soft">
        <h3 className="text-sm font-bold text-verde-900">
          Oferta Salada de Pote · receitinhas (30 dias)
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-verde-700/5 p-3">
            <p className="text-2xl font-black text-verde-900">142</p>
            <p className="text-2xs font-semibold text-ink-muted">Visualizações</p>
          </div>
          <div className="rounded-2xl bg-verde-700/5 p-3">
            <p className="text-2xl font-black text-verde-900">58</p>
            <p className="text-2xs font-semibold text-ink-muted">Cliques oferta</p>
          </div>
          <div className="rounded-2xl bg-verde-700/5 p-3">
            <p className="text-2xl font-black text-verde-900">40.8%</p>
            <p className="text-2xs font-semibold text-ink-muted">Conversão</p>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="mt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-verde-900">Usuárias</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-ink/10 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-verde-700/40 sm:w-64"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex overflow-x-auto gap-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-verde-800 text-white shadow-soft'
                  : 'bg-white text-ink-muted hover:bg-creme-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* User Rows */}
        <div className="mt-3 space-y-2">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-soft"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-verde-900">{u.name}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      u.plan === 'premium'
                        ? 'bg-dourado-500/15 text-dourado-600'
                        : 'bg-verde-700/10 text-verde-700'
                    }`}
                  >
                    {u.plan}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-ink-muted">
                  {u.email} · {u.phone}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    u.status === 'online'
                      ? 'bg-emerald-500 ring-2 ring-emerald-200'
                      : u.status === 'inativo'
                      ? 'bg-red-400'
                      : 'bg-amber-400'
                  }`}
                />
                <span className="text-xs text-ink-faint">{u.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tone = "verde",
  pulse = false
}: {
  icon: any;
  label: string;
  value: string | number;
  tone?: "verde" | "dourado" | "erro";
  pulse?: boolean;
}) {
  const toneBg =
    tone === "dourado"
      ? "bg-dourado-500/15 text-dourado-600"
      : tone === "erro"
      ? "bg-red-500/10 text-red-600"
      : "bg-verde-700/10 text-verde-700";

  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${toneBg}`}>
          <Icon className="h-4 w-4" />
        </span>
        {pulse && (
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-black text-verde-900">{value}</p>
      <p className="text-xs font-semibold text-ink-muted">{label}</p>
    </div>
  );
}
