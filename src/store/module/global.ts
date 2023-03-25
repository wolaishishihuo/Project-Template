import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';
import { ThemeConfigProps } from '../interface';
// 第一个参数是应用程序中 store 的唯一 id
export const useGlobalStore = defineStore('GlobalState', {
    // 其它配置项
    state: () => {
        return {
            token: '112211',
            userInfo: '',
            themeConfig: {
                // 折叠菜单
                isCollapse: false
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
        }
    },
    persist: piniaPersistConfig('GlobalState')
});
