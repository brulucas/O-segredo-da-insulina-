import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/Button';
import { Mail, ArrowRight } from 'lucide-react';

const STARS = [
  { top: "10%", left: "16%", s: 6, d: 0 },
  { top: "16%", left: "82%", s: 4, d: 0.8 },
  { top: "30%", left: "70%", s: 5, d: 1.6 },
  { top: "26%", left: "30%", s: 3, d: 0.4 },
  { top: "44%", left: "88%", s: 4, d: 2.2 },
  { top: "52%", left: "10%", s: 5, d: 1.2 },
  { top: "64%", left: "78%", s: 3, d: 0.6 },
  { top: "8%", left: "50%", s: 4, d: 2.6 }
];

export function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    await login(email);
    setLoading(false);
  };

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-md overflow-x-hidden overflow-y-auto bg-gradient-verde">
      {/* Background ambient glowing orbs */}
      <motion.div
        aria-hidden={true}
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-dourado-500/25 blur-3xl"
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        aria-hidden={true}
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-dourado-300/15 blur-3xl"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        aria-hidden={true}
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-verde-400/20 blur-3xl"
        animate={{
          y: [0, 18, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Starry sparks */}
      {STARS.map((star, i) => (
        <motion.span
          key={i}
          aria-hidden={true}
          className="pointer-events-none absolute rounded-full bg-dourado-200"
          style={{
            top: star.top,
            left: star.left,
            width: star.s,
            height: star.s
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.d
          }}
        />
      ))}

      <div
        aria-hidden={true}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,21,18,0.45)_100%)]"
      />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 sm:px-7 pb-8 pt-safe">
        {/* Floating Brand Emblem */}
        <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              aria-hidden={true}
              className="absolute inset-0 -z-10 rounded-[2.2rem] bg-dourado-400/30 blur-2xl"
            />
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[2.2rem] bg-creme p-4 sm:p-5 shadow-float ring-1 ring-dourado-300/50"
            >
              <img
                src="/logo.png"
                alt="Clube do Segredo"
                className="h-28 sm:h-32 w-36 sm:w-40 object-contain"
                draggable={false}
              />
              <motion.div
                aria-hidden={true}
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                initial={{ x: "-130%" }}
                animate={{ x: "130%" }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 font-serif text-lg sm:text-xl italic leading-snug text-creme/90"
          >
            Você não está sozinha.<br />Sem pressão, só direção.
          </motion.p>
        </div>

        {/* Clean Login Card - Email Only */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[26px] sm:rounded-[28px] border border-white/60 bg-creme/95 p-5 sm:p-6 shadow-float backdrop-blur-xl"
        >
          <div aria-hidden={true} className="absolute inset-x-0 top-0 h-1 bg-gradient-gold" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-verde-900">
            Acessar o Método
          </h2>
          <p className="mt-1 text-xs sm:text-sm font-medium text-ink-muted">
            Digite seu e-mail para começar sua jornada.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3.5">
            <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 transition-colors focus-within:border-dourado-400 focus-within:ring-2 focus-within:ring-dourado-300/40">
              <Mail className="h-5 w-5 text-dourado-500 shrink-0" />
              <input
                type="text"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="input-bare text-sm sm:text-base"
              />
            </div>

            <Button
              variant="gold"
              size="lg"
              fullWidth
              loading={loading}
              type="submit"
              className="group mt-2"
            >
              Entrar no Método
              <ArrowRight className="h-5 w-5 transition-transform group-active:translate-x-0.5" />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
