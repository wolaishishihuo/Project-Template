import * as Icons from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import type { App } from 'vue';

export function setupElement(app: App) {
    app.use(ElementPlus);
    // 注册element Icons组件
    Object.keys(Icons).forEach(key => {
        app.component(key, Icons[key as keyof typeof Icons]);
    });
}
