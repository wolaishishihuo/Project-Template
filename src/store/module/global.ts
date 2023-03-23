import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';
import { ThemeConfigProps } from '../interface';
// 第一个参数是应用程序中 store 的唯一 id
export const useGlobalStore = defineStore('global', {
    // 其它配置项
    state: () => {
        return {
            token: '',
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
        }
    },
    persist: piniaPersistConfig('GlobalState')
});
