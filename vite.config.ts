import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/

const path = require('path');
const resolve = (dir: string) => path.resolve(__dirname, dir);
export default (configEnv: ConfigEnv): UserConfigExport => {
    const env = loadEnv(configEnv.mode, __dirname) as ImportMetaEnv;
    const BASE_URL = env.VITE_APP_BASE_URL;
    return {
        root: './', // 入口文件位置，如index.html
        base: './', // 启动服务公共路径
        publicDir: resolve('public'), // 静态资源路径
        // 处理@
        resolve: {
            alias: { '@': path.resolve(__dirname, 'src') }
        },
        // 编译
        build: {
            chunkSizeWarningLimit: 2000,
            //编译目录
            outDir: './dist',
            //编译时是否自动清空目录
            emptyOutDir: true,
            /** 打包后静态资源目录 */
            assetsDir: 'static'
        },
        server: {
            https: false, //本地环境不用https
            hmr: { overlay: false },
            port: 8080, //本地端口
            host: '0.0.0.0',
            cors: true,
            proxy: {
                //反向代理配置
                [BASE_URL]: {
                    target: env.VITE_APP_PROXY_URL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        },
        plugins: [
            vue(),
            // 增加下面的配置项,这样在运行时就能检查eslint规范
            eslintPlugin({
                include: [
                    'src/**/*.js',
                    'src/**/*.vue',
                    'src/*.js',
                    'src/*.vue',
                    'src/**/*.ts',
                    'src/*.ts'
                ]
            })
        ]
    };
};
