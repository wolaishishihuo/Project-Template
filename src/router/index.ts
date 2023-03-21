import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
// 首页地址（默认）
const HOME_URL = '/home';
const layout = import(/*webpackChunkName:layout*/ '@/layouts/index.vue');
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: HOME_URL
    },
    {
        path: '/home',
        name: 'home',
        component: () => layout,
        redirect: HOME_URL,
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import(/*webpackChunkName:home*/ '@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'dashboard'
                }
            }
        ]
    },
    {
        path: '/proTable',
        name: 'proTable',
        component: () => layout,
        children: [
            {
                path: '/proTable/useProTable',
                name: 'useProTable2',
                component: () =>
                    import(/*webpackChunkName:useProTable*/ '@/views/proTable/index.vue'),
                meta: {
                    icon: 'Menu',
                    title: '使用 ProTable',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true
                }
            }
        ]
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
