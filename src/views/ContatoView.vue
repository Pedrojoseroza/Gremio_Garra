<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const nome = ref('')
const turma = ref('')
const mensagem = ref('')

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

const canais = [
  {
    titulo: 'Instagram',
    usuario: '@garra.ifc',
    descricao: 'Posts, propostas e novidades da campanha.',
  },
  {
    titulo: 'Instituição',
    usuario: 'IFC Araquari',
    descricao: '@ifc.oficial.araquari',
  },
  {
    titulo: 'E-mail',
    usuario: '[E-MAIL DA CHAPA]',
    descricao: '',
  },
]
</script>

<template>
  <div class="contato-page">
    <main>
      <!-- Hero / Banner -->
      <section class="hero reveal">
        <div class="hero-content">
          <span class="hero-eyebrow">CONTATO</span>
          <h1 class="hero-title">Fale com a Garra</h1>
          <p class="hero-subtitle">
            Quer propor algo, tirar uma dúvida ou entrar na campanha? Escreva para a gente.
          </p>
        </div>
      </section>

      <!-- Canais + Formulário -->
      <section class="contact-section reveal">
        <div class="contact-container">
          <!-- Left: Canais -->
          <div class="canais">
            <span class="canais-eyebrow">ONDE NOS ENCONTRAR</span>
            <h2 class="canais-title">Canais da chapa</h2>

            <div class="canais-grid">
              <article
                v-for="(canal, index) in canais"
                :key="index"
                class="canal-card reveal"
                :style="{ transitionDelay: index * 90 + 'ms' }"
              >
                <h3 class="canal-titulo">{{ canal.titulo }}</h3>
                <p class="canal-usuario">{{ canal.usuario }}</p>
                <p v-if="canal.descricao" class="canal-descricao">{{ canal.descricao }}</p>
              </article>
            </div>
          </div>

          <!-- Right: Formulário -->
          <div class="formulario">
            <span class="form-eyebrow">ENVIE UMA MENSAGEM</span>
            <div class="form-card">
              <div class="form-field">
                <label class="form-label">Nome</label>
                <input class="form-input" v-model="nome" type="text" placeholder="Seu nome" />
              </div>

              <div class="form-field">
                <label class="form-label">Turma / curso</label>
                <input class="form-input" v-model="turma" type="text" placeholder="Sua turma ou curso" />
              </div>

              <div class="form-field">
                <label class="form-label">Mensagem</label>
                <textarea class="form-textarea" v-model="mensagem" rows="5"></textarea>
              </div>

              <button class="form-btn">Enviar</button>
            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<style scoped>
/* Page wrapper */
.contato-page {
  min-height: 100vh;
  background: #F7E6CC;
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
  background: linear-gradient(90deg, #381E07 0%, #452206 60%, #2d1a05 100%);
  color: #FAF3E6;
  min-height: 214px;
  padding: 76px 60px 40px;
  box-sizing: border-box;
  text-align: left;
}

.hero-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #DA8438;
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
  max-width: 600px;
  font-weight: 400;
}

/* Contact section */
.contact-section {
  padding: 48px clamp(24px, 5vw, 72px) 64px;
  background: #F7E6CC;
}

.contact-container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 72px);
  align-items: start;
}

/* Left: Canais */
.canais {
  width: 100%;
  max-width: none;
}

.canais-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #401B01;
  margin-bottom: 12px;
  font-family: system-ui, -apple-system, sans-serif;
}

.canais-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.15;
  color: #401B01;
  margin: 0 0 2rem 0;
  letter-spacing: -0.01em;
}

.canais-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.canal-card {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  min-height: 92px;
  box-sizing: border-box;
  padding: 1.25rem 1.5rem;
  background: #FFF6E8;
  border: 1px solid rgba(64, 27, 1, 0.12);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.canal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 14%;
  right: 14%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #DA8438, transparent);
}

.canal-titulo {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: #401B01;
  margin: 0 0 6px 0;
  letter-spacing: -0.01em;
}

.canal-usuario {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #6b5b4e;
  margin: 0 0 4px 0;
  font-family: system-ui, -apple-system, sans-serif;
}

.canal-descricao {
  font-size: 0.875rem;
  color: #6b5b4e;
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Right: Formulário */
.formulario {
  width: 100%;
  max-width: none;
}

.form-eyebrow {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #401B01;
  margin-bottom: 12px;
  font-family: system-ui, -apple-system, sans-serif;
}

.form-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 24px 24px;
  background: #FFF6E8;
  border: 1px solid rgba(64, 27, 1, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 420px;
}

.form-field {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #401B01;
  margin-bottom: 5px;
  font-family: system-ui, -apple-system, sans-serif;
}

.form-input,
.form-textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 44px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #D8C7A8;
  background: #FFFDF8;
  color: #401B01;
  font-size: 0.9375rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.form-textarea {
  resize: vertical;
  min-height: 110px;
  height: 110px;
}

.form-btn {
  width: 100%;
  height: 32px;
  padding: 0 20px;
  border-radius: 8px;
  border: none;
  background: #401B01;
  color: #FFFFFF;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: system-ui, -apple-system, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-btn:hover {
  background: #DA8438;
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
  .contact-section {
    padding: 18px 24px 25px;
  }

  .hero {
    padding: 76px 60px 40px;
  }
}

@media (max-width: 620px) {
  .hero {
    padding: 76px 24px 28px;
  }

  .contact-section {
    padding: 18px 24px 25px;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .canais,
  .formulario {
    max-width: none;
  }
}
</style>