// errorHandler
import errorHandler from '@/utils/errorHandler';
import type { App } from 'vue';
//  vue全局config设置
export const setupAppConfig = (app: App) => {
    app.config.errorHandler = errorHandler;
};
