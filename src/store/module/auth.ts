import { defineStore } from 'pinia';
import DynamicRouter from '@/assets/json/dynamicRouter.json';
import authButtons from '@/assets/json/authButtons.json';
import { AuthState } from '../interface';
import { getShowMenuList, getFlatArr, getAllBreadcrumbList } from '../utils';

// 用户权限
export const useAuthStore = defineStore({
    id: 'geeker-auth',
    state: (): AuthState => {
        return {
            // 当前页面的 router name，用来做按钮权限筛选
            routeName: '',
            // 菜单权限列表
            authMenuList: [],
            authButtonList: {}
        };
    },
    getters: {
        // 按钮权限列表
        authButtonListGet: state => state.authButtonList,
        // 后端返回的菜单列表 ==> 这里没有经过任何处理
        authMenuListGet: state => state.authMenuList,
        // 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
        showMenuListGet: state => getShowMenuList(state.authMenuList),
        // 扁平化之后的一维数组路由，主要用来添加动态路由
        flatMenuListGet: state => getFlatArr(state.authMenuList),
        // 所有面包屑导航列表
        breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
    },
    actions: {
        async getAuthButtonList() {
            this.authButtonList = authButtons.data;
        },
        async getAuthMenuList() {
            this.authMenuList = DynamicRouter.data;
        },
        async setRouteName(name: string) {
            this.routeName = name;
        }
    }
});
