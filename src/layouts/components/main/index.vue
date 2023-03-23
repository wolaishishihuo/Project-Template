<template>
    <Tabs />
    <el-main>
        <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
                <component :is="Component" :key="route.path" v-if="isRouterShow" />
            </transition>
        </router-view>
    </el-main>
    <el-footer>
        <Footer />
    </el-footer>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import Footer from '../footer/index.vue';
import Tabs from '../tabs/index.vue';
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
