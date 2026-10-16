import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { toast } from '../store/useToastStore';
import { Lock, ArrowLeft } from 'lucide-react';

export function RecuperarPage() {
  const navigate = useNavigate();
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pass1.length < 6) {
      toast("A senha precisa ter ao menos 6 caracteres.", "info");
      return;
    }
    if (pass1 !== pass2) {
      toast("As senhas não conferem.", "info");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("Senha redefinida com sucesso! 💛", "success");
      navigate('/');
    }, 600);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center bg-gradient-creme px-6">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-float backdrop-blur">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2 text-xs font-bold text-verde-700 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </button>
        <p className="text-2xs font-extrabold uppercase tracking-[0.16em] text-dourado-600">
          Clube do Segredo
        </p>
        <h1 className="mt-1 text-2xl font-black text-verde-900">
          Redefinir senha
        </h1>
        <p className="mt-1.5 text-sm text-ink-muted">
          Escolha sua nova senha para acessar sua conta.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 focus-within:border-dourado-400">
            <Lock className="h-5 w-5 text-dourado-500" />
            <input
              type="password"
              placeholder="Nova senha (mínimo 6 caracteres)"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              className="input-bare"
            />
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 focus-within:border-dourado-400">
            <Lock className="h-5 w-5 text-dourado-500" />
            <input
              type="password"
              placeholder="Confirmar nova senha"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              className="input-bare"
            />
          </div>
          <Button variant="gold" size="lg" fullWidth loading={loading} type="submit">
            Salvar nova senha
          </Button>
        </form>
      </div>
    </div>
  );
}
