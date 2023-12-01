import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', titule: '', component: () => import('../components/ListaReserva.vue') },
    { path: '/crear-reserva', titule: '', component: () => import('../components/CrearReserva.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;