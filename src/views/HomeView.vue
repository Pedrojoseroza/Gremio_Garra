<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

import { onMounted, onBeforeUnmount } from 'vue'

const contexto = [
  { title: 'Quem somos', text: 'Uma chapa de estudantes que acredita que toda voz importa no Grêmio.' },
  { title: 'Por que Garra', text: 'A onça simboliza a força de quem não fica calado.' },
  { title: 'Como agimos', text: 'Cada proposta vem com um jeito de participar e de prestar contas.' },
]

const propostas = [
  {
    tag: 'Transparência',
    title: 'Ouvidoria',
    text: 'Formulário digital, anônimo ou identificado, para críticas, elogios e ideias.',
    bullets: [
      'Temas: Grêmio, infraestrutura, merenda e convívio',
      'Relatório periódico com o andamento das demandas',
      'Devolutiva aberta no auditório, no fim do mês',
    ],
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C6 2 3 5 3 8V12C3 15 6 18 10 18C14 18 17 15 17 12V8C17 5 14 2 10 2Z" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 8L10 12" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `,
  },
  {
    tag: 'Comunicação',
    title: 'Hora da Garra',
    text: 'Jornal semanal integrado a um site atualizado a cada 15 dias.',
    bullets: [
      'Notícias, projetos dos alunos e entrevistas',
      'Galeria, calendário e arquivo das edições',
      'Possível podcast no Spotify',
    ],
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="12" rx="2" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="6" y1="8" x2="14" y2="8" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="6" y1="11" x2="12" y2="11" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="6" y1="14" x2="10" y2="14" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `,
  },
  {
    tag: 'Cultura',
    title: 'Eventos e oficinas',
    text: 'Oficinas de arte, música e dança, feitas por estudantes voluntários.',
    bullets: [
      'Pesquisa de interesses antes de começar',
      '1 ou 2 oficinas por mês',
      'Exposições e grupo de dança',
    ],
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16L10 4L16 16" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 4V16" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="10" cy="10" r="2" fill="#EC9545"/>
      </svg>
    `,
  },
  {
    tag: 'Convivência',
    title: 'Clubes e núcleos',
    text: 'Mais visibilidade e apoio financeiro às iniciativas já existentes.',
    bullets: [
      'Divulgação em redes sociais e murais',
      'Apoio para materiais e campanhas',
      'Distribuição de recursos com transparência',
    ],
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="6" cy="6" r="3" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="14" cy="6" r="3" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 10C3 13 5 15 8 15H12C15 15 17 13 17 10" stroke="#EC9545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
  },
]

// Efeito de brilho que segue o cursor nos cards
function spotlight(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const r = target.getBoundingClientRect()
  target.style.setProperty('--mx', e.clientX - r.left + 'px')
  target.style.setProperty('--my', e.clientY - r.top + 'px')
}

// Scroll reveal: adiciona .is-visible quando o elemento entra na tela
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
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="home-page">
    <Header />

    <main>
      <!-- Banner -->
      <section class="banner reveal">
        <div class="banner__bg" aria-hidden="true"></div>
        <div class="wrap banner__content">
          <p class="eyebrow">GRÊMIO ESTUDANTIL 2027 · IFC ARAQUARI</p>
          <h1>Onde tem voz, tem <span class="hero-title-bold">GARRA!</span></h1>
          <p class="banner__lead">
            Somos a chapa candidata ao Grêmio Estudantil 2027. Nossa vez é dar voz a todos os estudantes, com
            transparência, cultura, estudo e integração.
          </p>
          <div class="actions">
            <router-link to="/propostas" class="btn btn-white">Ver propostas</router-link>
            <router-link to="/quem-somos" class="btn btn-white">Conheça a chapa</router-link>
          </div>
        </div>
        <div class="hero-image">
        </div>
      </section>

      <!-- Contexto -->
      <section class="section">
        <div class="wrap">
          <header class="head reveal">
            <p class="eyebrow">CONTEXTO</p>
            <h2>Um Grêmio que escuta cada estudante</h2>
          </header>
          <div class="contexto">
            <div
              v-for="(item, i) in contexto"
              :key="item.title"
              class="reveal"
              :style="{ transitionDelay: i * 90 + 'ms' }"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Prévia de propostas -->
      <section class="section section--alt">
        <div class="wrap">
          <header class="head reveal">
            <p class="eyebrow">NOSSA VOZ, NOSSA VEZ</p>
            <h2>Propostas da Chapa Garra</h2>
          </header>

          <div class="grid">
            <article
              v-for="(p, i) in propostas"
              :key="p.title"
              class="card reveal"
              :style="{ transitionDelay: (i % 4) * 90 + 'ms' }"
              @pointermove="spotlight($event)"
            >
              <div class="card-icon" v-html="p.icon" />
              <span class="pill">{{ p.tag }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.text }}</p>
              <ul class="proposal-bullets">
                <li v-for="(b, bi) in p.bullets" :key="bi">{{ b }}</li>
              </ul>
            </article>
          </div>

          <div class="centro">
            <router-link to="/propostas" class="btn">Ver todas as propostas</router-link>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section">
        <div class="wrap">
          <div class="cta reveal">
            <div>
              <h2>Tem uma ideia para o Grêmio?</h2>
              <p>Envie sua proposta e ela entra na lista da chapa.</p>
            </div>
            <router-link to="/propostas" class="btn">Propor uma ideia</router-link>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<style scoped>
.wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Home page wrapper */
.home-page {
  min-height: 100vh;
  background: #F7E6CC;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* Banner com a onça de fundo */
.banner {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: linear-gradient(90deg, #381E07 0%, #452206 60%, #2d1a05 100%);
  color: #faf3e6;
  padding: 96px 0 88px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.banner__bg {
  position: absolute;
  right: -6%;
  top: 50%;
  width: min(760px, 110vw);
  aspect-ratio: 1;
  transform: translateY(-50%);
  border-radius: 50%;
  background: url('/logo-onca.svg') center / cover no-repeat;
  opacity: 0.5;
  -webkit-mask-image: radial-gradient(closest-side, #000 58%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 58%, transparent 100%);
  filter: saturate(1.25) brightness(0.95);
  z-index: -1;
}

.banner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #000 18%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.1) 100%);
  z-index: -1;
}

.banner__content {
  position: relative;
  z-index: 1;
  max-width: 600px;
  padding-right: 2rem;
}

.banner h1 {
  color: #faf3e6;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(2.8rem, 5.5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 24px;
  max-width: 560px;
}

.banner h1 .hero-title-bold {
  color: #ffffff;
}

.banner__lead {
  color: rgba(250, 243, 230, 0.9);
  font-size: 1.125rem;
  max-width: 480px;
  margin-bottom: 32px;
  line-height: 1.6;
}

/* Hero image on the right */
.hero-image {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-jaguar {
  width: 100%;
  max-width: 600px;
  height: auto;
  filter: contrast(1.1) saturate(1.05);
  opacity: 0.95;
}

/* Botões */
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 26px;
  border-radius: 999px;
  background: #FFF6E8;
  color: #381E07;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
}

.btn-white {
  background: #ffffff;
  color: #381E07;
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.08);
  color: #faf3e6;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}

.btn:hover {
  opacity: 0.9;
}

.centro {
  text-align: center;
  margin-top: 44px;
}

/* Seções e tipografia */
.section {
  padding: 88px 0;
}

.section--alt {
  background: rgba(64, 27, 1, 0.035);
}

.eyebrow {
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #401B01;
  font-weight: 700;
  margin-bottom: 12px;
}

h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  color: #401B01;
  font-size: clamp(1.9rem, 3.4vw, 2.6rem);
  line-height: 1.15;
  margin-bottom: 0;
}

.head {
  margin-bottom: 44px;
}

.contexto {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 0;
}

.contexto h3 {
  font-family: Georgia, serif;
  font-weight: 600;
  color: #401B01;
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.contexto p {
  color: #6b5b4e;
  font-size: 0.9375rem;
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.6;
}

/* Cards com 4 colunas - modelo da imagem */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.card {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  background: #FFF6E8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.card-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 1rem;
}

.card-icon svg {
  width: 100%;
  height: 100%;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 14%;
  right: 14%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  z-index: 2;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), rgba(255, 255, 255, 0.7), transparent 65%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
  z-index: 2;
}

.card:hover::after {
  opacity: 1;
}

.card > * {
  position: relative;
  z-index: 1;
}

.card h3 {
  font-family: Georgia, serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: #401B01;
  margin: 0 0 0.75rem 0;
}

.card p {
  color: #6b5b4e;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.pill {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: #EC9545;
  color: #ffffff;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.proposal-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.proposal-bullets li {
  font-size: 0.8rem;
  color: #6b5b4e;
  margin-bottom: 0.4rem;
  padding-left: 1rem;
  position: relative;
  line-height: 1.4;
}

.proposal-bullets li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #EC9545;
  font-weight: 700;
}

/* CTA */
.cta {
  background: #3C1D08;
  border-radius: 28px;
  padding: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  color: #faf3e6;
  box-shadow: 0 24px 50px rgba(64, 27, 1, 0.25);
}

.cta h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  color: #faf3e6;
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  margin: 0 0 0.75rem 0;
}

.cta p {
  color: rgba(250, 243, 230, 0.78);
  margin: 0 0 2rem 0;
  font-size: 1rem;
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

@media (max-width: 900px) {
  .banner {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 3rem 1.5rem;
  }

  .banner__content {
    max-width: 100%;
    padding-right: 0;
  }

  .banner h1 {
    font-size: 2.5rem;
  }

  .hero-image {
    order: -1;
    margin-bottom: 2rem;
  }

  .hero-jaguar {
    max-width: 320px;
  }

  .actions {
    justify-content: center;
  }

  .banner__bg {
    display: none;
  }

  .banner::after {
    display: none;
  }
}

@media (max-width: 860px) {
  .contexto {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .card {
    padding: 1.5rem 1rem;
  }

  .cta {
    padding: 32px;
    flex-direction: column;
    text-align: center;
  }

  .cta h2 {
    text-align: center;
  }

  .cta p {
    text-align: center;
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
