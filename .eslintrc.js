module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'standard-with-typescript',
        'eslint-config-prettier',
        'plugin:prettier/recommended'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            jsx: true
        },
        requireConfigFile: false,
        parser: '@typescript-eslint/parser'
    },
    plugins: [
        'vue', // 引入vue的插件 vue <==> eslint-plugin-vue
        'prettier' // 引入规范插件  prettier <==>  eslint-plugin-prettier
    ],
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    rules: {
        'vue/multi-word-component-names': 'off'
    }
};
