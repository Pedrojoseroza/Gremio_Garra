<script setup lang="ts">
import emailjs from '@emailjs/browser'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface Proposta {
  titulo: string
  tema: string
  descricao: string
  itens: string[]
}

const temaFiltro = ref('Todas')
const busca = ref('')
const temaProposta = ref('Comunicação')
const tituloProposta = ref('')
const descricaoProposta = ref('')
const nome = ref('')
const anonimo = ref(false)
const enviando = ref(false)
const mensagemStatus = ref('')
const statusErro = ref(false)

const temas = ['Todas', 'Comunicação', 'Cultura', 'Estudo', 'Convivência', 'Transparência']

const propostas: Proposta[] = [
  {
    titulo: 'Ouvidoria',
    tema: 'Transparência',
    descricao: 'Formulário digital, anônimo ou identificado, para críticas, elogios e ideias.',
    itens: [
      'Temas: Grêmio, infraestrutura, merenda e convivência',
      'Relatório periódico com o andamento das demandas',
      'Devolutiva aberta no auditório, no fim do mês',
    ],
  },
  {
    titulo: 'Hora da Garra',
    tema: 'Comunicação',
    descricao: 'Jornal semanal integrado a um site atualizado a cada 15 dias.',
    itens: [
      'Notícias, projetos dos alunos e entrevistas',
      'Galeria, calendário e arquivo das edições',
      'Possível podcast no Spotify',
    ],
  },
  {
    titulo: 'Eventos e oficinas',
    tema: 'Cultura',
    descricao: 'Oficinas de arte, música e dança, feitas por estudantes voluntários.',
    itens: [
      'Pesquisa de interesses antes de começar',
      '1 ou 2 oficinas por mês',
      'Exposições e grupo de dança',
    ],
  },
  {
    titulo: 'Clubes e núcleos',
    tema: 'Convivência',
    descricao: 'Mais visibilidade e apoio financeiro às iniciativas já existentes.',
    itens: [
      'Divulgação em redes sociais e murais',
      'Apoio para materiais e campanhas',
      'Distribuição de recursos com transparência',
    ],
  },
  {
    titulo: 'Arrecadação',
    tema: 'Transparência',
    descricao: 'Recursos para materiais, atividades e melhoria dos espaços.',
    itens: [
      'Cópia de CNPJ de cada conta',
      'Caixa de sugestões em área local',
      'Documento mensal com fundos e gastos',
    ],
  },
  {
    titulo: 'Aulão do ENEM',
    tema: 'Estudo',
    descricao: 'Estudo colaborativo para o terceiro ano e treineiros.',
    itens: [
      'Redação, repertório e questões antigas',
      'Março a junho: revisão geral',
      'Julho a outubro: aprofundamento',
    ],
  },
  {
    titulo: 'Clube do livro',
    tema: 'Cultura',
    descricao: 'Encontros de leitura em grupo, troca de livros e clássicos.',
    itens: [
      'Encontros para discutir um livro',
      'Troca voluntária de livros',
      'Clássicos da EREM e vestibulares',
    ],
  },
  {
    titulo: 'Integração dos calouros',
    tema: 'Convivência',
    descricao: 'Uma semana integrada ao novo ambiente do campus.',
    itens: [
      'Relato dos atuais alunos',
      'Rodas de conversa com padrinhos',
      'Visão geral do curso técnico integrado',
    ],
  },
]

const propostasFiltradas = computed(() => {
  const termo = busca.value.trim().toLowerCase()

  return propostas.filter((proposta) => {
    const correspondeTema =
      temaFiltro.value === 'Todas' || proposta.tema === temaFiltro.value
    const correspondeBusca =
      !termo ||
      proposta.titulo.toLowerCase().includes(termo) ||
      proposta.descricao.toLowerCase().includes(termo) ||
      proposta.itens.some((item) => item.toLowerCase().includes(termo))

    return correspondeTema && correspondeBusca
  })
})

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
    { threshold: 0.12 },
  )
  document.querySelectorAll('.reveal').forEach((element) => observer?.observe(element))
})

onBeforeUnmount(() => observer?.disconnect())

async function selecionarTema(tema: string) {
  busca.value = ''
  temaFiltro.value = tema

  await nextTick()
  document.querySelectorAll('.proposal-card').forEach((element) => {
    element.classList.add('is-visible')
  })
}

watch([temaFiltro, busca], async () => {
  await nextTick()
  document.querySelectorAll('.proposal-card').forEach((element) => {
    element.classList.add('is-visible')
  })
})

