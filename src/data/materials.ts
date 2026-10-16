export interface MaterialItem {
  titulo: string;
  descricao?: string;
  arquivo: string;
}

export const BONUS_PDFS: MaterialItem[] = [
  {
    titulo: "Soro da Magreza — Chás",
    descricao: "A receita completa dos chás",
    arquivo: "/presentes/soro-da-magreza-chas.pdf"
  },
  {
    titulo: "20 Shakes Emagrecedores",
    descricao: "Shakes práticos do dia a dia",
    arquivo: "/presentes/shakes-emagrecedores.pdf"
  },
  {
    titulo: "20 Receitas Detox",
    descricao: "Para desinchar e limpar",
    arquivo: "/presentes/receitas-detox.pdf"
  },
  {
    titulo: "40 Sobremesas",
    descricao: "Que aceleram o metabolismo",
    arquivo: "/presentes/sobremesas-metabolismo.pdf"
  },
  {
    titulo: "Dicas para Acelerar",
    descricao: "Acelere o seu resultado",
    arquivo: "/presentes/dicas-acelerar-resultado.pdf"
  }
];

export const PROTOCOLOS: MaterialItem[] = [
  { titulo: "Manhã", arquivo: "/materiais/protocolos/protocolo-01-manha.html" },
  { titulo: "Noite", arquivo: "/materiais/protocolos/protocolo-02-noite.html" },
  { titulo: "Festa", arquivo: "/materiais/protocolos/protocolo-03-festa.html" },
  { titulo: "Viagem", arquivo: "/materiais/protocolos/protocolo-04-viagem.html" },
  { titulo: "Visita", arquivo: "/materiais/protocolos/protocolo-05-visita.html" },
  { titulo: "Preguiça e Cansaço", arquivo: "/materiais/protocolos/protocolo-06-preguica-cansaco.html" },
  { titulo: "Marmita", arquivo: "/materiais/protocolos/protocolo-07-marmita.html" },
  { titulo: "Fim de Semana", arquivo: "/materiais/protocolos/protocolo-08-fim-de-semana.html" },
  { titulo: "TPM e Ciclo", arquivo: "/materiais/protocolos/protocolo-09-tpm-ciclo.html" },
  { titulo: "Estresse e Ansiedade", arquivo: "/materiais/protocolos/protocolo-10-estresse-ansiedade.html" }
];

export const RECEITAS_EXCLUSIVAS: MaterialItem[] = [
  "Água de Berinjela com Limão",
  "Smoothie de Cenoura e Gengibre",
  "Smoothie de Banana Verde e Canela",
  "Suco de Beterraba e Laranja",
  "Suco de Melancia e Hortelã",
  "Água de Pepino e Hortelã",
  "Suco de Abacaxi e Cúrcuma",
  "Suco de Uva e Canela",
  "Suco de Morango e Chia",
  "Limonada de Gengibre e Hortelã",
  "Vitamina de Mamão e Linhaça",
  "Vitamina de Beterraba e Maçã",
  "Smoothie de Maracujá e Aveia",
  "Suco de Cenoura e Laranja"
].map((titulo, idx) => ({
  titulo,
  arquivo: `/materiais/receitas/receita-${String(idx + 1).padStart(2, "0")}.html`
}));

export const RITUAIS: MaterialItem[] = [
  "Ativar a Circulação",
  "Desinchar",
  "Aliviar Dores",
  "Estimular o Intestino",
  "Emagrecimento"
].map((titulo, idx) => ({
  titulo,
  arquivo: `/materiais/rituais/rituais-${String(idx + 1).padStart(2, "0")}.html`
}));

export const DRA_WHATSAPP_URL = "https://wa.me/5531996508234?text=" + encodeURIComponent("Preciso de ajuda");
export const CLUBE_CHECKOUT_URL = "https://checkout.payt.com.br/82f901a94aee65f6ff4ff2b5b55dc714";
export const SALADA_CHECKOUT_URL = "https://checkout.payt.com.br/7f1909495ef590046fdc4f001d246606";
export const SALADA_PRICE = "R$ 19,90";
