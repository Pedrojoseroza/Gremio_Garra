<script setup lang="ts">
import emailjs from '@emailjs/browser'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const tipoMensagem = ref('Crítica')
const assunto = ref('Grêmio')
const mensagem = ref('')
const nome = ref('')
const anonimo = ref(false)
const enviando = ref(false)
const mensagemStatus = ref('')
const statusErro = ref(false)

const EMAILJS_SERVICE_ID = 'service_xjzbd2o'
const EMAILJS_TEMPLATE_ID = 'template_poyersn'
const EMAILJS_PUBLIC_KEY = '7_rYE9tZnGPfK1EyL'

async function enviarOuvidoria() {
  if (!mensagem.value.trim()) {
    statusErro.value = true
    mensagemStatus.value = 'Escreva sua mensagem antes de enviar.'
    return
  }

  enviando.value = true
  statusErro.value = false
  mensagemStatus.value = ''

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        form_type: 'Ouvidoria',
        title: `${tipoMensagem.value} - ${assunto.value}`,
        theme: assunto.value,
        message: mensagem.value.trim(),
        name: anonimo.value ? 'Anônimo' : nome.value.trim() || 'Não informado',
        anonymous: anonimo.value ? 'Sim' : 'Não',
        turma: 'Não informado',
        to_name: 'Chapa Garra',
      },
      { publicKey: EMAILJS_PUBLIC_KEY },
    )

    mensagemStatus.value = 'Mensagem enviada com sucesso!'
    tipoMensagem.value = 'Crítica'
    assunto.value = 'Grêmio'
    mensagem.value = ''
    nome.value = ''
    anonimo.value = false
  } catch {
    statusErro.value = true
    mensagemStatus.value = 'Não foi possível enviar. Tente novamente.'
  } finally {
    enviando.value = false
  }
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

const passos = [
  { numero: '1', titulo: 'Início do mês', texto: 'O formulário abre.' },
  { numero: '2', titulo: 'Antes da última semana', texto: 'O formulário fecha, possivelmente em um domingo.' },
  { numero: '3', titulo: 'Última semana', texto: 'O auditório fica aberto para a devolutiva de progresso e respostas.' },
  { numero: '4', titulo: 'No encontro', texto: 'Quem não preencheu pode pautar assuntos.' },
]
</script>

<template>
  <div class="ouvidoria-page">
    <main>
      <!-- Hero / Banner -->
      <section class="hero reveal">
        <div class="hero-content">
          <span class="hero-eyebrow">OUVIDORIA</span>
          <h1 class="hero-title">Ouvidoria da Garra</h1>
          <p class="hero-subtitle">
            Um canal direto para o estudante falar com o Grêmio: críticas, elogios
            e ideias, de forma anônima ou identificada.
          </p>
        </div>
      </section>

      <!-- Como funciona todo mês -->
      <section class="steps reveal">
        <div class="steps-container">
          <div class="steps-header">
            <span class="steps-eyebrow">PASSO A PASSO</span>
            <h2 class="steps-title">Como funciona todo mês</h2>
          </div>

          <div class="steps-grid">
            <article
              v-for="(passo, index) in passos"
              :key="passo.numero"
              class="step-card reveal"
              :style="{ transitionDelay: index * 90 + 'ms' }"
            >
              <span class="step-number">{{ passo.numero }}</span>
              <h3 class="step-title">{{ passo.titulo }}</h3>
              <p class="step-text">{{ passo.texto }}</p>
            </article>
          </div>

          <p class="steps-note">
            As datas podem variar conforme o calendário acadêmico.
          </p>
        </div>
      </section>

      <!-- Formulário -->
      <section class="form-section reveal">
        <div class="form-container">
          <div class="form-content">
            <span class="form-eyebrow">FORMULÁRIO</span>
            <h2 class="form-title">Envie sua mensagem</h2>
            <p class="form-description">
              Escolha o tema, escreva e decida se quer se identificar.
            </p>
          </div>

          <form class="form-card" @submit.prevent="enviarOuvidoria">
            <div class="form-field">
              <label class="form-label">Tipo de mensagem</label>
              <select class="form-select" v-model="tipoMensagem">
                <option value="Crítica">Crítica</option>
                <option value="Elogio">Elogio</option>
                <option value="Ideia">Ideia</option>
              </select>
            </div>

            <div class="form-field">
              <label class="form-label">Assunto</label>
              <select class="form-select" v-model="assunto">
                <option value="Grêmio">Grêmio</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Merenda">Merenda</option>
                <option value="Convivência">Convivência</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div class="form-field">
              <label class="form-label">Sua mensagem</label>
              <textarea class="form-textarea" v-model="mensagem" rows="5"></textarea>
            </div>

            <div class="form-field">
              <label class="form-label">Nome (opcional)</label>
              <input class="form-input" v-model="nome" type="text" placeholder="Seu nome" />
            </div>

            <div class="form-checkbox">
              <input type="checkbox" id="anonimo" v-model="anonimo" />
              <label for="anonimo">Quero enviar de forma anônima</label>
            </div>

            <p v-if="mensagemStatus" class="form-status" :class="{ error: statusErro }" role="status">
              {{ mensagemStatus }}
            </p>
            <button class="form-btn" type="submit" :disabled="enviando">
              {{ enviando ? 'Enviando...' : 'Enviar mensagem' }}
            </button>
          </form>
        </div>
      </section>

      <!-- Devolutiva no auditório -->
      <section class="devolutiva reveal">
        <div class="devolutiva-content">
          <h2 class="devolutiva-title">Devolutiva no auditório</h2>
          <p class="devolutiva-text">
            Na última semana do mês, o Grêmio abre o auditório para todos e mostra
            o que avançou, o que está em andamento e o que ainda não teve progresso.
          </p>
        </div>
      </section>
    </main>

  </div>
