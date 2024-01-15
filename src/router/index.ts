// Composables
import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
} from 'vue-router';

import { installGuard } from './guard';

const routes: RouteRecordRaw[] = [
    {
        path: '',
        redirect: '/home',
        component: () => import('@/layouts/app/AppLayout.vue'),
        children: [
            {
                path: '/login',
                name: 'Login',
                meta: {
                    requiresAuth: false,
                    hidden: true,
                    title: '',
                    childAsRoot: false,
                },
                component: () => import('@/views/login/Login.vue'),
            },
            {
                path: 'home',
                meta: {
                    requiresAuth: false,
                    hidden: false,
                    title: 'nav.home',
                },
                component: () => import('@/views/home/Home.vue'),
            },
        ],
    },
    {
        path: '/user',
        redirect: '/user/cart',
        component: () => import('@/layouts/app/AppLayout.vue'),
        children: [
            {
                path: 'cart',
                meta: {
                    requiresAuth: true,
                    hidden: true,
                    title: '',
                },
                component: () => import('@/views/user/cart/Cart.vue'),
            },
        ],
    },
    /**
     * 錯誤頁面
     */
    {
        path: '/:catchAll(.*)*',
        name: 'Any',
        redirect: '/404',
    },
    {
        path: '/401',
        name: '401',
        meta: {
            requiresAuth: true,
            title: '',
            hidden: true,
        },
        component: () => import('@/views/error/401.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: {
            requiresAuth: true,
            title: '',
            hidden: true,
        },
        component: () => import('@/views/error/404.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

installGuard(router);

export default router;
