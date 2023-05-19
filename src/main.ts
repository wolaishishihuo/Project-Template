import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
const app = createApp(App);
import { setupAssets, setupElement, setupCustomComponents } from '@/plugins';
import { setupStore } from '@/store';

function setupPlugins() {
    // 注册全局常用的UI组件
    setupElement(app);
    // 引入静态资源
    setupAssets();
    // 注册全局自定义组件
    setupCustomComponents(app);
    // 注册全局自定义指令，如：v-permission权限指令
    // setupDirectives(app);
    // 注册全局方法，如：app.config.globalProperties.$message = message
    // setupGlobalMethods(app);
}
async function setupApp() {
    // 挂载pinia状态管理
    setupStore(app);
    // 挂载路由
    await setupRouter(app);

    app.mount('#app');
}
setupPlugins();
setupApp();
