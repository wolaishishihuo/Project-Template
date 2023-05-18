import { type ConfigEnv, type UserConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import pkg from './package.json';
import dayjs from 'dayjs';
import { wrapperEnv } from './build/getEnv';
import { createProxy } from './build/proxy';
import { createVitePlugins } from './build/plugins';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
};

export default (configEnv: ConfigEnv): UserConfig => {
    // 用于获取当前工作目录的路径
    const root = process.cwd();
    const env = loadEnv(configEnv.mode, root) as ImportMetaEnv;
    const viteEnv = wrapperEnv(env);

    return {
        root, // 入口文件位置，如index.html
        base: viteEnv.VITE_PUBLIC_PATH, // 启动服务公共路径
        publicDir: resolve('public'), // 静态资源路径
        // 处理@
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
            }
        },
        // 定义全局常量
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        },
        // 编译
        build: {
            //编译目录
            outDir: 'dist',
            minify: 'esbuild',
            // 禁用 gzip 压缩大小报告，可略微减少打包时间
            reportCompressedSize: false,
            // 规定触发警告的 chunk 大小
            chunkSizeWarningLimit: 2000,
            //编译时是否自动清空目录
            emptyOutDir: true,
            // 设置最终构建的浏览器兼容目标
            target: 'es2015',
            rollupOptions: {
                output: {
                    // Static resource classification and packaging
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
                }
            }
        },
        esbuild: {
            pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
        },
        server: {
            host: '0.0.0.0',
            port: viteEnv.VITE_PORT,
            open: viteEnv.VITE_OPEN,
            cors: true,
            // Load proxy configuration from .env.development
            proxy: createProxy(viteEnv.VITE_PROXY)
        },
        plugins: createVitePlugins(viteEnv)
    };
};
