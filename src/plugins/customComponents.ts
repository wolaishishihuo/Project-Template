import { App } from 'vue';
// 注册所有图标
import 'virtual:svg-icons-register'; // 引入注册脚本
import SvgIcon from '@/components/SvgIcon/svgIcon.vue';
export const setupCustomComponents = (app: App) => {
    app.component('SvgIcon', SvgIcon);
};
