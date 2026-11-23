<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="logo">
        <img src="/garra-logo.svg" alt="Garra" class="logo__img" />
        <span>Garra</span>
      </router-link>

      <ul id="main-menu" class="links" :class="{ 'is-open': menuOpen }">
        <li v-for="item in items" :key="item.to">
          <router-link :to="item.to" active-class="is-active" @click="menuOpen = false">{{ item.label }}</router-link>
        </li>
      </ul>

      <div class="actions">
        <router-link to="/contato" class="btn btn--ghost">Entrar em contato</router-link>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="main-menu"
          aria-label="Abrir menu"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

const items = [
  { label: 'Início', to: '/' },
  { label: 'Quem somos', to: '/quem-somos' },
  { label: 'Propostas', to: '/propostas' },
  { label: 'Ouvidoria', to: '/ouvidoria' },
]
</script>

<style scoped>
.header {
  position: fixed;
  top: 14px;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0 16px;
  pointer-events: none;
}

.nav {
  pointer-events: auto;
  max-width: 1040px;
  margin: 0 auto;
  height: 58px;
  padding: 0 8px 0 18px;
  border-radius: 999px;
  background: #0C0200;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-self: start;
  color: #faf3e6;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
}

.logo__img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.links {
  display: flex;
  gap: 28px;
  list-style: none;
  font-size: 0.86rem;
}

.links a {
  color: rgba(250, 243, 230, 0.78);
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}

.links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 3px;
  background: #DA8438;
  transition: width 0.3s ease;
}

.links a:hover,
.links a.is-active {
  color: #faf3e6;
  text-decoration: none;
}

.links a:hover::after,
.links a.is-active::after {
  width: 100%;
}

.actions {
  justify-self: end;
  display: flex;
  gap: 8px;
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  padding: 10px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 20px;
  height: 2px;
  margin: 4px auto;
  background: #faf3e6;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.08);
  color: #faf3e6;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}

@media (max-width: 860px) {
  .nav {
    grid-template-columns: 1fr auto;
    position: relative;
    padding-left: 14px;
  }

  .actions .btn--ghost {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .links {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    gap: 0;
    padding: 8px;
    margin: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    background: #0c0200;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
  }

  .links.is-open {
    display: flex;
  }

  .links li {
    width: 100%;
  }

  .links a {
    display: flex;
    min-height: 44px;
    align-items: center;
    padding: 0 12px;
  }

  .links a::after {
    bottom: 6px;
    left: 12px;
  }
}

@media (max-width: 380px) {
  .header {
    padding: 0 10px;
  }

  .nav {
    height: 54px;
  }

  .logo span {
    display: none;
  }
}
</style>
