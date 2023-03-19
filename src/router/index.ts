import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/views/login/index.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export async function setupRouter(app: App) {
    // 创建路由守卫
    // createRouterGuards(router, whiteNameList);
    app.use(router);
    // 路由准备就绪后挂载APP实例
    await router.isReady();
}
export default router;
