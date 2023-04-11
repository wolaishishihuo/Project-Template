import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';
import { GlobalState, ThemeConfigProps, AssemblySizeType } from '../interface';
import { DEFAULT_PRIMARY } from '@/config/config';

// 第一个参数是应用程序中 store 的唯一 id
export const useGlobalStore = defineStore('GlobalState', {
    // 其它配置项
    state: (): GlobalState => {
        return {
            // token
            token: '11',
            // userInfo
            userInfo: '',
            // element组件大小
            assemblySize: 'default',
            // language
            language: '',
            themeConfig: {
                // 折叠菜单
                isCollapse: false,
                // 当前页面是否全屏
                maximize: false,
                // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
                layout: 'vertical',
                // 默认 primary 主题颜色
                primary: DEFAULT_PRIMARY,
                // 深色模式
                isDark: false,
                // 灰色模式
                isGrey: false,
                // 色弱模式
                isWeak: false,
                // 面包屑导航
                breadcrumb: true,
                // 面包屑导航图标
                breadcrumbIcon: true,
                // 标签页
                tabs: true,
                // 标签页图标
                tabsIcon: true,
                // 页脚
                footer: true
            }
        };
    },
    getters: {},
    actions: {
        setThemeConfig(themeConfig: ThemeConfigProps) {
            this.themeConfig = themeConfig;
        },
        setToken(token: string) {
            this.token = token;
        },
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo;
        },
        setAssemblySizeSize(assemblySize: AssemblySizeType) {
            this.assemblySize = assemblySize;
        },
        updateLanguage(language: string) {
            this.language = language;
        }
    },
    persist: piniaPersistConfig('GlobalState')
});
