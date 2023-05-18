import { resolve } from 'path';
import { PluginOption } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslintPlugin from 'vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression';
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite';
// 自动引入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
    return [
        vue(),
        // vue 可以使用 jsx/tsx 语法
        vueJsx(),
        // esLint 报错信息显示在浏览器界面上
        eslintPlugin(),
        // name 可以写在 script 标签上
        vueSetupExtend({}),
        // 创建打包压缩配置
        createCompression(viteEnv),
        // 注入变量到 html 文件
        createHtmlPlugin({
            inject: {
                data: { title: viteEnv.VITE_GLOB_APP_TITLE }
            }
        }),
        // 使用 svg 图标
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]'
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
        }),
        // 是否生成包预览，分析依赖包大小做优化处理
        viteEnv.VITE_REPORT &&
            (visualizer({
                filename: 'stats.html',
                gzipSize: true,
                brotliSize: true
            }) as PluginOption)
    ];
};

/**
 * 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
    const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
    const compressList = VITE_BUILD_COMPRESS.split(',');
    const plugins: PluginOption[] = [];

    if (compressList.includes('gzip')) {
        plugins.push(
            viteCompression({
                ext: '.gz',
                algorithm: 'gzip',
                deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
            })
        );
    }
    if (compressList.includes('brotli')) {
        plugins.push(
            viteCompression({
                ext: '.br',
                algorithm: 'brotliCompress',
                deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
            })
        );
    }

    return plugins;
};