</template>

<style scoped>
/* Page wrapper */
.ouvidoria-page {
  min-height: 100vh;
  background: #F7EFE3;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* Hero */
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: linear-gradient(90deg, #1A0B05 0%, #2D160B 60%, #1A0B05 100%);
  color: #FAF3E6;
  padding: 80px 2rem;
  text-align: center;
}

.hero-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #C7A880;
  margin-bottom: 1rem;
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
  color: #CBB8A3;
  margin: 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
}

/* Steps / Como funciona */
.steps {
  padding: 80px 2rem;
  background: #F7EFE3;
}

.steps-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

.steps-header {
  text-align: center;
  margin-bottom: 3rem;
}

.steps-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #B8946E;
  margin-bottom: 0.75rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.steps-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.15;
  color: #6B4A34;
  margin: 0;
  letter-spacing: -0.01em;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.step-card {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  background: #FFFFFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.step-number {
  display: inline-block;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #D97706;
  margin-bottom: 0.75rem;
}

.step-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: #6B4A34;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.01em;
}

.step-text {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #8C7A66;
  margin: 0;
  flex: 1;
}

.steps-note {
  text-align: center;
  font-size: 0.9375rem;
  color: #8C7A66;
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Formulário */
.form-section {
  padding: 80px 2rem;
  background: #F7EFE3;
}

.form-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.form-content {
  max-width: 520px;
}

.form-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #B8946E;
  margin-bottom: 0.75rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.form-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.15;
  color: #6B4A34;
  margin: 0 0 1rem 0;
  letter-spacing: -0.01em;
}

.form-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #8C7A66;
  margin: 0;
  font-weight: 400;
}

.form-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 3rem 2rem;
  background: #FFFFFF;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  box-sizing: border-box;
}

.form-field {
  width: 100%;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #5A463A;
  margin-bottom: 0.5rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.form-select {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #E5DCC9;
  background: #FFFFFF;
  color: #3A2E24;
  font-size: 0.9375rem;
  font-family: system-ui, -apple-system, sans-serif;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235A463A' d='M6 6.5l-1.5-1.5 1.5-1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  cursor: pointer;
}

.form-select::-ms-expand {
  display: none;
}

.form-textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #E5DCC9;
  background: #FFFFFF;
  color: #3A2E24;
  font-size: 0.9375rem;
  font-family: system-ui, -apple-system, sans-serif;
  resize: vertical;
  min-height: 100px;
}

.form-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #E5DCC9;
  background: #FFFFFF;
  color: #3A2E24;
  font-size: 0.9375rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.form-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: 1px solid #B8A898;
  border-radius: 3px;
  background: #FFFFFF;
  cursor: pointer;
  accent-color: #D97706;
}

.form-checkbox label {
  font-size: 0.9375rem;
  color: #5A463A;
  font-family: system-ui, -apple-system, sans-serif;
  cursor: pointer;
}

.form-btn {
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #5A463A;
  color: #FFFFFF;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: system-ui, -apple-system, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-btn:hover {
  background: #4A382A;
}

.form-btn:disabled {
  cursor: wait;
  opacity: 0.7;
}

.form-status {
  margin: 0 0 1rem;
  color: #3f7d32;
  font-size: 0.875rem;
}

.form-status.error {
  color: #771208;
}

/* Devolutiva no auditório */
.devolutiva {
  padding: 80px 2rem;
  background: linear-gradient(90deg, #2A1408 0%, #2D160B 60%, #1A0B05 100%);
  color: #FAF3E6;
}

.devolutiva-content {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

.devolutiva-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.15;
  color: #FFFFFF;
  margin: 0 0 1rem 0;
  letter-spacing: -0.01em;
}

.devolutiva-text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #C9B8A8;
  margin: 0;
  max-width: 600px;
  font-weight: 400;
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

@media (max-width: 860px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .form-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .devolutiva-text {
    text-align: center;
  }
}

@media (max-width: 560px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: 60px 1.5rem;
  }

  .steps {
    padding: 60px 1.5rem;
  }

  .form-section {
    padding: 60px 1.5rem;
  }

  .devolutiva {
    padding: 60px 1.5rem;
  }

  .form-card {
    padding: 2rem 1.5rem;
  }

  .form-btn {
    min-height: 44px;
  }
}
</style>