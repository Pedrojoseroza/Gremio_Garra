<script setup lang="ts">
import { onMounted } from 'vue'

interface Integrante {
  id: number
  nome: string
  foto: string
  funcao: string
}

// Extrai nome e cargo do nome do arquivo: "Nome-Cargo.jpeg"
// Ex: "Hanna-Presidente.jpeg" → nome: "Hanna", cargo: "Presidente"
// Ex: "Pedro_José-Secretário_Geral.jpeg" → nome: "Pedro José", cargo: "Secretário Geral"
const parseIntegranteFromFile = (fileName: string, id: number): Integrante => {
  const nameOnly = fileName.replace(/\.(jpeg|jpg|png|webp)$/i, '')
  const lastHyphen = nameOnly.lastIndexOf('-')
  const nome = lastHyphen > 0 ? nameOnly.slice(0, lastHyphen).replace(/_/g, ' ') : nameOnly.replace(/_/g, ' ')
  const cargo = lastHyphen > 0 ? nameOnly.slice(lastHyphen + 1).replace(/_/g, ' ') : ''
  return { id, nome, foto: `/imagens-integrantes/${fileName}`, funcao: cargo }
}

const allFiles = [
  'Ananda-Colaboradora.jpeg',
  'Anna-Diretora de Saúde e Meio Ambiente.jpeg',
  'Edvaldo Junior-Colaborador.jpeg',
  'Enzo-Terceiro Suplente.jpeg',
  'Hanna-Presidente.jpeg',
  'Ian-Colaborador.jpeg',
  'Isabelle Padilha-Diretora Adjunta de Comunicação.jpeg',
  'Isís-Tesoureira_Geral.jpeg',
  'Leandro-Diretor_de_Insfraestrutura.jpeg',
  'Letícia-Diretora de Eventos.jpeg',
  'Manuela-Colaboradora.jpeg',
  'Maria_Eduarda-Primeira Suplente.jpeg',
  'Miguel Roza-Segundo Suplente.jpeg',
  'Mislaine-Diretora de Comunicação e Imprensa.jpeg',
  'Pedro_José-Secretário_Geral.jpeg',
  'Rafaela-Diretora de Promoção Artística e Cultural.jpeg',
  'Sophia-Diretora de Inclusão Social e Direitos Humanos.jpeg',
  'Tatielly-Diretora de Esportes e Lazer.jpeg',
  'Valentina-Vice_Presidente.jpeg',
  'Yasmin-Colaboradora.jpeg'
]

// Ordem de prioridade dos cargos para exibição
const cargoOrdem = (cargo: string): number => {
  const c = cargo.toLowerCase()
  if (c.includes('presidente')) return 1
  if (c.includes('vice_presidente') || c.includes('vice-presidente')) return 2
  if (c.includes('secretário_geral') || c.includes('secretário geral') || (c.includes('tesoureira geral')))  return 3
  if (c.includes('diretora') || c.includes('diretor')) return 4
  if (c.includes('suplente')) return 5
  return 6 // colaborador e outros
}

const integrantes: Integrante[] = allFiles
  .map((file, index) => parseIntegranteFromFile(file, index + 1))
  .sort((a, b) => cargoOrdem(a.funcao) - cargoOrdem(b.funcao))

// Scroll reveal
let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }),
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})
</script>

