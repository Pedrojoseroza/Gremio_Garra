<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-col about">
        <div class="footer-logo">
          <img src="/garra-logo.svg" alt="Garra" class="footer-logo__img" />
          <span class="footer-logo__text">Garra</span>
        </div>
        <h4 class="footer-title">Chapa Garra</h4>
        <p class="footer-text">
          Grêmio Estudantil 2027, IFC Araquari.<br />
          Onde tem voz, tem Garra!
        </p>
      </div>

      <div class="footer-col pages">
        <h4 class="footer-title">Páginas</h4>
        <ul class="footer-links">
          <li><router-link to="/">Início</router-link></li>
          <li><router-link to="/quem-somos">Quem somos</router-link></li>
          <li><router-link to="/propostas">Propostas</router-link></li>
          <li><router-link to="/ouvidoria">Ouvidoria</router-link></li>
          <li><router-link to="/jornal">Jornal</router-link></li>
          <li><router-link to="/contato">Contato</router-link></li>
        </ul>
      </div>

      <div class="footer-col contact">
        <h4 class="footer-title">Contato</h4>
        <ul class="footer-links contact-links">
          <li>
            <a href="https://instagram.com/garra.ifc" target="_blank" rel="noopener noreferrer">@garra.ifc</a>
          </li>
          <li>
            <a href="https://instagram.com/ifc.oficial.araquari" target="_blank" rel="noopener noreferrer">@ifc.oficial.araquari</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copyright">© 2026 Chapa Garra</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #000000;
  color: #ffffff;
  padding: 4rem 2rem 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #333333;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.footer-logo__img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.footer-logo__text {
  color: #faf3e6;
  font-weight: 600;
  font-size: 1rem;
}

.footer-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}

.footer-text {
  font-size: 0.875rem;
  color: #b0b0b0;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

.contact-links a {
  color: rgba(255, 255, 255, 0.7);
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  color: #666666;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 28px 60px 0;
  }

  .footer-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding-bottom: 18px;
  }

  .footer-bottom {
    padding: 12px 0 10px;
  }
}
</style>