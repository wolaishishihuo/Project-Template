import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
// 自动引入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import setupExtend from 'vite-plugin-vue-setup-extend';
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
            setupExtend(),
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
            }),
            // 自动引入 api
            AutoImport({
                resolvers: [ElementPlusResolver()],
                dts: 'types/auto-imports.d.ts', // 生成配置文件，如果是ts项目，通常我们会把声明文件放在根目录/types中，注意，这个文件夹需要先建好，否则可能导致等下无法往里生成auto-imports.d.ts文件
                // imports: ['vue', 'vue-router', 'pinia'],
                eslintrc: {
                    enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
                    filepath: './.eslintrc-auto-import.json', // 生成json文件,可以不配置该项，默认就是将生成在根目录
                    globalsPropValue: true
                }
            }),
            // 自动引入组件
            Components({
                resolvers: [ElementPlusResolver()],
                dts: 'types/components.d.ts'
            })
        ]
    };
};