<template>
  <div class="quem-somos-page">
    <main>
      <!-- Hero / Banner -->
      <section class="hero reveal">
        <div class="hero-content">
          <span class="hero-eyebrow">QUEM SOMOS</span>
          <h1 class="hero-title">Uma chapa que acredita que toda voz importa</h1>
          <p class="hero-subtitle">
            Uma chapa de estudantes que quer tornar o Grêmio um lugar de escuta, participação e prestação de contas.<br />
            Mova o cursor sobre a onça para girá-la em 3D.
          </p>
        </div>
        <div class="hero-image">
          <img src="/logo-onca.svg" alt="Garra" />
        </div>
      </section>

      <!-- Nosso Nome / Nosso Lema -->
      <section class="nome-lema-section reveal">
        <div class="nome-lema-container">
          <!-- Left: Nosso Nome -->
          <div class="bloco-nome">
            <span class="bloco-eyebrow">NOSSO NOME</span>
            <h2 class="bloco-titulo">Por que Garra? Por que uma onça?</h2>
            <p class="bloco-texto">
              A onça representa a força de quem não fica calado. A Garra quer ser o lugar onde o estudante tem voz, e cada proposta nasce dessa ideia.
            </p>
          </div>

          <!-- Right: Nosso Lema -->
          <div class="card-lema">
            <span class="lema-eyebrow">NOSSO LEMA</span>
            <h3 class="lema-titulo">Nossa voz, nossa vez</h3>
            <p class="lema-texto">
              O estudante ter voz é a base de toda a Chapa Garra.
            </p>
          </div>
        </div>
      </section>

      <!-- Nossos Valores -->
      <section class="valores-section reveal">
        <div class="valores-container">
          <span class="valores-eyebrow">NOSSOS VALORES</span>
          <h2 class="valores-titulo">Nossos valores</h2>

          <div class="valores-grid">
            <article class="valor-card valor-voz">
              <span class="valor-titulo">Voz</span>
              <p class="valor-texto">Críticas, elogios e ideias chegam ao Grêmio por um canal aberto.</p>
            </article>
            <article class="valor-card valor-transparencia">
              <span class="valor-titulo">Transparência</span>
              <p class="valor-texto">Finanças e andamento das demandas divulgados todo mês.</p>
            </article>
            <article class="valor-card valor-participacao">
              <span class="valor-titulo">Participação</span>
              <p class="valor-texto">Oficinas, clubes e eventos feitos por e para estudantes.</p>
            </article>
            <article class="valor-card valor-integracao">
              <span class="valor-titulo">Integração</span>
              <p class="valor-texto">Calouros e turmas acolhidos, com memoria de quem já passou pelo curso.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Integrantes da chapa -->
      <section class="integrantes-section reveal">
        <div class="integrantes-container">
          <span class="integrantes-eyebrow">QUEM FAZ A GARRA</span>
          <h2 class="integrantes-titulo">Integrantes da chapa</h2>

          <div class="integrantes-grid">
            <article
              v-for="integrante in integrantes"
              :key="integrante.id"
              class="integrante-card reveal"
            >
              <div class="integrante-foto">
                <img :src="integrante.foto" :alt="integrante.nome" />
              </div>
              <h3 class="integrante-nome">{{ integrante.nome }}</h3>
              <p class="integrante-cargo">{{ integrante.funcao }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Page */
.quem-somos-page {
  min-height: 100vh;
  background: #F7EFE3;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Hero */
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: linear-gradient(180deg, #1A0B05 0%, #2D160B 60%, #1A0B05 100%);
  color: #FAF3E6;
  padding: 76px 60px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 420px;
}

.hero-content {
  max-width: 600px;
}

.hero-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #C7A880;
  margin-bottom: 12px;
  font-family: system-ui, -apple-system, sans-serif;
}

.hero-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.15;
  color: #FFFFFF;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.01em;
}

.hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(250, 243, 230, 0.9);
  margin: 0;
  max-width: 520px;
  font-weight: 400;
}

.hero-image {
  flex-shrink: 0;
}

.hero-image img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 8px solid #2D160B;
}

/* Nosso Nome / Nosso Lema */
.nome-lema-section {
  padding: 40px 60px 0;
  background: #F7EFE3;
}

.nome-lema-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
}

.bloco-nome {
  max-width: 560px;
}

.bloco-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #D4A373;
  margin-bottom: 12px;
  font-family: system-ui, -apple-system, sans-serif;
}

.bloco-titulo {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  color: #5A463A;
  margin: 0 0 1rem 0;
  letter-spacing: -0.01em;
}

.bloco-texto {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #8C7A66;
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

.card-lema {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 32px 24px;
  background: #3A2418;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  max-width: 340px;
}

.lema-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #D4A373;
  margin-bottom: 12px;
  font-family: system-ui, -apple-system, sans-serif;
}

.lema-titulo {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  color: #FAF3E6;
  margin: 0 0 1rem 0;
  letter-spacing: -0.01em;
}

