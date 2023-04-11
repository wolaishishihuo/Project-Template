<template>
    <Tabs v-if="themeConfig.tabs" />
    <el-main>
        <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
                <component :is="Component" :key="route.path" v-if="isRouterShow" />
            </transition>
        </router-view>
    </el-main>
    <el-footer v-if="themeConfig.footer">
        <Footer />
    </el-footer>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import Footer from '../footer/index.vue';
import Tabs from '../tabs/index.vue';
import { useGlobalStore } from '@/store/module/global';
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
// 刷新当前页面
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => {
    isRouterShow.value = val;
};
provide('refresh', refreshCurrentPage);
</script>
<style scoped lang="less">
@import './index.less';
</style>
