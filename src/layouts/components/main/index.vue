<template>
    <el-main>
        <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
                <!-- <keep-alive :include="keepAliveStore.keepAliveName"> -->
                <component :is="Component" :key="route.path" v-if="isRouterShow" />
                <!-- </keep-alive> -->
            </transition>
        </router-view>
    </el-main>
    <el-footer>
        <Footer />
    </el-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Footer from '../footer/index.vue';
// 刷新当前页面
const isRouterShow = ref(true);
</script>
<style scoped lang="less">
@import './index.less';
</style>