.lema-texto {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(250, 243, 230, 0.85);
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Nossos Valores */
.valores-section {
  padding: 60px 60px 0;
  background: #F7EFE3;
}

.valores-container {
  max-width: 1200px;
  margin: 0 auto;
}

.valores-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #D4A373;
  margin-bottom: 12px;
  font-family: system-ui, -apple-system, sans-serif;
}

.valores-titulo {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.15;
  color: #5A463A;
  margin: 0 0 2rem 0;
  letter-spacing: -0.01em;
}

.valores-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.valor-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 24px 20px;
  box-sizing: border-box;
  min-height: 160px;
  display: flex;
  flex-direction: column;
}

.valor-voz {
  background: #5A2E1E;
  color: #FAF3E6;
}

.valor-transparencia {
  background: #FFF6E8;
  color: #3A2E24;
}

.valor-participacao {
  background: #FFF6E8;
  color: #3A2E24;
}

.valor-integracao {
  background: #5A2E1E;
  color: #FAF3E6;
}

.valor-titulo {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: system-ui, -apple-system, sans-serif;
}

.valor-texto {
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  opacity: 0.9;
}

/* Integrantes da chapa */
.integrantes-section {
  padding: 60px 60px 80px;
  background: #F7EFE3;
}

.integrantes-container {
  max-width: 1200px;
  margin: 0 auto;
}

.integrantes-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #D4A373;
  margin-bottom: 12px;
  font-family: system-ui, -apple-system, sans-serif;
}

.integrantes-titulo {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.15;
  color: #5A463A;
  margin: 0 0 2rem 0;
  letter-spacing: -0.01em;
}

.integrantes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.integrante-card {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  padding: 1.5rem;
  background: #FFF6E8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
}

.integrante-card:hover {
  transform:  scale(1.05);
  z-index: 10;
}

/* Cores alternadas dos cards entre onça e garra */
.integrante-card:nth-child(odd) {
  background: #6D0B02;
  color: #FFFFFF;
}

.integrante-card:nth-child(even) {
  background: #E68B3A;
  color: #3A2E24;
}

/* Texto para card escuro (onça) */
.integrante-card:nth-child(odd) .integrante-nome {
  color: #FFFFFF;
}

.integrante-card:nth-child(odd) .integrante-cargo {
  color: #E68B3A;
}

.integrante-card:nth-child(odd) .integrante-detalhe {
  background: linear-gradient(135deg, #E68B3A, #F4A261);
  box-shadow: 0 2px 6px rgba(230, 139, 58, 0.4);
}

/* Texto para card claro (garra) */
.integrante-card:nth-child(even) .integrante-nome {
  color: #3A2E24;
}

.integrante-card:nth-child(even) .integrante-cargo {
  color: #6D0B02;
}

.integrante-card:nth-child(even) .integrante-detalhe {
  background: linear-gradient(135deg, #6D0B02, #8B2A12);
  box-shadow: 0 2px 6px rgba(109, 11, 2, 0.4);
}

.integrante-foto {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin: 1rem 0 1rem 0;
  border: 4px solid #9B2C2C;
  background: #F3E8D0;
  position: relative;
  z-index: 1;
}
.integrante-foto:hover {
  transform: scale(1.05);
}

.integrante-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.integrante-nome {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: 1.125rem;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
}

.integrante-cargo {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  font-family: system-ui, -apple-system, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .nome-lema-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .card-lema {
    max-width: none;
  }

  .valores-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .integrantes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 60px 24px 40px;
  }

  .hero-content {
    max-width: none;
  }

  .hero-subtitle {
    max-width: none;
  }

  .hero-image {
    order: -1;
  }
}

@media (max-width: 768px) {
  .nome-lema-section {
    padding: 40px 24px 0;
  }

  .valores-section {
    padding: 40px 24px 0;
  }

  .integrantes-section {
    padding: 40px 24px 80px;
  }

  .valores-grid {
    grid-template-columns: 1fr;
  }

  .integrantes-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: 48px 24px 32px;
  }

  .hero-image img {
    width: min(240px, 72vw);
    height: auto;
  }
}
</style>
