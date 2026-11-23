<script setup lang="ts">
import { useRoute } from 'vue-router'
</script>

<template>
<div class="jornal-page">
  <main>
    <section class="jornal-detail">
      <div class="section-header">
        <h2 class="section-title">Jornal</h2>
      </div>
      
      <div class="jornal-empty">
        <p>Nenhum artigo publicado ainda.</p>
        <p>Fique ligado nas novidades da Chapa Garra!</p>
      </div>
    </section>
  </main>

</div>
</template>

<style scoped>
.jornal-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  min-height: 80vh;
}

.jornal-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.jornal-empty p {
  margin: 1rem 0;
  font-size: 1.2rem;
}
</style>