async function enviarProposta() {
  if (!tituloProposta.value.trim() || !descricaoProposta.value.trim()) {
    statusErro.value = true
    mensagemStatus.value = 'Preencha o título e a descrição da proposta.'
    return
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    statusErro.value = true
    mensagemStatus.value = 'O envio por email ainda não foi configurado.'
    return
  }

  enviando.value = true
  statusErro.value = false
  mensagemStatus.value = ''

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        title: tituloProposta.value.trim(),
        theme: temaProposta.value,
        message: descricaoProposta.value.trim(),
        name: anonimo.value ? 'Anônimo' : nome.value.trim() || 'Não informado',
        anonymous: anonimo.value ? 'Sim' : 'Não',
      },
      { publicKey },
    )

    mensagemStatus.value = 'Proposta enviada com sucesso!'
    tituloProposta.value = ''
    descricaoProposta.value = ''
    nome.value = ''
    anonimo.value = false
  } catch {
    statusErro.value = true
    mensagemStatus.value = 'Não foi possível enviar sua proposta. Tente novamente.'
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <div class="propostas-page">
    <main>
      <section class="hero reveal">
        <div class="hero-content">
          <span class="hero-eyebrow">PROPOSTAS</span>
          <h1 class="hero-title">Propostas da Chapa Garra</h1>
          <p class="hero-subtitle">
            Oito propostas para dar voz a você e a todos os estudantes. Filtre por tema ou envie a sua.
          </p>
        </div>
      </section>

      <section class="propostas-section reveal">
        <div class="propostas-container">
          <div class="filters" aria-label="Filtrar propostas por tema">
            <button
              v-for="tema in temas"
              :key="tema"
              type="button"
              class="filter"
              :class="{ active: temaFiltro === tema }"
              @click="selecionarTema(tema)"
            >
              {{ tema }}
            </button>
          </div>

          <label class="search">
            <span class="sr-only">Buscar proposta</span>
            <input v-model="busca" type="search" placeholder="Buscar proposta" />
          </label>

          <div class="propostas-grid">
            <article
              v-for="(proposta, index) in propostasFiltradas"
              :key="proposta.titulo"
              class="proposal-card reveal"
              :style="{ transitionDelay: `${index * 70}ms` }"
            >
              <span class="proposal-tag">{{ proposta.tema }}</span>
              <h2 class="proposal-title">{{ proposta.titulo }}</h2>
              <p class="proposal-description">{{ proposta.descricao }}</p>
              <ul class="proposal-bullets">
                <li v-for="item in proposta.itens" :key="item">{{ item }}</li>
              </ul>
            </article>
            <p v-if="propostasFiltradas.length === 0" class="empty-state">
              Nenhuma proposta encontrada.
            </p>
          </div>
        </div>
      </section>

      <section class="idea-section reveal">
        <div class="idea-container">
          <div class="idea-copy">
            <span class="idea-eyebrow">SUA IDEIA</span>
            <h2>Proponha algo novo</h2>
            <p>Sugestões de estudantes entram na lista de propostas da chapa e podem ser discutidas no Grêmio.</p>
          </div>

          <form class="idea-form" @submit.prevent="enviarProposta">
            <label>
              <span>Título da ideia</span>
              <input v-model="tituloProposta" type="text" placeholder="Ex.: Oficina de fotografia" />
            </label>

            <label>
              <span>Tema</span>
              <select v-model="temaProposta">
                <option>Comunicação</option>
                <option>Cultura</option>
                <option>Estudo</option>
                <option>Convivência</option>
                <option>Transparência</option>
              </select>
            </label>

            <label>
              <span>Descreva sua proposta</span>
              <textarea v-model="descricaoProposta" rows="4" placeholder="O que você sugere e como poderia funcionar?"></textarea>
            </label>

            <label>
              <span>Nome (opcional)</span>
              <input v-model="nome" type="text" placeholder="Seu nome e turma" :disabled="anonimo" />
            </label>

            <label class="anonymous">
              <input v-model="anonimo" type="checkbox" />
              <span>Quero enviar de forma anônima</span>
            </label>

            <p v-if="mensagemStatus" class="form-status" :class="{ error: statusErro }" role="status">
              {{ mensagemStatus }}
            </p>

            <button type="submit" :disabled="enviando">
              {{ enviando ? 'Enviando...' : 'Enviar proposta' }}
            </button>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.propostas-page {
  min-height: 100vh;
  background: #f7e6cc;
  overflow-x: hidden;
}

.hero {
  min-height: 214px;
  box-sizing: border-box;
  padding: 76px 60px 40px;
  background: linear-gradient(90deg, #381e07 0%, #452206 60%, #2d1a05 100%);
  color: #faf3e6;
  text-align: left;
}

.hero-content {
  max-width: 616px;
  margin: 0 auto;
}

.hero-eyebrow {
  display: block;
  margin-bottom: 12px;
  color: #da8438;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.hero-title {
  margin: 0 0 12px;
  color: #fff;
  font-family: Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.15;
}

.hero-subtitle {
  max-width: 520px;
  margin: 0;
  color: rgba(250, 243, 230, 0.9);
  font-size: 1.125rem;
  line-height: 1.6;
}

.propostas-section {
  padding: 48px clamp(24px, 5vw, 72px) 64px;
  background: #f7e6cc;
}

.propostas-container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
}

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filter {
  height: 27px;
  padding: 0 12px;
  border: 1px solid #e7d4b7;
  border-radius: 999px;
  background: #fffaf1;
  color: #401b01;
  font-size: 0.75rem;
  cursor: pointer;
}

.filter.active {
  border-color: #401b01;
  background: #401b01;
  color: #fff;
}

.search {
  display: block;
  width: min(220px, 100%);
  margin-bottom: 20px;
}

.search input {
  width: 100%;
  height: 34px;
  box-sizing: border-box;
  border: 1px solid #e7d4b7;
  border-radius: 999px;
  background: #fff;
  padding: 0 14px;
  font-size: 0.75rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.propostas-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(14px, 2vw, 24px);
  align-items: stretch;
}

.proposal-card {
  min-height: 250px;
  box-sizing: border-box;
  padding: 24px 20px;
  border: 1px solid rgba(64, 27, 1, 0.12);
  border-radius: 14px;
  background: #fff6e8;
  box-shadow: 0 4px 12px rgba(64, 27, 1, 0.06);
  animation: cardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

.proposal-tag {
  display: inline-block;
  margin-bottom: 12px;
  border-radius: 999px;
  background: #771208;
  color: #fff;
  padding: 3px 8px;
  font-size: 0.625rem;
  font-weight: 700;
}

.proposal-title {
  min-height: 36px;
  margin: 0 0 6px;
  color: #401b01;
  font-family: Georgia, serif;
  font-size: 1.125rem;
  line-height: 1.25;
}

.proposal-description {
  min-height: 44px;
  margin: 0 0 10px;
  color: #6b5b4e;
  font-size: 0.9375rem;
  line-height: 1.45;
}

.proposal-bullets {
  margin: 0;
  padding-left: 16px;
  color: #6b5b4e;
  font-size: 0.875rem;
  line-height: 1.55;
}

.proposal-bullets li {
  margin-bottom: 5px;
}

.proposal-bullets li::marker {
  color: #ec9545;
}

.empty-state {
  grid-column: 1 / -1;
  margin: 0;
  padding: 32px;
  border: 1px solid rgba(64, 27, 1, 0.12);
  border-radius: 14px;
  background: #fff6e8;
  color: #6b5b4e;
  text-align: center;
}

.idea-section {
  padding: 34px clamp(24px, 5vw, 72px);
  background: #ead0ad;
}

.idea-container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(240px, 0.75fr) minmax(320px, 1.25fr);
  gap: clamp(40px, 7vw, 96px);
  align-items: start;
}

.idea-copy {
  padding-top: 80px;
}

.idea-eyebrow {
  display: block;
  margin-bottom: 8px;
  color: #401b01;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.idea-copy h2 {
  margin: 0 0 10px;
  color: #401b01;
  font-family: Georgia, serif;
  font-size: 1.75rem;
  line-height: 1.15;
}

.idea-copy p {
  margin: 0;
  color: #6b5b4e;
  font-size: 0.875rem;
  line-height: 1.6;
}

.idea-form {
  box-sizing: border-box;
  padding: 24px 28px;
  border: 1px solid rgba(64, 27, 1, 0.12);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(64, 27, 1, 0.08);
}

.idea-form label {
  display: block;
  margin-bottom: 12px;
  color: #401b01;
  font-size: 0.75rem;
  font-weight: 600;
}

.idea-form label > span {
  display: block;
  margin-bottom: 5px;
}

.idea-form input,
.idea-form select,
.idea-form textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e7d4b7;
  border-radius: 8px;
  background: #fff;
  color: #401b01;
  font-size: 0.75rem;
  padding: 8px 10px;
}

