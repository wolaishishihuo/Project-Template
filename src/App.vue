<template>
    <el-config-provider :locale="locale" :button="config" :size="assemblySize">
        <router-view />
    </el-config-provider>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import { useTheme } from '@/hooks/useTheme';
import { useGlobalStore } from '@/store/module/global';

const globalStore = useGlobalStore();
const { initTheme } = useTheme();
initTheme();
const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));
// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);
// element config
const config = reactive({ autoInsertSpace: false });
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
