import { type RouteRecordRaw } from 'vue-router';

// 首页地址（默认）
const HOME_URL = '/home';
const layout = import(/*webpackChunkName:layout*/ '@/layouts/index.vue');
export const staticRoutes: Array<RouteRecordRaw> = [
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

/**
 * errorRouter(错误页面路由)
 */
export const errorRouters = [
    {
        path: '/403',
        name: '403',
        component: () => import('@/components/ErrorMessage/403.vue'),
        meta: {
            title: '403页面'
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/components/ErrorMessage/404.vue'),
        meta: {
            title: '404页面'
        }
    },
    {
        path: '/500',
        name: '500',
        component: () => import('@/components/ErrorMessage/500.vue'),
        meta: {
            title: '500页面'
        }
    },
    // 解决刷新页面，路由警告
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/components/ErrorMessage/404.vue')
    }
];
