import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ManageReceiversView from '../views/ManageReceiversView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/receivers',
            name: 'receivers',
            component: ManageReceiversView,
        },
    ],
});

export default router;
