import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuemSouView from '../views/QuemSouView.vue'
import PropostasView from '../views/PropostasView.vue'
import OuvidoriaView from '../views/OuvidoriaView.vue'
import JornalView from '../views/JornalView.vue'
import ContatoView from '../views/ContatoView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/quem-somos',
      name: 'quem-somos',
      component: QuemSouView,
    },
    {
      path: '/propostas',
      name: 'propostas',
      component: PropostasView,
    },
    {
      path: '/ouvidoria',
      name: 'ouvidoria',
      component: OuvidoriaView,
    },
    {
      path: '/jornal',
      name: 'jornal',
      component: JornalView,
    },
    {
      path: '/contato',
      name: 'contato',
      component: ContatoView,
    },
  ],
})

export default router