.idea-form input,
.idea-form select {
  height: 34px;
}

.idea-form textarea {
  min-height: 68px;
  resize: vertical;
}

.idea-form .anonymous {
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 400;
}

.idea-form .anonymous input {
  width: 13px;
  height: 13px;
  margin: 0;
}

.idea-form .anonymous span {
  margin: 0;
}

.idea-form button {
  width: 100%;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: #401b01;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.idea-form button:disabled {
  opacity: 0.65;
  cursor: wait;
}

.form-status {
  margin: 0 0 10px;
  color: #3f7d32;
  font-size: 0.75rem;
}

.form-status.error {
  color: #771208;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .proposal-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

@media (max-width: 1100px) {
  .propostas-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .idea-container {
    grid-template-columns: minmax(220px, 0.8fr) minmax(320px, 1.2fr);
    gap: 48px;
  }
}

@media (max-width: 860px) {
  .propostas-section,
  .idea-section {
    padding-left: 24px;
    padding-right: 24px;
  }

  .hero {
    padding: 76px 24px 40px;
  }

  .propostas-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .idea-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .idea-copy {
    padding-top: 0;
  }
}

@media (max-width: 560px) {
  .hero {
    min-height: 230px;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .propostas-grid {
    grid-template-columns: 1fr;
  }
}
</style>
